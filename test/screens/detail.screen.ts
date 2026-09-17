import { $ } from '@wdio/globals';

class DetailScreen {
  get root() {
    return $('id=content_detail_screen');
  }

  get amsterdamTitle() {
    return $('~amsterdam');
  }

  get playbackState() {
    return $('id=video_state_label');
  }

  async startPlayback() {
    await $('id=video_play_button').click();
  }
}

export const detailScreen = new DetailScreen();
