import { expect } from '@wdio/globals';
import { consentScreen } from '../screens/consent.screen.js';
import { detailScreen } from '../screens/detail.screen.js';
import { overviewScreen } from '../screens/overview.screen.js';

describe('Playback error handling', () => {
  it('shows an explicit error and retry option', async () => {
    await expect(consentScreen.root).toBeDisplayed();
    await consentScreen.acceptAll();

    await expect(overviewScreen.root).toBeDisplayed();
    await overviewScreen.openAmsterdam();

    await expect(detailScreen.root).toBeDisplayed();
    await expect(detailScreen.amsterdamTitle).toHaveText('Amsterdam from above');
    await detailScreen.startPlayback();

    await expect(detailScreen.playbackState).toHaveText('Error');
    await expect(detailScreen.errorMessage).toHaveText(
      expect.stringContaining('Video could not be played'),
    );
    await expect(detailScreen.retryButton).toBeDisplayed();
  });
});
