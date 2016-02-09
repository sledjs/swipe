'use strict';

class Swipe {
  constructor() {
    this.drag = 10;
    this.press = false;
  }

  init(core) {
    this.slides = core.modules.slides;

    core.$.addEventListener('mousemove', e => ::this.swipe(e.movementX));
    core.$.addEventListener('mousedown', e => this.press = true);
    core.$.addEventListener('mouseup', e => this.press = false);
    core.$.addEventListener('mouseleave', e => this.press = false);
  }

  swipe(movement) {
    if (this.press && Math.abs(movement) > this.drag)
      this.slides[movement < 0 ? 'next' : 'prev']();
  }
};

export default Swipe;
