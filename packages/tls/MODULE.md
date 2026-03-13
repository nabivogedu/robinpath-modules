---
title: "TLS"
module: "tls"
package: "@robinpath/tls"
description: "TLS/SSL encrypted connections, certificates, and secure servers"
category: "core"
tags: [tls, ssl, security, encryption, core]
type: "builtin"
auth: "none"
functionCount: 11
---

# TLS

> TLS/SSL encrypted connections, certificates, and secure servers

**Package:** `@robinpath/tls` | **Category:** Core | **Type:** Built-in

## Authentication

No authentication required. All functions are available immediately.

## Use Cases

Use the `tls` module when you need to:

- **Open an encrypted connection** -- Use `tls.connect` for SSL/TLS connections
- **Send data over TLS** -- Use `tls.send` to write encrypted data
- **Read data over TLS** -- Use `tls.read` to receive encrypted data
- **Create a secure server** -- Use `tls.createServer` for HTTPS-like servers
- **Inspect certificates** -- Use `tls.getCertificate` or `tls.getPeerCertificate`
- **Check connection security** -- Use `tls.isEncrypted`, `tls.getProtocol`, `tls.getCipher`

## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`connect`](#connect) | Open a TLS-encrypted connection | `Object` |
| [`send`](#send) | Send data over a TLS connection | `boolean` |
| [`read`](#read) | Read data from a TLS connection | `string` |
| [`close`](#close) | Close a TLS connection | `boolean` |
| [`createServer`](#createserver) | Create a TLS server | `Object` |
| [`getCertificate`](#getcertificate) | Get the local certificate | `Object` |
| [`getPeerCertificate`](#getpeercertificate) | Get the peer's certificate | `Object` |
| [`isEncrypted`](#isencrypted) | Check if connection is encrypted | `boolean` |
| [`getProtocol`](#getprotocol) | Get the negotiated TLS protocol | `string` |
| [`getCipher`](#getcipher) | Get the negotiated cipher suite | `Object` |
| [`active`](#active) | Get count of active TLS connections | `number` |

## Functions

### connect

Open a TLS-encrypted connection to a host and port

**Module:** `tls` | **Returns:** `Object` -- TLS connection handle

```robinpath
tls.connect "api.example.com" 443
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `host` | `string` | Yes | Hostname to connect to |
| `port` | `number` | Yes | Port number |

---

### send

Send data over an encrypted TLS connection

**Module:** `tls` | **Returns:** `boolean` -- True if data was sent

```robinpath
tls.send $conn "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `Object` | Yes | TLS connection handle |
| `data` | `string` | Yes | Data to send |

---

### read

Read data from an encrypted TLS connection

**Module:** `tls` | **Returns:** `string` -- Received data

```robinpath
tls.read $conn
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `Object` | Yes | TLS connection handle |

---

### close

Close a TLS connection

**Module:** `tls` | **Returns:** `boolean` -- True if connection was closed

```robinpath
tls.close $conn
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `Object` | Yes | TLS connection handle |

---

### createServer

Create a TLS server that accepts encrypted connections

**Module:** `tls` | **Returns:** `Object` -- Server handle

```robinpath
tls.createServer 443
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `port` | `number` | Yes | Port to listen on |

---

### getCertificate

Get the local TLS certificate details

**Module:** `tls` | **Returns:** `Object` -- Certificate object with subject, issuer, valid dates

```robinpath
tls.getCertificate $conn
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `Object` | Yes | TLS connection handle |

---

### getPeerCertificate

Get the remote peer's TLS certificate details

**Module:** `tls` | **Returns:** `Object` -- Certificate object with subject, issuer, valid dates

```robinpath
tls.getPeerCertificate $conn
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `Object` | Yes | TLS connection handle |

---

### isEncrypted

Check if a connection is using TLS encryption

**Module:** `tls` | **Returns:** `boolean` -- True if encrypted

```robinpath
tls.isEncrypted $conn
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `Object` | Yes | Connection handle |

---

### getProtocol

Get the negotiated TLS protocol version (e.g., TLSv1.3)

**Module:** `tls` | **Returns:** `string` -- Protocol version string

```robinpath
tls.getProtocol $conn
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `Object` | Yes | TLS connection handle |

---

### getCipher

Get the negotiated cipher suite details

**Module:** `tls` | **Returns:** `Object` -- Object with name, version, standardName

```robinpath
tls.getCipher $conn
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `Object` | Yes | TLS connection handle |

---

### active

Get the count of currently active TLS connections

**Module:** `tls` | **Returns:** `number` -- Number of active connections

```robinpath
tls.active
```

No parameters required.

---

## Error Handling

| Error | Cause |
|-------|-------|
| Certificate expired | Server certificate has expired |
| Hostname mismatch | Certificate doesn't match requested hostname |
| Handshake failed | TLS negotiation failed |

```robinpath
@desc "Secure connection with certificate check"
do
  set $conn as tls.connect "api.example.com" 443
  set $cert as tls.getPeerCertificate $conn
  print "Connected to: " + $cert.subject
  print "Issuer: " + $cert.issuer
  print "Protocol: " + tls.getProtocol $conn
  tls.close $conn
enddo
```

## Recipes

### 1. Inspect a server's TLS certificate

Connect and read certificate details.

```robinpath
@desc "Check SSL certificate"
do
  set $conn as tls.connect "github.com" 443
  set $cert as tls.getPeerCertificate $conn
  set $cipher as tls.getCipher $conn
  set $proto as tls.getProtocol $conn
  print "Subject: " + $cert.subject
  print "Issuer: " + $cert.issuer
  print "Protocol: " + $proto
  print "Cipher: " + $cipher.name
  if tls.isEncrypted $conn
    print "Connection is encrypted"
  end
  tls.close $conn
enddo
```

### 2. Secure data exchange

Send and receive data over TLS.

```robinpath
@desc "Send request over TLS"
do
  set $conn as tls.connect "api.example.com" 443
  tls.send $conn "GET /data HTTP/1.1\r\nHost: api.example.com\r\n\r\n"
  set $response as tls.read $conn
  print "Response: " + $response
  tls.close $conn
enddo
```

## Related Modules

- **net** -- Plain TCP connections
- **http** -- HTTP/HTTPS requests
- **crypto** -- Hashing and encryption utilities
