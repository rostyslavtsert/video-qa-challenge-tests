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

  get errorMessage() {
    return $('id=video_error_message');
  }

  get retryButton() {
    return $('id=video_retry_button');
  }

  async startPlayback() {
    await $('id=video_play_button').click();
  }
}

export const detailScreen = new DetailScreen();
