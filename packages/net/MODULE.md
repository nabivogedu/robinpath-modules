---
title: "Net"
module: "net"
package: "@robinpath/net"
description: "TCP/IP socket connections, servers, and IP address utilities"
category: "core"
tags: [net, tcp, socket, network, core]
type: "builtin"
auth: "none"
functionCount: 9
---

# Net

> TCP/IP socket connections, servers, and IP address utilities

**Package:** `@robinpath/net` | **Category:** Core | **Type:** Built-in

## Authentication

No authentication required. All functions are available immediately.

## Use Cases

Use the `net` module when you need to:

- **Open a TCP connection** -- Use `net.connect` to connect to a remote host
- **Send data over a socket** -- Use `net.send` to write to a connection
- **Read data from a socket** -- Use `net.read` to receive data
- **Create a TCP server** -- Use `net.createServer` to listen for connections
- **Validate IP addresses** -- Use `net.isIP`, `net.isIPv4`, `net.isIPv6`

## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`connect`](#connect) | Open a TCP connection to a host and port | `Object` |
| [`send`](#send) | Send data over a connection | `boolean` |
| [`read`](#read) | Read data from a connection | `string` |
| [`close`](#close) | Close a connection | `boolean` |
| [`createServer`](#createserver) | Create a TCP server | `Object` |
| [`isIP`](#isip) | Check if a string is a valid IP address | `number` |
| [`isIPv4`](#isipv4) | Check if a string is a valid IPv4 address | `boolean` |
| [`isIPv6`](#isipv6) | Check if a string is a valid IPv6 address | `boolean` |
| [`active`](#active) | Get count of active connections | `number` |

## Functions

### connect

Open a TCP connection to a remote host and port

**Module:** `net` | **Returns:** `Object` -- Connection handle

```robinpath
net.connect "localhost" 8080
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `host` | `string` | Yes | Hostname or IP address |
| `port` | `number` | Yes | Port number |

---

### send

Send data over an open connection

**Module:** `net` | **Returns:** `boolean` -- True if data was sent

```robinpath
net.send $conn "Hello server"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `Object` | Yes | Connection handle from connect |
| `data` | `string` | Yes | Data to send |

---

### read

Read data from an open connection

**Module:** `net` | **Returns:** `string` -- Received data

```robinpath
net.read $conn
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `Object` | Yes | Connection handle from connect |

---

### close

Close an open connection

**Module:** `net` | **Returns:** `boolean` -- True if connection was closed

```robinpath
net.close $conn
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `Object` | Yes | Connection handle to close |

---

### createServer

Create a TCP server that listens for incoming connections

**Module:** `net` | **Returns:** `Object` -- Server handle

```robinpath
net.createServer 3000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `port` | `number` | Yes | Port to listen on |

---

### isIP

Check if a string is a valid IP address (returns 4 for IPv4, 6 for IPv6, 0 for invalid)

**Module:** `net` | **Returns:** `number` -- 4, 6, or 0

```robinpath
net.isIP "192.168.1.1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | String to validate |

---

### isIPv4

Check if a string is a valid IPv4 address

**Module:** `net` | **Returns:** `boolean` -- True if valid IPv4

```robinpath
net.isIPv4 "192.168.1.1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | String to validate |

---

### isIPv6

Check if a string is a valid IPv6 address

**Module:** `net` | **Returns:** `boolean` -- True if valid IPv6

```robinpath
net.isIPv6 "::1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | String to validate |

---

### active

Get the count of currently active connections

**Module:** `net` | **Returns:** `number` -- Number of active connections

```robinpath
net.active
```

No parameters required.

---

## Error Handling

| Error | Cause |
|-------|-------|
| Connection refused | Target host is not accepting connections |
| Connection timeout | Host did not respond in time |
| Address in use | Port is already bound by another process |

```robinpath
@desc "Connect with error handling"
do
  set $conn as net.connect "localhost" 8080
  if $conn != null
    net.send $conn "ping"
    set $response as net.read $conn
    print "Server says: " + $response
    net.close $conn
  else
    print "Could not connect"
  end
enddo
```

## Recipes

### 1. TCP client-server communication

Connect to a server, exchange messages, and disconnect.

```robinpath
@desc "Send a message to a TCP server"
do
  set $conn as net.connect "api.example.com" 9000
  net.send $conn "GET /status"
  set $response as net.read $conn
  print "Response: " + $response
  net.close $conn
enddo
```

### 2. Validate IP addresses

Check and classify IP addresses.

```robinpath
@desc "Validate a list of IPs"
do
  set $ips as ["192.168.1.1", "::1", "invalid", "10.0.0.1"]
  each $ip in $ips
    if net.isIPv4 $ip
      print $ip + " is IPv4"
    elif net.isIPv6 $ip
      print $ip + " is IPv6"
    else
      print $ip + " is not a valid IP"
    end
  endeach
enddo
```

## Related Modules

- **tls** -- Encrypted TLS/SSL connections
- **dns** -- DNS lookups and resolution
- **http** -- HTTP-level requests
