import { $, expect } from '@wdio/globals';

describe('Application startup', () => {
  it('displays the consent screen from a clean state', async () => {
    await expect($('id=consent_screen')).toBeDisplayed();
  });
});
