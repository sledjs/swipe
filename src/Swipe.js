'use strict';

class Swipe {
  constructor() {
    this.drag = 10;
    this.lastTouch = null;
    this.press = false;
  }

  init(core) {
    this.slides = core.modules.slides;

    this.bootstrapEvents(core.$, 'mousemove', 'mousedown', 'mouseup', 'mouseleave');
    core.$.addEventListener('touchmove', ::this.touch);
  }

  bootstrapEvents($elem, move, down, ...up) {
    $elem.addEventListener(move, e => ::this.mouse(e.movementX));
    $elem.addEventListener(down, this.toggle(true));
    up.forEach(event =>
      $elem.addEventListener(event, this.toggle(false)));
  }

  touch(e) {
    e.preventDefault();
    let touch = e.touches[0].clientX;

    this.swipe(touch - this.lastTouch);
    this.lastTouch = touch;
  }

  mouse(movement) {
    if (this.press) this.swipe(movement);
  }

  swipe(movement) {
    if (Math.abs(movement) > this.drag)
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
