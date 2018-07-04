<style lang="scss">
@import "../theme.scss";

.s-slider {
  position: relative;
  display: block;
  height: $height * 2;
  width: 100%;
  @include set-color("neutral", "background");
  outline: none;
  overflow: hidden;
  @include disabled();

  &__track {
    position: absolute;
    top: calc(50% - #{$spacing / 4});
    left: 0;
    right: 0;
    height: 0.5 * $spacing;
    @include set-color("grey3", "background");
    z-index: 1;
  }

  &__highlight {
    position: absolute;
    top: calc(50% - #{$spacing / 4});
    left: 0;
    width: 0;
    height: 0.5 * $spacing;
    @include set-color("primary", "background");
    z-index: 2;
  }

  &__thumb {
    position: absolute;
    top: calc(50% - #{$spacing});
    left: 0;
    width: 2 * $spacing;
    height: 2 * $spacing;
    @include set-color("grey3", "border", "1px solid");
    @include set-color("neutral", "background");
    cursor: pointer;
    z-index: 3;

    &:hover {
      @include set-color("grey3", "background");
    }

    &:focus {
      @include focus(border);
    }
  }
}
</style>
<template>
  <div>
    <div class="s-label" v-if="label">{{label}}</div>
    <div v-bind:class="classObj">
      <div ref="thumb" :tabindex="disabled ? -1 : 0" class="s-slider__thumb" v-on:mousedown="onThumbMousedown" v-bind:style="{width: thumbWidth + 'px', left: thumbPos + 'px'}"></div>
      <div class="s-slider__highlight" v-bind:style="{width: highlightPos + '%'}"></div>
      <div ref="track" class="s-slider__track"></div>
    </div>
  </div>
</template>
<script>
import Input from "../mixins/input.js";

export default {
  name: "s-slider",
  mixins: [Input],
  computed: {
    classObj: function() {
      const classObj = {
        "s-slider": true,
        "s-slider--disabled": this.disabled
      };

      return classObj;
    },
    computedValue: function() {
      return this.value;
    }
  },
  data() {
    return {
      trackWidth: 0,
      highlightPos: 0,
      thumbWidth: 16,
      thumbPos: 0
    };
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    }
  },
  beforeUpdate() {
    this.$nextTick(function() {
      if (this.trackWidth !== this.$refs.track.getBoundingClientRect().width) {
        this.renderSlider();
      }
    });
  },
  methods: {
    /**
     * @name buildSlider
     * @desc build the slider. Rebuild when the container element size changes.
     * @returns {void}
     */
    buildSlider() {
      this.renderSlider();

      this.$watch("value", function(val) {
        this.positionHighlight(val);
        this.positionThumb(val);
      });
    },
    /**
     * @name renderSlider
     * @desc render the slider
     * @returns {void}
     */
    renderSlider() {
      this.trackWidth = this.$refs.track.getBoundingClientRect().width;

      this.positionHighlight(this.computedValue);
      this.positionThumb(this.computedValue);
    },
    /**
     * @name positionHighlight
     * @desc called to position the highlight
     * @returns {void}
     */
    positionHighlight: function(val) {
      this.highlightPos = (val - this.min) / (this.max - this.min) * 100;
    },
    /**
     * @name positionThumb
     * @desc called to position the thumb
     * @returns {void}
     */
    positionThumb: function(val) {
      this.thumbPos =
        (val - this.min) /
        (this.max - this.min) *
        this.trackWidth *
        (1 - this.thumbWidth / this.trackWidth);
    },
    /**
     * @name onThumbMousedown
     * @desc called when the thumb is pressed down
     * @param {event} event - dom event
     * @returns {void}
     */
    onThumbMousedown: function(event) {
      event.preventDefault();
      event.stopPropagation();
      this.$refs.thumb.focus();
      document.addEventListener("mousemove", this.onThumbMousemove);
      document.addEventListener("mouseup", this.onThumbMouseup);
    },
    /**
     * @name onThumbMousemove
     * @desc called when the thumb is pressed down and moved
     * @param {event} event - dom event
     * @returns {void}
     */
    onThumbMousemove: function(event) {
      event.preventDefault();
      event.stopPropagation();

      const trackBoundingClientRect = this.$refs.track.getBoundingClientRect();
      let val =
        (event.pageX - (window.pageXOffset + trackBoundingClientRect.left)) /
          this.trackWidth *
          (this.max - this.min) +
        this.min;

      if (val < this.min) {
        val = this.min;
      }

      if (val > this.max) {
        val = this.max;
      }

      // adjust for the step
      val = Math.round(val / this.step) * this.step;

      // set the highlight and thumb
      this.positionHighlight(val);
      this.positionThumb(val);

      this.input(val, {
        type: "replace",
        value: val
      });
    },
    /**
     * @name onThumbMouseup
     * @desc called when the thumb is let go
     * @param {event} event - dom event
     * @returns {void}
     */
    onThumbMouseup: function(event) {
      event.preventDefault();
      event.stopPropagation();
      document.removeEventListener("mousemove", this.onThumbMousemove);
      document.removeEventListener("mouseup", this.onThumbMouseup);
    }
  },
  mounted() {
    this.buildSlider();
  }
};
</script>
