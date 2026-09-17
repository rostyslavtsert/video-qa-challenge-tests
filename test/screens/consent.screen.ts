import { $ } from '@wdio/globals';

class ConsentScreen {
  get root() {
    return $('id=consent_screen');
  }

  async acceptAll() {
    await $('id=consent_accept_button').click();
  }
}

export const consentScreen = new ConsentScreen();
