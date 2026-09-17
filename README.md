# Video QA Challenge Tests

Android mobile test automation for Video QA Challenge using Appium, WebdriverIO, TypeScript, and UiAutomator2.

## Prerequisites

- Node.js 20.19 or newer
- JDK 17
- Android SDK with `ANDROID_HOME` configured
- A running Android emulator or connected device visible in `adb devices`
- `VideoQAChallenge-debug.apk` from the [application repository](https://github.com/tchumakina/video-qa-challenge-android/tree/main/bin)

## Run

Install dependencies:

~~~bash
npm install
~~~

Run TypeScript checks:

~~~bash
npm run typecheck
~~~

Run the mandatory flow:

~~~bash
APP_PATH=/absolute/path/to/VideoQAChallenge-debug.apk npm run test:mandatory
~~~

The application is launched from a deterministic reset state.

The mandatory flow:

- accepts consent;
- verifies the content overview;
- opens `Amsterdam from above` using its stable content ID;
- verifies the correct detail page;
- starts video playback;
- waits for the observable player state to reach `Playing` using WebdriverIO assertions.

Run the playback-error risk scenario:

~~~bash
APP_PATH=/absolute/path/to/VideoQAChallenge-debug.apk npm run test:risk
~~~

`test:risk` sets the documented `videoMode=error` launch configuration through `VIDEO_MODE`; other runs default to `normal`. Playback is the product's core user value, so this scenario verifies that a deterministic playback failure presents an explicit error and retry option instead of an ambiguous or stuck player.
