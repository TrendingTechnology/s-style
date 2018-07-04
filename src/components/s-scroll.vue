<style lang="scss">
@import "../theme.scss";

.s-scroll {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  @include disabled();

  &:hover {
    > .s-scroll__track {
      opacity: 0.75;
    }
  }

  &__scroller {
    height: calc(100% + 17px);
    width: calc(100% + 17px);
    overflow-x: scroll;
    overflow-y: scroll;

    & ::-webkit-scrollbar {
      height: 17px !important;
      width: 17px !important;
    }
  }

  &__track {
    position: absolute;
    @include set-color("grey1", "background");
    right: 0;
    bottom: 0;
    opacity: 0;
    @include transition(opacity);
    &--y {
      top: 0;
      width: $scroll-size;
    }

    &--x {
      left: 0;
      height: $scroll-size;
    }
  }

  &__thumb {
    position: absolute;
    height: 100%;
    width: 100%;
    @include set-color("grey4", "background");

    &:hover {
      @include set-color("grey5", "background");
    }

    &--y {
      top: 0;
      height: 12px;
    }

    &--x {
      left: 0;
      width: 12px;
    }
  }
}
</style>
<template>
  <div v-bind:class="classObj">
    <div ref="scroller" v-on:scroll="onScroll" class="s-scroll__scroller">
      <slot></slot>
    </div>
    <div ref="trackY" v-show="showY" v-on:click="onTrackClickY" class="s-scroll__track s-scroll__track--y">
      <div ref="thumbY" v-on:click="onThumbClickY" v-on:mousedown="onThumbMousedownY" v-bind:style="{height: thumbYHeight + 'px', top:thumbYTop + 'px'}" class="s-scroll__thumb s-scroll__thumb--y"></div>
    </div>
    <div ref="trackX" v-show="showX" v-on:click="onTrackClickX" class="s-scroll__track s-scroll__track--x">
      <div ref="thumbX" v-on:click="onThumbClickX" v-on:mousedown="onThumbMousedownX" v-bind:style="{width: thumbXWidth + 'px', left:thumbXLeft + 'px'}" class="s-scroll__thumb s-scroll__thumb--x"></div>
    </div>
  </div>
</template>
<script>
import Utility from "../utility.js";

