'use strict';

class Swipe {
  constructor() {
    this.drag = 10;
    this.press = false;
  }

  toggle(bool) {
    bool = typeof bool == 'boolean'
      ? bool
      : this.press = !this.press;

    this.press = bool;

    return e => {
      this.toggle(bool);

      return false;
    };
  }

  init(core) {
    this.slides = core.modules.slides;

    core.$.addEventListener('mousemove', e => ::this.swipe(e.movementX));
    core.$.addEventListener('mousedown', this.toggle(true));
    core.$.addEventListener('mouseup', this.toggle(false));
    core.$.addEventListener('mouseleave', this.toggle(false));
  }

  swipe(movement) {
    if (this.press && Math.abs(movement) > this.drag)
      this.slides[movement < 0 ? 'next' : 'prev']();
  }
};

export default Swipe;
