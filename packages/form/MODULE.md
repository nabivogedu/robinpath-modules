---
title: "Form"
module: "form"
package: "@robinpath/form"
description: "Declarative form builder — define fields inline in RobinPath scripts to generate form schemas, validate submissions, and embed forms anywhere"
category: "web"
tags: [form, form-builder, schema, validation, embed]
type: "utility"
auth: "none"
functionCount: 27
---

# Form

> Declarative form builder — define fields inline in RobinPath scripts to generate form schemas, validate submissions, and embed forms anywhere

**Package:** `@robinpath/form` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `form` module when you need to:

- **Build self-describing forms** -- Scripts declare their own fields inline, making them portable and self-documenting
- **Create contact forms, lead capture, surveys** -- Combine with HubSpot, Slack, or any API module
- **Validate form submissions** -- Check required fields, types, patterns, min/max before processing
- **Generate embeddable forms** -- Use `form.toEmbed` to get iframe/web-component snippets
- **Build multi-step wizards** -- Use `form.step` to split forms into logical sections


## Quick Reference

### Field Types (19)

| Function | Description | Returns |
|----------|-------------|--------|
| [`text`](#text) | Declare a text input field | `string` |
| [`textarea`](#textarea) | Declare a multi-line text field | `string` |
| [`number`](#number) | Declare a number input field | `number` |
| [`email`](#email) | Declare an email input field | `string` |
| [`url`](#url) | Declare a URL input field | `string` |
| [`phone`](#phone) | Declare a phone number input field | `string` |
| [`password`](#password) | Declare a password input field | `string` |
| [`select`](#select) | Declare a single-select dropdown | `string` |
| [`multiselect`](#multiselect) | Declare a multi-select field | `array` |
| [`checkbox`](#checkbox) | Declare a checkbox field | `boolean` |
| [`radio`](#radio) | Declare a radio button group | `string` |
| [`date`](#date) | Declare a date input field | `string` |
| [`time`](#time) | Declare a time input field | `string` |
| [`datetime`](#datetime) | Declare a date-time input field | `string` |
| [`file`](#file) | Declare a file upload field | `object` |
| [`hidden`](#hidden) | Declare a hidden field | `any` |
| [`color`](#color) | Declare a color picker field | `string` |
| [`range`](#range) | Declare a range slider field | `number` |
| [`json`](#json) | Declare a JSON input field | `object` |

### Utility Functions (8)

| Function | Description | Returns |
|----------|-------------|--------|
| [`config`](#config) | Set form-level configuration (title, submitLabel, etc.) | `true` |
| [`getForm`](#getform) | Get the complete form schema | `{config, fields}` |
| [`validate`](#validate) | Validate data against declared fields | `{valid, errors}` |
| [`setData`](#setdata) | Inject submitted form data | `true` |
| [`reset`](#reset) | Clear all fields, config, and data | `true` |
| [`group`](#group) | Define a visual field group | `true` |
| [`step`](#step) | Define a multi-step wizard step | `true` |
| [`toEmbed`](#toembed) | Generate embed code (iframe, script, web component) | `{iframe, script, webComponent}` |


## How It Works

Each `form.X()` field call does TWO things simultaneously:
1. **Registers a field definition** in an internal schema (builds the form)
2. **Returns the current value** for that field (from submitted data or default)

**Phase 1 — Get form schema (no submitted data):**
Script runs → `form.X` calls register fields and return defaults/null → `form.getForm` returns `{config, fields}` → Renderer displays form UI

**Phase 2 — Submit (script runs with data):**
`form.setData $submittedValues` → `form.X` calls register fields AND return submitted values → Script logic executes (hubspot, slack, etc.) → Result returned


## Functions

### text

Declare a text input field. Registers the field and returns the current value.

**Module:** `form` | **Returns:** `string` -- Submitted value or default

```robinpath
form.text "name" {"label": "Full Name", "required": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name (alphanumeric + underscore) |
| `options` | `object` | No | {label, placeholder, required, defaultValue, disabled, description, validation} |

---

### textarea

Declare a multi-line text field.

**Module:** `form` | **Returns:** `string` -- Submitted value or default

```robinpath
form.textarea "bio" {"label": "Bio", "maxLength": 1000}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, maxLength, required, placeholder} |

---

### number

Declare a number input field.

**Module:** `form` | **Returns:** `number` -- Submitted value or default

```robinpath
form.number "age" {"label": "Age", "min": 0, "max": 120}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, min, max, step, required} |

---

### email

Declare an email input field with automatic email format validation.

**Module:** `form` | **Returns:** `string` -- Submitted value or default

```robinpath
form.email "email" {"label": "Email", "required": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, required, placeholder} |

---

### url

Declare a URL input field with automatic URL format validation.

**Module:** `form` | **Returns:** `string` -- Submitted value or default

```robinpath
form.url "website" {"label": "Website"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, required, placeholder} |

---

### phone

Declare a phone number input field.

**Module:** `form` | **Returns:** `string` -- Submitted value or default

```robinpath
form.phone "phone" {"label": "Phone Number"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, required, placeholder} |

---

### password

Declare a password input field.

**Module:** `form` | **Returns:** `string` -- Submitted value or default

```robinpath
form.password "secret" {"label": "Password"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, required, minLength, placeholder} |

---

### select

Declare a single-select dropdown field. Options can be strings or `{value, label}` objects.

**Module:** `form` | **Returns:** `string` -- Submitted value or default

```robinpath
form.select "plan" {"label": "Plan", "options": ["free", "pro", "enterprise"]}
```

```robinpath
form.select "country" {"label": "Country", "options": [{"value": "us", "label": "United States"}, {"value": "uk", "label": "United Kingdom"}]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, options (array), required} |

---

### multiselect

Declare a multi-select field. Returns an array of selected values.

**Module:** `form` | **Returns:** `array` -- Submitted values or default

```robinpath
form.multiselect "tags" {"label": "Tags", "options": ["sale", "new", "featured", "limited"]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, options (array), required} |

---

### checkbox

Declare a checkbox field. Returns a boolean value.

**Module:** `form` | **Returns:** `boolean` -- Submitted value or default

```robinpath
form.checkbox "agree" {"label": "I agree to terms"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, required} |

---

### radio

Declare a radio button group.

**Module:** `form` | **Returns:** `string` -- Submitted value or default

```robinpath
form.radio "tier" {"label": "Tier", "options": ["basic", "premium"]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, options (array), required} |

---

### date

Declare a date input field.

**Module:** `form` | **Returns:** `string` -- Submitted date value or default

```robinpath
form.date "birthday" {"label": "Birthday"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, min, max, required} |

---

### time

Declare a time input field.

**Module:** `form` | **Returns:** `string` -- Submitted time value or default

```robinpath
form.time "meetingTime" {"label": "Meeting Time"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, min, max, required} |

---

### datetime

Declare a date-time input field.

**Module:** `form` | **Returns:** `string` -- Submitted datetime value or default

```robinpath
form.datetime "eventStart" {"label": "Event Start"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, min, max, required} |

---

### file

Declare a file upload field.

**Module:** `form` | **Returns:** `object` -- Submitted file object or null

```robinpath
form.file "resume" {"label": "Upload Resume", "accept": ".pdf,.doc"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, accept (MIME types), maxSize (bytes), required} |

---

### hidden

Declare a hidden field (not visible to the user, carries data).

**Module:** `form` | **Returns:** `any` -- Submitted value or default

```robinpath
form.hidden "source" {"defaultValue": "website"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {defaultValue} |

---

### color

Declare a color picker field.

**Module:** `form` | **Returns:** `string` -- Submitted color value or default

```robinpath
form.color "brandColor" {"label": "Brand Color"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, defaultValue} |

---

### range

Declare a range slider field.

**Module:** `form` | **Returns:** `number` -- Submitted value or default

```robinpath
form.range "budget" {"label": "Budget", "min": 0, "max": 10000, "step": 100}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, min, max, step, required} |

---

### json

Declare a JSON input field for structured data.

**Module:** `form` | **Returns:** `object` -- Submitted JSON value or default

```robinpath
form.json "metadata" {"label": "Custom Data"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Unique field name |
| `options` | `object` | No | {label, required} |

---

### config

Set form-level configuration like title, description, submit button label, and messages.

**Module:** `form` | **Returns:** `boolean` -- true

```robinpath
form.config {"title": "Contact Us", "submitLabel": "Send Message", "successMessage": "Thanks!"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | Yes | {title, description, submitLabel, successMessage, errorMessage, theme} |

---

### getForm

Get the complete form schema including config and all declared fields. Call this at the end of your script (Phase 1) to return the form definition for rendering.

**Module:** `form` | **Returns:** `object` -- {config, fields}

```robinpath
form.getForm
```

No parameters.

---

### validate

Validate a data object against all declared fields. Checks required, email format, URL format, number ranges, string lengths, regex patterns, and option validity.

**Module:** `form` | **Returns:** `object` -- {valid: boolean, errors: {fieldName: [messages]}}

```robinpath
form.validate $formData
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Key-value pairs to validate against declared fields |

---

### setData

Inject submitted form data so that subsequent field calls return the submitted values instead of defaults.

**Module:** `form` | **Returns:** `boolean` -- true

```robinpath
form.setData $submittedValues
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Submitted key-value pairs |

---

### reset

Clear all fields, config, and submitted data. Resets the module to a fresh state.

**Module:** `form` | **Returns:** `boolean` -- true

```robinpath
form.reset
```

No parameters.

---

### group

Define a visual field group for organizing related fields together in the rendered form.

**Module:** `form` | **Returns:** `boolean` -- true

```robinpath
form.group "personal" {"label": "Personal Info", "fields": ["name", "email", "phone"]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Group name |
| `options` | `object` | No | {label, description, fields (array of field names)} |

---

### step

Define a multi-step wizard step. Fields in each step are shown together on one page.

**Module:** `form` | **Returns:** `boolean` -- true

```robinpath
form.step "Basic Info" {"fields": ["title", "description", "price"]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Step name displayed to the user |
| `options` | `object` | No | {description, fields (array of field names)} |

---

### toEmbed

Generate embed code for displaying the form on any website. Returns iframe, script tag, and web component snippets.

**Module:** `form` | **Returns:** `object` -- {iframe, script, webComponent}

```robinpath
form.toEmbed "https://rpshotter.example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `baseUrl` | `string` | Yes | Base URL of the form endpoint |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Field name is required` | Passed an empty string as field name |
| `Invalid field name "X"` | Name contains invalid characters (only alphanumeric + underscore allowed) |
| `Duplicate field name "X"` | Two fields declared with the same name |
| `Maximum 50 fields per form` | Too many fields declared |
| `Maximum 10 steps per form` | Too many steps declared |
| `Maximum 100 options allowed` | Select/multiselect has too many options |
| `Invalid regex pattern` | Pattern in validation rule is not valid regex |


## Recipes

### 1. HubSpot Lead Capture Form

Build a contact form that creates a HubSpot contact on submission.

```robinpath
form.config {"title": "Contact Us", "submitLabel": "Send Message"}

$name = form.text "name" {"label": "Full Name", "required": true}
$email = form.email "email" {"label": "Email", "required": true}
$phone = form.phone "phone" {"label": "Phone"}
$country = form.select "country" {"label": "Country", "options": ["US", "UK", "FR", "DE"]}
$message = form.textarea "message" {"label": "Message", "maxLength": 1000}

if $__formSubmitted
  $v = form.validate $__formData
  if $v.valid is false
    return {"success": false, "errors": $v.errors}
  endif

  hubspot.createContact {"email": $email, "firstname": $name, "phone": $phone, "country": $country, "notes": $message}
  return {"success": true, "message": "Thank you!"}
endif

form.getForm
```

### 2. Slack Team Notification Form

Let team members send messages to Slack channels with urgency levels.

```robinpath
form.config {"title": "Send Team Notification"}

$channel = form.select "channel" {"label": "Channel", "options": ["#general", "#dev", "#marketing"]}
$urgency = form.radio "urgency" {"label": "Urgency", "options": ["low", "medium", "high"]}
$message = form.textarea "message" {"label": "Message", "required": true}
$notify = form.checkbox "notify" {"label": "Notify @channel"}

if $__formSubmitted
  $prefix = ""
  if $notify
    $prefix = "<!channel> "
  endif
  slack.send $channel $prefix + $message
  return {"success": true}
endif

form.getForm
```

### 3. Multi-Step Product Creator

Create a Shopify product through a wizard-style form with steps.

```robinpath
form.config {"title": "Add New Product"}
form.step "Basic Info" {"fields": ["title", "description", "price"]}
form.step "Details" {"fields": ["category", "tags", "sku"]}
form.step "Media" {"fields": ["image"]}

$title = form.text "title" {"label": "Product Title", "required": true}
$description = form.textarea "description" {"label": "Description"}
$price = form.number "price" {"label": "Price ($)", "min": 0, "step": 0.01, "required": true}
$category = form.select "category" {"label": "Category", "options": ["Clothing", "Electronics", "Home"]}
$tags = form.multiselect "tags" {"label": "Tags", "options": ["sale", "new", "featured", "limited"]}
$sku = form.text "sku" {"label": "SKU"}
$image = form.file "image" {"label": "Product Image", "accept": "image/*"}

if $__formSubmitted
  shopify.createProduct {"title": $title, "body_html": $description, "variants": [{"price": $price, "sku": $sku}], "tags": $tags}
  return {"success": true}
endif

form.getForm
```

### 4. Meeting Scheduler

Schedule meetings with Google Calendar integration.

```robinpath
form.config {"title": "Schedule a Meeting"}

$name = form.text "name" {"label": "Your Name", "required": true}
$email = form.email "email" {"label": "Email", "required": true}
$date = form.date "date" {"label": "Preferred Date", "required": true}
$time = form.time "time" {"label": "Preferred Time", "required": true}
$duration = form.select "duration" {"label": "Duration", "options": ["30 min", "60 min", "90 min"]}
$notes = form.textarea "notes" {"label": "Meeting Notes"}

if $__formSubmitted
  google-calendar.createEvent {"summary": "Meeting with " + $name, "date": $date, "time": $time, "duration": $duration, "attendees": [$email], "description": $notes}
  return {"success": true}
endif

form.getForm
```

### 5. Simple Feedback Form with Validation

Collect user feedback with custom pattern validation.

```robinpath
form.config {"title": "Feedback", "submitLabel": "Send Feedback"}

$name = form.text "name" {"label": "Name", "required": true, "minLength": 2}
$email = form.email "email" {"label": "Email", "required": true}
$rating = form.range "rating" {"label": "Rating", "min": 1, "max": 10, "step": 1}
$feedback = form.textarea "feedback" {"label": "Your Feedback", "required": true, "maxLength": 2000}

if $__formSubmitted
  $v = form.validate $__formData
  if $v.valid is false
    return {"success": false, "errors": $v.errors}
  endif
  return {"success": true, "message": "Thanks for your feedback!"}
endif

form.getForm
```

### 6. Embeddable Form

Generate embed code for placing a form on any website.

```robinpath
form.config {"title": "Newsletter Signup"}
form.text "name" {"label": "Name", "required": true}
form.email "email" {"label": "Email", "required": true}
form.checkbox "marketing" {"label": "Send me marketing emails"}

$embed = form.toEmbed "https://rpshotter.example.com"
return $embed
```


## Related Modules

- **formdata** -- HTTP multipart FormData builder and file uploads (renamed from the old `form` module)
- **validate** -- Additional validation utilities
- **schema** -- JSON schema validation
- **hubspot** -- CRM integration for lead capture forms
- **slack** -- Team notifications from form submissions
- **shopify** -- E-commerce product creation from forms
