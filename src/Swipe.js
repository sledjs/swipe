'use strict';

class Swipe {
  constructor() {
    this.drag = 10;
    this.press = false;
  }

  init(core) {
    this.slides = core.modules.slides;

    this.bootstrapEvents(core.$, 'mousemove', 'mousedown', 'mouseup', 'mouseleave');
  }

  bootstrapEvents($elem, move, down, ...up) {
    $elem.addEventListener(move, e => ::this.swipe(e.movementX));
    $elem.addEventListener(down, this.toggle(true));
    up.forEach(event =>
      $elem.addEventListener(event, this.toggle(false)));
  }

  swipe(movement) {
    if (this.press && Math.abs(movement) > this.drag)
      this.slides[movement < 0 ? 'next' : 'prev']();
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
};

export default Swipe;
