// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
  CopyObjectCommand,
  CreateBucketCommand,
  DeleteBucketCommand,
  ListBucketsCommand,
  PutObjectAclCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const clients = new Map<string, S3Client>();

function getClient(profile?: string): any {
  const key = profile ?? "__default__";
  const client = clients.get(key);
  if (!client) throw new Error(`S3 client not configured. Call configure() first${profile ? ` for profile "${profile}"` : ""}.`);
  return client;
}

async function streamToBuffer(stream: unknown): Promise<Buffer> {
  const readable = stream as NodeJS.ReadableStream;
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : (chunk as Buffer));
  }
  return Buffer.concat(chunks);
}

export const S3Functions: Record<string, BuiltinHandler> = {
  configure: (args: Value[]) => {
    const options = args[0] as Record<string, unknown>;
    const profile = (options.profile as string) ?? undefined;
    const key = profile ?? "__default__";
    const clientConfig: Record<string, unknown> = {
      region: (options.region as string) ?? "us-east-1",
    };
    if (options.endpoint) {
      clientConfig.endpoint = options.endpoint as string;
      clientConfig.forcePathStyle = (options.forcePathStyle as boolean) ?? true;
    }
    if (options.accessKeyId && options.secretAccessKey) {
      clientConfig.credentials = {
        accessKeyId: options.accessKeyId as string,
        secretAccessKey: options.secretAccessKey as string,
        ...(options.sessionToken ? { sessionToken: options.sessionToken as string } : {}),
      };
    }
    const client = new S3Client(clientConfig as any);
    clients.set(key, client);
    return { success: true, profile: key };
  },

  upload: async (args: Value[]) => {
    const bucket = args[0] as string;
    const key = args[1] as string;
    const body = args[2] as string | Buffer | Uint8Array;
    const options = (args[3] as Record<string, unknown>) ?? {};
    const client = getClient(options.profile as string);
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: (options.contentType as string) ?? undefined,
      Metadata: (options.metadata as Record<string, string>) ?? undefined,
    });
    const result = await client.send(command);
    return { etag: result.ETag, versionId: result.VersionId };
  },

  download: async (args: Value[]) => {
    const bucket = args[0] as string;
    const key = args[1] as string;
    const options = (args[2] as Record<string, unknown>) ?? {};
    const client = getClient(options.profile as string);
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    const result = await client.send(command);
    const buffer = await streamToBuffer(result.Body);
    if (options.encoding) return buffer.toString(options.encoding as BufferEncoding);
    return buffer;
  },

  remove: async (args: Value[]) => {
    const bucket = args[0] as string;
    const key = args[1] as string;
    const options = (args[2] as Record<string, unknown>) ?? {};
    const client = getClient(options.profile as string);
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    await client.send(command);
    return { success: true, bucket, key };
  },

  list: async (args: Value[]) => {
    const bucket = args[0] as string;
    const options = (args[1] as Record<string, unknown>) ?? {};
    const client = getClient(options.profile as string);
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: (options.prefix as string) ?? undefined,
      Delimiter: (options.delimiter as string) ?? undefined,
      MaxKeys: (options.maxKeys as number) ?? 1000,
      ContinuationToken: (options.continuationToken as string) ?? undefined,
    });
    const result = await client.send(command);
    return {
      contents: (result.Contents ?? []).map((obj: any) => ({
        key: obj.Key,
        size: obj.Size,
        lastModified: obj.LastModified?.toISOString(),
        etag: obj.ETag,
        storageClass: obj.StorageClass,
      })),
      commonPrefixes: (result.CommonPrefixes ?? []).map((p: any) => p.Prefix),
      isTruncated: result.IsTruncated ?? false,
      nextContinuationToken: result.NextContinuationToken,
    };
  },

  exists: async (args: Value[]) => {
    const bucket = args[0] as string;
    const key = args[1] as string;
    const options = (args[2] as Record<string, unknown>) ?? {};
    const client = getClient(options.profile as string);
    try {
      const command = new HeadObjectCommand({ Bucket: bucket, Key: key });
      await client.send(command);
      return true;
    } catch (err: any) {
      if (err.name === "NotFound" || err.$metadata?.httpStatusCode === 404) return false;
      throw err;
    }
  },

  copy: async (args: Value[]) => {
    const sourceBucket = args[0] as string;
    const sourceKey = args[1] as string;
    const destBucket = args[2] as string;
    const destKey = args[3] as string;
    const options = (args[4] as Record<string, unknown>) ?? {};
    const client = getClient(options.profile as string);
    const command = new CopyObjectCommand({
      Bucket: destBucket,
      Key: destKey,
      CopySource: `${sourceBucket}/${sourceKey}`,
    });
    const result = await client.send(command);
    return { etag: result.CopyObjectResult?.ETag, lastModified: result.CopyObjectResult?.LastModified?.toISOString() };
  },

  move: async (args: Value[]) => {
    const sourceBucket = args[0] as string;
    const sourceKey = args[1] as string;
    const destBucket = args[2] as string;
    const destKey = args[3] as string;
    const options = (args[4] as Record<string, unknown>) ?? {};
    const client = getClient(options.profile as string);
    const copyCommand = new CopyObjectCommand({
      Bucket: destBucket,
      Key: destKey,
      CopySource: `${sourceBucket}/${sourceKey}`,
    });
    await client.send(copyCommand);
    const deleteCommand = new DeleteObjectCommand({
      Bucket: sourceBucket,
      Key: sourceKey,
    });
    await client.send(deleteCommand);
    return { success: true, from: { bucket: sourceBucket, key: sourceKey }, to: { bucket: destBucket, key: destKey } };
  },

  presignUrl: async (args: Value[]) => {
    const bucket = args[0] as string;
    const key = args[1] as string;
    const options = (args[2] as Record<string, unknown>) ?? {};
    const client = getClient(options.profile as string);
    const expiresIn = (options.expiresIn as number) ?? 3600;
    const method = (options.method as string) ?? "GET";
    let command: GetObjectCommand | PutObjectCommand;
    if (method === "PUT") {
      command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: options.contentType as string });
    } else {
      command = new GetObjectCommand({ Bucket: bucket, Key: key });
    }
    const url = await getSignedUrl(client, command, { expiresIn });
    return { url, expiresIn };
  },

  createBucket: async (args: Value[]) => {
    const bucket = args[0] as string;
    const options = (args[1] as Record<string, unknown>) ?? {};
    const client = getClient(options.profile as string);
    const command = new CreateBucketCommand({ Bucket: bucket });
    await client.send(command);
    return { success: true, bucket };
  },

  deleteBucket: async (args: Value[]) => {
    const bucket = args[0] as string;
    const options = (args[1] as Record<string, unknown>) ?? {};
    const client = getClient(options.profile as string);
    const command = new DeleteBucketCommand({ Bucket: bucket });
    await client.send(command);
    return { success: true, bucket };
  },

  listBuckets: async (args: Value[]) => {
    const options = (args[0] as Record<string, unknown>) ?? {};
    const client = getClient(options.profile as string);
    const command = new ListBucketsCommand({});
    const result = await client.send(command);
    return (result.Buckets ?? []).map((b: any) => ({
      name: b.Name,
      creationDate: b.CreationDate?.toISOString(),
    }));
  },

  getMetadata: async (args: Value[]) => {
    const bucket = args[0] as string;
    const key = args[1] as string;
    const options = (args[2] as Record<string, unknown>) ?? {};
    const client = getClient(options.profile as string);
    const command = new HeadObjectCommand({ Bucket: bucket, Key: key });
    const result = await client.send(command);
    return {
      contentType: result.ContentType,
      contentLength: result.ContentLength,
      etag: result.ETag,
      lastModified: result.LastModified?.toISOString(),
      metadata: result.Metadata,
      versionId: result.VersionId,
      storageClass: result.StorageClass,
    };
  },

  setAcl: async (args: Value[]) => {
    const bucket = args[0] as string;
    const key = args[1] as string;
    const acl = args[2] as string;
    const options = (args[3] as Record<string, unknown>) ?? {};
    const client = getClient(options.profile as string);
    const command = new PutObjectAclCommand({
      Bucket: bucket,
      Key: key,
      ACL: acl as any,
    });
    await client.send(command);
    return { success: true, bucket, key, acl };
  },
};

