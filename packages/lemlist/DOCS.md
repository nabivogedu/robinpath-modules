---
title: "Lemlist"
module: "lemlist"
package: "@robinpath/lemlist"
description: "Lemlist module for RobinPath."
category: "email-marketing"
tags: [lemlist, email marketing]
type: "integration"
auth: "api-key"
functionCount: 15
baseUrl: "https://api.lemlist.com"
---

# Lemlist

> Lemlist module for RobinPath.

**Package:** `@robinpath/lemlist` | **Category:** Email Marketing | **Type:** Integration


## Authentication

```robinpath
lemlist.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `lemlist` module when you need to:

- **listCampaigns** -- Use `lemlist.listCampaigns` to perform this operation
- **getCampaign** -- Use `lemlist.getCampaign` to perform this operation
- **listCampaignLeads** -- Use `lemlist.listCampaignLeads` to perform this operation
- **addLeadToCampaign** -- Use `lemlist.addLeadToCampaign` to perform this operation
- **deleteLeadFromCampaign** -- Use `lemlist.deleteLeadFromCampaign` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure lemlist credentials. | `object` |
| [`listCampaigns`](#listcampaigns) | listCampaigns | `object` |
| [`getCampaign`](#getcampaign) | getCampaign | `object` |
| [`listCampaignLeads`](#listcampaignleads) | listCampaignLeads | `object` |
| [`addLeadToCampaign`](#addleadtocampaign) | addLeadToCampaign | `object` |
| [`deleteLeadFromCampaign`](#deleteleadfromcampaign) | deleteLeadFromCampaign | `object` |
| [`pauseLeadInCampaign`](#pauseleadincampaign) | pauseLeadInCampaign | `object` |
| [`resumeLeadInCampaign`](#resumeleadincampaign) | resumeLeadInCampaign | `object` |
| [`markLeadAsInterested`](#markleadasinterested) | markLeadAsInterested | `object` |
| [`unsubscribeLead`](#unsubscribelead) | unsubscribeLead | `object` |
| [`listActivities`](#listactivities) | listActivities | `object` |
| [`getLeadByEmail`](#getleadbyemail) | getLeadByEmail | `object` |
| [`listUnsubscribes`](#listunsubscribes) | listUnsubscribes | `object` |
| [`exportCampaignStats`](#exportcampaignstats) | exportCampaignStats | `object` |
| [`getCampaignStats`](#getcampaignstats) | getCampaignStats | `object` |


## Functions

### setCredentials

Configure lemlist credentials.

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | apiKey |

---

### listCampaigns

listCampaigns

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.listCampaigns
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCampaign

getCampaign

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.getCampaign
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCampaignLeads

listCampaignLeads

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.listCampaignLeads
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addLeadToCampaign

addLeadToCampaign

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.addLeadToCampaign
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteLeadFromCampaign

deleteLeadFromCampaign

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.deleteLeadFromCampaign
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### pauseLeadInCampaign

pauseLeadInCampaign

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.pauseLeadInCampaign
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### resumeLeadInCampaign

resumeLeadInCampaign

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.resumeLeadInCampaign
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### markLeadAsInterested

markLeadAsInterested

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.markLeadAsInterested
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### unsubscribeLead

unsubscribeLead

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.unsubscribeLead
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listActivities

listActivities

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.listActivities
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getLeadByEmail

getLeadByEmail

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.getLeadByEmail
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listUnsubscribes

listUnsubscribes

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.listUnsubscribes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### exportCampaignStats

exportCampaignStats

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.exportCampaignStats
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCampaignStats

getCampaignStats

**Module:** `lemlist` | **Returns:** `object` -- API response.

```robinpath
lemlist.getCampaignStats
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Lemlist API error (${res.status}): ${t}` | Check the error message for details |
| `lemlist.setCredentials requires apiKey.` | Check the error message for details |
| `lemlist.deleteLeadFromCampaign requires an ID.` | Check the error message for details |
| `lemlist.pauseLeadInCampaign requires an ID.` | Check the error message for details |
| `lemlist.resumeLeadInCampaign requires an ID.` | Check the error message for details |
| `lemlist.unsubscribeLead requires an ID.` | Check the error message for details |
| `Lemlist: "..." not configured. Call lemlist.setCredentials first.` | Check the error message for details |

```robinpath
set $result as lemlist.listCampaigns
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Campaigns

Retrieve all items and loop through them.

```robinpath
lemlist.setCredentials $token
set $result as lemlist.listCampaigns
each $item in $result
  print $item
end
```

### 2. Create a new item with addLeadToCampaign

Create a new resource and capture the result.

```robinpath
lemlist.setCredentials $token
set $result as lemlist.addLeadToCampaign
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
lemlist.setCredentials $token
set $existing as lemlist.listCampaigns
if $existing == null
  lemlist.addLeadToCampaign
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Lemlist workflow

Chain multiple lemlist operations together.

```robinpath
lemlist.setCredentials $token
set $r_listCampaigns as lemlist.listCampaigns
set $r_getCampaign as lemlist.getCampaign
set $r_listCampaignLeads as lemlist.listCampaignLeads
print "All operations complete"
```

### 5. Safe listCampaigns with validation

Check results before proceeding.

```robinpath
lemlist.setCredentials $token
set $result as lemlist.listCampaigns
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **activecampaign** -- ActiveCampaign module for complementary functionality
- **brevo** -- Brevo module for complementary functionality
- **convertkit** -- Convertkit module for complementary functionality
- **mailchimp** -- Mailchimp module for complementary functionality
- **sendgrid** -- SendGrid module for complementary functionality
