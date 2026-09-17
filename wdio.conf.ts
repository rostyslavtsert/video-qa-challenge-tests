import { resolve } from 'node:path';

declare global {
  namespace WebdriverIO {
    interface Capabilities {
      'appium:disableIdLocatorAutocompletion'?: boolean;
    }
  }
}

const appPath = process.env.APP_PATH;
const videoMode = process.env.VIDEO_MODE ?? 'normal';

if (!appPath) {
  throw new Error('APP_PATH must point to VideoQAChallenge-debug.apk');
}

if (!['normal', 'buffering', 'error', 'completeQuickly'].includes(videoMode)) {
  throw new Error(`Unsupported VIDEO_MODE: ${videoMode}`);
}

export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: ['./test/specs/**/*.spec.ts'],
  maxInstances: 1,
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:app': resolve(appPath),
      'appium:appPackage': 'com.videoqa.challenge',
      'appium:appActivity': '.MainActivity',
      'appium:noReset': true,
      'appium:forceAppLaunch': true,
      'appium:shouldTerminateApp': true,
      'appium:orientation': 'PORTRAIT',
      'appium:disableIdLocatorAutocompletion': true,
      'appium:optionalIntentArguments':
        '--ez resetAllState true --es contentMode success --ei contentDelayMs 0 ' +
        `--es videoMode ${videoMode} --ei videoBufferingMs 0`,
    },
  ],
  services: ['appium'],
  framework: 'mocha',
  reporters: [],
  waitforTimeout: 10_000,
  connectionRetryTimeout: 120_000,
  connectionRetryCount: 1,
  mochaOpts: {
    timeout: 30_000,
  },
};
