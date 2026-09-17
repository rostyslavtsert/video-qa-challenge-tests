# Video QA Challenge Tests

Android mobile automation for the [Video QA Challenge application](https://github.com/tchumakina/video-qa-challenge-android).

## Approach And Test Plan

Android is the target platform permitted by the assignment. Appium, WebdriverIO, and TypeScript were selected because they are the assignment's preferred stack, with UiAutomator2 as Appium's Android automation driver. WebdriverIO provides retrying condition-based assertions, avoiding custom polling and arbitrary waits, while the local Appium service keeps setup and execution simple. The solution focuses on deterministic, observable user behaviour and intentionally stays small rather than introducing a large framework for three scenarios.

## Automated Scenarios

1. **Startup smoke check**: launches from clean state and verifies that the consent screen is displayed. This provides a fast check that the application starts and exposes its automation identifiers.
2. **Mandatory playback flow**: accepts consent, verifies the overview, opens `Amsterdam from above` by content identity, verifies the correct detail page, starts playback, and verifies the observable `Playing` state.
3. **Playback-error risk scenario**: follows the same path with deterministic `videoMode=error`, then verifies the `Error` state, the message `Video could not be played`, and a visible Retry control.

## Risk-Based Rationale

Video playback is the core user value of a media product. A playback failure should give explicit feedback and a recovery option instead of leaving the user in an ambiguous or stuck state. The application provides a deterministic video error mode, making this scenario reproducible and reliable.

Retry recovery is intentionally not asserted. Under deterministic `videoMode=error`, Retry continues to use the same error mode, so `Retry -> Playing` is not expected.

## Project Structure

```text
test/screens/       Small screen objects containing stable locators and actions
test/specs/         Smoke, mandatory, and playback-error scenarios
wdio.conf.ts        Android, Appium, launch-state, and synchronization configuration
tsconfig.json       TypeScript configuration
package.json        Exact test and typecheck commands
```

## Locator Strategy

- Stable Compose test tags exposed as resource IDs are preferred.
- `content_item_amsterdam` identifies the content card without relying on list position.
- The documented `amsterdam` accessibility/content ID identifies the correct detail title.
- XPath and list-position selectors are not used.
- `appium:disableIdLocatorAutocompletion=true` is required because the application exposes bare resource IDs without a package prefix.

## Synchronization Strategy

WebdriverIO assertions provide condition-based waiting for displayed elements and expected text. Synchronization uses observable application states, including `Playing` and `Error`. The tests contain no arbitrary sleeps or `browser.pause()` calls.

## Deterministic State Management

Every Appium session force-launches the application with its documented launch configuration:

- `resetAllState=true` clears persisted application and debug state.
- `contentMode=success` fixes the content response mode.
- `contentDelayMs=0` fixes the content delay.
- `VIDEO_MODE` defaults to `normal`, which is used by the smoke and mandatory commands.
- `test:risk` explicitly sets `VIDEO_MODE=error`.

This prevents persisted consent or debug settings from leaking between independently executed tests.

## Execution Environment

- Host: macOS
- Device: Android Emulator, Pixel 7
- OS: Android 15 / API 35
- Orientation: portrait
- Automation server: Appium
- Driver: UiAutomator2

API 35 matches the challenge application's target and recommended Android level. An emulator is sufficient for these flows because the application is deterministic, uses bundled local media, does not depend on external services, and exposes explicit test and debug hooks. This configuration provides reproducible local execution.

## Prerequisites

- Node.js 20.19 or newer
- JDK 17
- Android SDK with `ANDROID_HOME` configured
- A running Android emulator visible in `adb devices`
- `VideoQAChallenge-debug.apk` from the application repository

The APK is intentionally not committed to this repository.

## Setup And Run

Install dependencies:

```bash
npm install
```

Run TypeScript checks:

```bash
npm run typecheck
```

Run the complete test suite:

```bash
APP_PATH=/absolute/path/to/VideoQAChallenge-debug.apk npm test
```

This runs the TypeScript check and all automated scenarios sequentially. Each scenario keeps its own deterministic launch configuration.

Run the startup smoke test:

```bash
APP_PATH=/absolute/path/to/VideoQAChallenge-debug.apk npm run test:smoke
```

Run the mandatory playback flow:

```bash
APP_PATH=/absolute/path/to/VideoQAChallenge-debug.apk npm run test:mandatory
```

Run the playback-error risk scenario:

```bash
APP_PATH=/absolute/path/to/VideoQAChallenge-debug.apk npm run test:risk
```

Each test command starts and stops its own local Appium server.

Tests should be executed through the provided npm scripts because individual scenarios use different deterministic launch configurations.

## Execution Report

- TypeScript typecheck: **PASS**
- Startup smoke test: **PASS**
- Mandatory playback flow: **PASS**
- Playback-error risk scenario: **PASS**

## Known Limitations, Risks, And Open Questions

### Known Limitations

- Coverage is Android-only, as permitted by the assignment.
- Retry recovery is not asserted while using deterministic `videoMode=error`.

### Risks

- Validation is currently limited to one emulator, API, and device configuration.
- Deterministic debug hooks make failure-path automation reliable but do not reproduce every real-world media or network failure mechanism.
- The locator strategy depends on the documented bare resource-ID behaviour and `appium:disableIdLocatorAutocompletion=true`.

### Open Questions

- Should production coverage include real network or media failure conditions in addition to deterministic debug modes?
- Which Android device and API matrix would be considered representative?
- Is CI or device-cloud execution expected for a production suite?

## Next Steps

Remaining work would keep one focused spec per deterministic behaviour or mode, reuse and extend the existing small screen objects, and use documented launch extras to configure content and video state. Functional and state coverage should expand first, followed by broader device and API coverage, then CI or device-cloud execution if needed.

1. Verify content loading and configured slow-loading behaviour.
2. Verify content empty and error states.
3. Verify longer buffering behaviour.
4. Verify playback progress persistence and resume behaviour.
5. Run against additional Android API/device configurations, then add CI or device-cloud execution if required.

## AI Usage

AI tools were used to support requirements analysis, solution structuring, troubleshooting, code review, and the evaluation of implementation options. Final design decisions, test scenarios, code changes, assertions, and observed behaviour were reviewed, adjusted, and validated manually.

Representative prompts:

- "Review the challenge requirements and suggest a focused Android automation scope."
- "Review the proposed locator and synchronization strategy for reliability."
- "Review the playback-error scenario and verify that its assertions match the application's documented behaviour."

## Actual Time Spent

Approximately 4 hours of active work across requirements analysis, automation setup, implementation, debugging, test execution, review, and documentation.
