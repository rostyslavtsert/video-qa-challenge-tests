import { $ } from '@wdio/globals';

class OverviewScreen {
  get root() {
    return $('id=content_overview_screen');
  }

  async openAmsterdam() {
    await $('id=content_item_amsterdam').click();
  }
}

export const overviewScreen = new OverviewScreen();