export default {
  name: "s-scroll",
  computed: {
    classObj: function() {
      const classObj = {
        "s-scroll": true,
        "s-scroll--disabled": this.disabled
      };

      return classObj;
    }
  },
  data() {
    return {
      showY: false,
      showX: false,
      scrollHeight: undefined,
      scrollWidth: undefined,
      containerHeight: undefined,
      containerWidth: undefined,
      thumbYTop: 0,
      thumbYHeight: 12,
      thumbXLeft: 0,
      thumbXWidth: 12,
      previousScrollTop: 0,
      previousScrollLeft: 0
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Function,
      default: () => {}
    },
    scrollX: {
      type: Function,
      default: () => {}
    },
    staticY: {
      type: Boolean,
      default: false
    },
    staticX: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * @name buildScroll
     * @desc called to build the scroll
     * @returns {void}
     */
    buildScroll: function() {
      if (!this.staticY) {
        this.$nextTick(function() {
          if (
            this.scrollHeight !== this.$refs.scroller.scrollHeight ||
            this.containerHeight !== this.$el.offsetHeight
          ) {
            this.buildScrollY();
          }
        });
      }

      if (!this.staticX) {
        this.$nextTick(function() {
          if (
            this.scrollWidth !== this.$refs.scroller.scrollWidth ||
            this.containerWidth !== this.$el.offsetWidth
          ) {
            this.buildScrollX();
          }
        });
      }
    },
    /**
     * @name buildScrollY
     * @desc called to build the scroll
     * @returns {void}
     */
    buildScrollY: function() {
      this.scrollHeight = this.$refs.scroller.scrollHeight;
      this.containerHeight = this.$el.offsetHeight;

      //hide
      if (this.containerHeight >= this.scrollHeight) {
        this.showY = false;
        return;
      }

      //show
      this.showY = true;
      this.sizeThumbY();
      this.positionThumbY();
    },
    /**
     * @name positionThumbY
     * @desc called to position the thumb
     * @returns {void}
     */
    positionThumbY: function() {
      //set the position of the thumb
      let pos =
        (1 - this.thumbYHeight / this.containerHeight) *
        this.containerHeight *
        (this.$refs.scroller.scrollTop /
          (this.scrollHeight - this.containerHeight));

      pos = this.restrictDimensionsY(pos);

      this.thumbYTop = pos;
    },
    /**
     * @name sizeThumbY
     * @desc called to position the thumb
     * @returns {void}
     */
    sizeThumbY: function() {
      // set the height of the thumb
      let pos = this.containerHeight / this.scrollHeight * this.containerHeight;

      if (pos < 12) {
        pos = 12;
      }

      this.thumbYHeight = pos;
    },
    /**
     * @name restrictDimensionsY
     * @desc restricts the dimensions so that it is in the correct bounds
     * @param {number} pos - position
     * @returns {number} correct position
     */
    restrictDimensionsY: function(pos) {
      if (pos > this.containerHeight - this.thumbYHeight) {
        return this.containerHeight - this.thumbYHeight;
      }

      if (pos < 0) {
        return 0;
      }

      return pos;
    },
    /**
     * @name onThumbScrollY
     * @desc called when the thumb is scrolled
     * @param {event} event - dom event
     * @param {string} direction - scroll direction (down or up)
     * @param {number} amount - amount of scroll that is done
     * @returns {void}
     */
    onThumbScrollY: function(event, direction, amount) {
      this.positionThumbY();
      this.scrollY(event, direction, amount);
    },
    /**
     * @name onThumbClickY
     * @desc called when the thumb is clicked
     * @param {event} event - dom event
     * @returns {void}
     */
    onThumbClickY: function(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    /**
     * @name onThumbMousedownY
     * @desc called when the thumb is pressed down
     * @param {event} event - dom event
     * @returns {void}
     */
    onThumbMousedownY: function(event) {
      event.preventDefault();
      event.stopPropagation();
      this.$refs.trackY.style.opacity = "1";
      document.addEventListener("mousemove", this.onThumbMousemoveY);
      document.addEventListener("mouseup", this.onThumbMouseupY);
    },
    /**
     * @name onThumbMousemoveY
     * @desc called when the thumb is pressed down and moved
     * @param {event} event - dom event
     * @returns {void}
     */
    onThumbMousemoveY: function(event) {
      event.preventDefault();
      event.stopPropagation();

      const elBoundingClientRect = this.$el.getBoundingClientRect();
      const pos = this.restrictDimensionsY(
        event.pageY - (window.pageYOffset + elBoundingClientRect.top)
      );

      //scroll
      this.scrollContentY(pos);
    },
    /**
     * @name onThumbMouseupY
     * @desc called when the thumb is let go
     * @param {event} event - dom event
     * @returns {void}
     */
    onThumbMouseupY: function(event) {
      event.preventDefault();
      event.stopPropagation();
      this.$refs.trackY.style.opacity = null;
      document.removeEventListener("mousemove", this.onThumbMousemoveY);
      document.removeEventListener("mouseup", this.onThumbMouseupY);
    },
    /**
     * @name onTrackClickY
     * @desc called when the track is clicked
     * @param {event} event - dom event
     * @returns {void}
     */
    onTrackClickY: function(event) {
      event.preventDefault();
      event.stopPropagation();

      // check click
      const pos = this.restrictDimensionsY(event.offsetY);

      //scroll
      this.scrollContentY(pos);
    },
    /**
     * @name scrollContentY
     * @desc scroll the content
     * @param {number} pos - pos of the thumb
     * @returns {void}
     */
    scrollContentY: function(pos) {
      this.$refs.scroller.scrollTop =
        (1 + this.thumbYHeight / (this.containerHeight - this.thumbYHeight)) *
        pos *
        (this.scrollHeight / this.containerHeight);
    },
    /**
     * @name buildScrollX
     * @desc called to build the scroll
     * @returns {void}
     */
    buildScrollX: function() {
      this.scrollWidth = this.$refs.scroller.scrollWidth;
      this.containerWidth = this.$el.offsetWidth;

      //hide
      if (this.containerWidth >= this.scrollWidth) {
        this.showX = false;
        return;
      }

      //show
      this.showX = true;
      this.$refs.trackX.style.display = "block";
      this.sizeThumbX();
      this.positionThumbX();
    },
    /**
     * @name positionThumbX
     * @desc called to position the thumb
     * @returns {void}
     */
    positionThumbX: function() {
      //set the position of the thumb
      let pos =
        (1 - this.thumbXWidth / this.containerWidth) *
        this.containerWidth *
        (this.$refs.scroller.scrollLeft /
          (this.scrollWidth - this.containerWidth));

      pos = this.restrictDimensionsX(pos);

      this.thumbXLeft = pos;
    },
    /**
     * @name sizeThumbX
     * @desc called to position the thumb
     * @returns {void}
     */
    sizeThumbX: function() {
      // set the width of the thumb
      let pos = this.containerWidth / this.scrollWidth * this.containerWidth;

      if (pos < 12) {
        pos = 12;
      }

      this.thumbXWidth = pos;
    },
    /**
     * @name restrictDimensionsX
     * @desc restricts the dimensions so that it is in the correct bounds
     * @param {number} pos - position
     * @returns {number} correct position
     */
    restrictDimensionsX: function(pos) {
      if (pos > this.containerWidth - this.thumbXWidth) {
        return this.containerWidth - this.thumbXWidth;
      }

      if (pos < 0) {
        return 0;
      }

      return pos;
    },
    /**
     * @name onThumbScrollX
     * @desc called when the thumb is scrolled
     * @param {event} event - dom event
     * @param {string} direction - scroll direction (left or right)
     * @param {number} amount - amount of scroll that is done
     * @returns {void}
     */
    onThumbScrollX: function(event, direction, amount) {
      this.positionThumbX();
      this.scrollX(event, direction, amount);
    },
    /**
     * @name onThumbClickX
     * @desc called when the thumb is clicked
     * @param {event} event - dom event
     * @returns {void}
     */
    onThumbClickX: function(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    /**
     * @name onThumbMousedownX
     * @desc called when the thumb is pressed down
     * @param {event} event - dom event
     * @returns {void}
     */
    onThumbMousedownX: function(event) {
      event.preventDefault();
      event.stopPropagation();
      this.$refs.trackX.style.opacity = "1";
      document.addEventListener("mousemove", this.onThumbMousemoveX);
      document.addEventListener("mouseup", this.onThumbMouseupX);
    },
    /**
     * @name onThumbMousemoveX
     * @desc called when the thumb is pressed down and moved
     * @param {event} event - dom event
     * @returns {void}
     */
    onThumbMousemoveX: function(event) {
      event.preventDefault();
      event.stopPropagation();

      const elBoundingClientRect = this.$el.getBoundingClientRect();
      const pos = this.restrictDimensionsX(
        event.pageX - (window.pageXOffset + elBoundingClientRect.left)
      );

      //scroll
      this.scrollContentX(pos);
    },
    /**
     * @name onThumbMouseupX
     * @desc called when the thumb is let go
     * @param {event} event - dom event
     * @returns {void}
     */
    onThumbMouseupX: function(event) {
      event.preventDefault();
      event.stopPropagation();
      this.$refs.trackX.style.opacity = null;
      document.removeEventListener("mousemove", this.onThumbMousemoveX);
      document.removeEventListener("mouseup", this.onThumbMouseupX);
    },
    /**
     * @name onTrackClickX
     * @desc called when the track is clicked
     * @param {event} event - dom event
     * @returns {void}
     */
    onTrackClickX: function(event) {
      event.preventDefault();
      event.stopPropagation();

      // check click
      const pos = this.restrictDimensionsX(event.offsetX);

      //scroll
      this.scrollContentX(pos);
    },
    /**
     * @name onScroll
     * @desc called when the content is scrolled
     * @param {event} event - dom event
     * @returns {void}
     */
    onScroll: function(event) {
      if (!this.staticY) {
        if (this.previousScrollTop !== this.$refs.scroller.scrollTop) {
          this.onThumbScrollY(
            event,
            this.previousScrollTop < this.$refs.scroller.scrollTop
              ? "down"
              : "up",
            (this.$refs.scroller.scrollTop + this.containerHeight) /
              this.scrollHeight
          );
        }
      }
      if (!this.staticX) {
        if (this.previousScrollLeft !== this.$refs.scroller.scrollLeft) {
          this.onThumbScrollX(
            event,
            this.previousScrollLeft < this.$refs.scroller.scrollLeft
              ? "right"
              : "left",
            (this.$refs.scroller.scrollLeft + this.containerWidth) /
              this.scrollWidth
          );
        }
      }

      this.previousScrollTop = this.$refs.scroller.scrollTop;
      this.previousScrollLeft = this.$refs.scroller.scrollLeft;
    },
    /**
     * @name scrollContentX
     * @desc scroll the content
     * @param {number} pos - pos of the thumb
     * @returns {void}
     */
    scrollContentX: function(pos) {
      this.$refs.scroller.scrollLeft =
        (1 + this.thumbXWidth / (this.containerWidth - this.thumbXWidth)) *
        pos *
        (this.scrollWidth / this.containerWidth);
    }
  },
  beforeUpdate() {
    this.buildScroll();
  },
  mounted() {
    // set the container
    if (Utility.constants.scrollBarWidth !== 17) {
      this.$refs.scroller.style.width =
        "calc(100% + " + Utility.constants.scrollBarWidth + "px)";
    }

    if (Utility.constants.scrollBarHeight !== 17) {
      this.$refs.scroller.style.height =
        "calc(100% + " + Utility.constants.scrollBarHeight + "px)";
    }

    window.addEventListener("resize", this.buildScroll);
    // build the scroll
    this.buildScroll();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.buildScroll);
  }
};
</script>
