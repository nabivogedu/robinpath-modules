# @robinpath/zoom

> Zoom module for RobinPath.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `zoom` module lets you:

- listMeetings
- getMeeting
- createMeeting
- updateMeeting
- deleteMeeting

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/zoom
```

## Quick Start

**1. Set up credentials**

```robinpath
zoom.setCredentials "your-credentials"
```

**2. listMeetings**

```robinpath
zoom.listMeetings
```

## Available Functions

| Function | Description |
|----------|-------------|
| `zoom.setCredentials` | Configure zoom credentials. |
| `zoom.listMeetings` | listMeetings |
| `zoom.getMeeting` | getMeeting |
| `zoom.createMeeting` | createMeeting |
| `zoom.updateMeeting` | updateMeeting |
| `zoom.deleteMeeting` | deleteMeeting |
| `zoom.endMeeting` | endMeeting |
| `zoom.listMeetingRegistrants` | listMeetingRegistrants |
| `zoom.addMeetingRegistrant` | addMeetingRegistrant |
| `zoom.listRecordings` | listRecordings |
| `zoom.getRecording` | getRecording |
| `zoom.deleteRecording` | deleteRecording |
| `zoom.listUsers` | listUsers |
| `zoom.getUser` | getUser |
| `zoom.listWebinars` | listWebinars |
| `zoom.createWebinar` | createWebinar |
| `zoom.getMeetingParticipants` | getMeetingParticipants |
| `zoom.sendChatMessage` | sendChatMessage |
| `zoom.listChannels` | listChannels |

## Examples

### listMeetings

```robinpath
zoom.listMeetings
```

### getMeeting

```robinpath
zoom.getMeeting
```

### createMeeting

```robinpath
zoom.createMeeting
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/zoom";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  zoom.setCredentials "your-credentials"
  zoom.listMeetings
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