export const S3FunctionMetadata = {
  configure: {
    description: "Configure S3 client credentials and endpoint",
    parameters: [
      {
        name: "options",
        dataType: "object",
        required: true,
        description: "Configuration: region, endpoint, accessKeyId, secretAccessKey, sessionToken, forcePathStyle, profile",
      },
    ],
    returns: { type: "object", description: "{ success, profile }" },
    returnType: "object",
    returnDescription: "API response.",
  },
  upload: {
    description: "Upload an object to S3",
    parameters: [
      { name: "bucket", dataType: "string", formInputType: "text", required: true, description: "Bucket name" },
      { name: "key", dataType: "string", formInputType: "text", required: true, description: "Object key" },
      { name: "body", dataType: "string | Buffer", required: true, description: "Object content" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Options: contentType, metadata, profile" },
    ],
    returns: { type: "object", description: "{ etag, versionId }" },
    returnType: "object",
    returnDescription: "API response.",
  },
  download: {
    description: "Download an object from S3",
    parameters: [
      { name: "bucket", dataType: "string", formInputType: "text", required: true, description: "Bucket name" },
      { name: "key", dataType: "string", formInputType: "text", required: true, description: "Object key" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Options: encoding, profile" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  remove: {
    description: "Delete an object from S3",
    parameters: [
      { name: "bucket", dataType: "string", formInputType: "text", required: true, description: "Bucket name" },
      { name: "key", dataType: "string", formInputType: "text", required: true, description: "Object key" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Options: profile" },
    ],
    returns: { type: "object", description: "{ success, bucket, key }" },
    returnType: "object",
    returnDescription: "API response.",
  },
  list: {
    description: "List objects in an S3 bucket",
    parameters: [
      { name: "bucket", dataType: "string", formInputType: "text", required: true, description: "Bucket name" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Options: prefix, delimiter, maxKeys, continuationToken, profile" },
    ],
    returns: { type: "object", description: "{ contents[], commonPrefixes[], isTruncated, nextContinuationToken }" },
    returnType: "object",
    returnDescription: "API response.",
  },
  exists: {
    description: "Check if an object exists in S3",
    parameters: [
      { name: "bucket", dataType: "string", formInputType: "text", required: true, description: "Bucket name" },
      { name: "key", dataType: "string", formInputType: "text", required: true, description: "Object key" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Options: profile" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  copy: {
    description: "Copy an object within or between S3 buckets",
    parameters: [
      { name: "sourceBucket", dataType: "string", formInputType: "text", required: true, description: "Source bucket name" },
      { name: "sourceKey", dataType: "string", formInputType: "text", required: true, description: "Source object key" },
      { name: "destBucket", dataType: "string", formInputType: "text", required: true, description: "Destination bucket name" },
      { name: "destKey", dataType: "string", formInputType: "text", required: true, description: "Destination object key" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Options: profile" },
    ],
    returns: { type: "object", description: "{ etag, lastModified }" },
    returnType: "object",
    returnDescription: "API response.",
  },
  move: {
    description: "Move an object (copy then delete source)",
    parameters: [
      { name: "sourceBucket", dataType: "string", formInputType: "text", required: true, description: "Source bucket name" },
      { name: "sourceKey", dataType: "string", formInputType: "text", required: true, description: "Source object key" },
      { name: "destBucket", dataType: "string", formInputType: "text", required: true, description: "Destination bucket name" },
      { name: "destKey", dataType: "string", formInputType: "text", required: true, description: "Destination object key" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Options: profile" },
    ],
    returns: { type: "object", description: "{ success, from, to }" },
    returnType: "object",
    returnDescription: "API response.",
  },
  presignUrl: {
    description: "Generate a presigned URL for an S3 object",
    parameters: [
      { name: "bucket", dataType: "string", formInputType: "text", required: true, description: "Bucket name" },
      { name: "key", dataType: "string", formInputType: "text", required: true, description: "Object key" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Options: expiresIn (seconds, default 3600), method (GET/PUT), contentType, profile" },
    ],
    returns: { type: "object", description: "{ url, expiresIn }" },
    returnType: "object",
    returnDescription: "API response.",
  },
  createBucket: {
    description: "Create a new S3 bucket",
    parameters: [
      { name: "bucket", dataType: "string", formInputType: "text", required: true, description: "Bucket name" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Options: profile" },
    ],
    returns: { type: "object", description: "{ success, bucket }" },
    returnType: "object",
    returnDescription: "API response.",
  },
  deleteBucket: {
    description: "Delete an S3 bucket",
    parameters: [
      { name: "bucket", dataType: "string", formInputType: "text", required: true, description: "Bucket name" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Options: profile" },
    ],
    returns: { type: "object", description: "{ success, bucket }" },
    returnType: "object",
    returnDescription: "API response.",
  },
  listBuckets: {
    description: "List all S3 buckets",
    parameters: [
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Options: profile" },
    ],
    returns: { type: "object[]", description: "Array of { name, creationDate }" },
    returnType: "object",
    returnDescription: "API response.",
  },
  getMetadata: {
    description: "Get metadata for an S3 object",
    parameters: [
      { name: "bucket", dataType: "string", formInputType: "text", required: true, description: "Bucket name" },
      { name: "key", dataType: "string", formInputType: "text", required: true, description: "Object key" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Options: profile" },
    ],
    returns: { type: "object", description: "{ contentType, contentLength, etag, lastModified, metadata, versionId, storageClass }" },
    returnType: "object",
    returnDescription: "API response.",
  },
  setAcl: {
    description: "Set the ACL for an S3 object",
    parameters: [
      { name: "bucket", dataType: "string", formInputType: "text", required: true, description: "Bucket name" },
      { name: "key", dataType: "string", formInputType: "text", required: true, description: "Object key" },
      { name: "acl", dataType: "string", formInputType: "text", required: true, description: "ACL value: private, public-read, public-read-write, authenticated-read" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Options: profile" },
    ],
    returns: { type: "object", description: "{ success, bucket, key, acl }" },
    returnType: "object",
    returnDescription: "API response.",
  },
};

export const S3ModuleMetadata = {
  description: "S3-compatible object storage operations using AWS SDK",
  version: "1.0.0",
  dependencies: ["@aws-sdk/client-s3", "@aws-sdk/s3-request-presigner"],
};
