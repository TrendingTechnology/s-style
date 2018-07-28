<style lang="scss">
@import "../theme.scss";

.s-colorpicker {
  &__toggle {
    @include disabled();
    position: relative;
    display: block;
    width: 100%;
    line-height: $height;
    height: $height;
    cursor: pointer;
    user-select: none;
    outline: none;

    &__holder {
      @include set-color("text", "color");
      @include text-overflow();
      position: relative;
      height: 100%;
      width: 100%;
    }

    &__mark {
      float: left;
      display: inline-block;
      height: $spacing * 3;
      width: $spacing * 3;
      padding: $spacing * 0.5;
      margin: $spacing * 0.25 $spacing $spacing * 0.25 0;
      @include set-color("neutral", "background");
      @include set-color("grey3", "border", "1px solid");

      &__color {
        position: relative;
        width: 100%;
        height: 100%;
      }

      &--right {
        float: right;
        margin: $spacing * 0.25 0 $spacing * 0.25 $spacing;
      }
    }

    &:focus > .s-colorpicker__toggle__holder > .s-colorpicker__toggle__mark {
      @include focus(border);
    }

    &:hover > .s-colorpicker__toggle__holder > .s-colorpicker__toggle__mark {
      @include set-color("grey1", "background");
    }

    &__text {
      float: left;
      display: inline-block;
      height: $height;
      width: calc(100% - #{$spacing * 4});
    }
  }

  &__content {
    position: absolute;
    z-index: 1000;
    @include transition(opacity);

    &__holder {
      width: 100%;
      height: auto;
    }
  }

  &__picker {
    width: 200px;
    @include set-color("neutral", "background");

    &__selection {
      position: relative;
      display: block;
      height: calc(100% - #{$height});
      width: 100%;

      &__canvas {
        position: relative;
        height: 200px;
        width: 100%;
        @include set-color("grey3", "border-top", "1px solid");
        @include set-color("grey3", "border-right", "1px solid");
        @include set-color("grey3", "border-left", "1px solid");

        &__darkness {
          float: left;
          display: inline-block;
          position: relative;
          height: 100%;
          width: $spacing * 3;
          margin: 0 $spacing 0 0;
          cursor: crosshair;
        }

        &__rainbow {
          float: left;
          display: inline-block;
          position: relative;
          height: 100%;
          width: calc(100% - #{$spacing * 4});
          cursor: crosshair;
        }
      }
    }
  }
}
</style>
<template>
  <div>
    <div class="s-label" v-if="label">{{label}}</div>
    <div ref="target" :tabindex="disabled ? -1 : 0" v-on:keyup.enter="toggleContent()" v-bind:class="classObj">
      <div class="s-colorpicker__toggle__holder">
        <div class="s-colorpicker__toggle__mark" v-bind:class="{'s-colorpicker__toggle__mark--right':align === 'right'}">
          <div class="s-colorpicker__toggle__mark__color" v-bind:style="{background: computedValue}"></div>
        </div>
        <div class="s-colorpicker__toggle__text" :title="value">
          <div class="s-text">
            <slot></slot>
          </div>
        </div>
        <div class="s-clear"></div>
      </div>
    </div>
    <div class="s-colorpicker__content" ref="content">
      <div class="s-colorpicker__content__holder" v-on:click="hideContent()" v-bind:style="{width: contentWidth + 'px'}">
        <div class="s-colorpicker__picker" v-on:click="$event.stopPropagation()">
          <div class="s-colorpicker__picker__selection">
            <div class="s-colorpicker__picker__selection__canvas">
              <canvas v-on:mousedown="onCanvasMousedown($event, 'darkness')" v-on:click="onCanvasClick($event, 'darkness')" ref="darkness" class="s-colorpicker__picker__selection__canvas__darkness"></canvas>
              <canvas v-on:mousedown="onCanvasMousedown($event, 'rainbow')" v-on:click="onCanvasClick($event, 'rainbow')" ref="rainbow" class="s-colorpicker__picker__selection__canvas__rainbow"></canvas>
              <div class="s-clear"></div>
            </div>
            <s-input v-model="color" v-on:input="changeColorpicker(color)"></s-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Input from "../mixins/input.js";
import Popover from "../mixins/popover.js";
import Utility from "../utility.js";
import SInput from "./s-input.vue";

export default {
  name: "s-colorpicker",
  mixins: [Input, Popover],
  components: {
    SInput
  },
  computed: {
    classObj: function() {
      const classObj = {
        "s-colorpicker__toggle": true,
        "s-colorpicker__toggle--disabled": this.disabled
      };

      return classObj;
    },
    computedValue: function() {
      return this.value;
    }
  },
  props: {
    value: {
      required: true,
      validator: val => {
        return Utility.helpers.isColor(val);
      }
    },
    position: {
      type: String,
      default: "vertical"
    },
    align: {
      type: String,
      default: "left"
    }
  },
  data() {
    return {
      color: undefined,
      canvas: undefined,
      items: [],
      contentWidth: 0,
      popoverDelay: 0
    };
  },
  methods: {
    /**
     * @name documentClick
     * @desc hide the content if the document is clicked (not on the target or content)
     * @param {event} event - dom event
     * @returns {void}
     */
    documentClick(event) {
      // ignore if it is on the target (bubbling)
      if (
        event &&
        event.target &&
        (this.$refs.target.contains(event.target) ||
          this.$refs.content.contains(event.target))
      ) {
        return;
      }

      this.hideContent();
    },
    /**
     * @name documentAction
     * @desc trigger to add or remove listeners on the document
     * @param {boolean} add - should we add a document listener?
     * @returns {void}
     */
    documentAction(add) {
      if (add) {
        document.addEventListener("click", this.documentClick);
      } else {
        document.removeEventListener("click", this.documentClick);
      }
    },
    /**
     * @name targetAction
     * @desc trigger to add or remove listeners on the target
     * @param {boolean} add - should we add a target listener?
     * @returns {void}
     */
    targetAction(add) {
      if (add) {
        this.$refs.target.addEventListener("click", this.toggleContent);
      } else {
        this.$refs.target.removeEventListener("click", this.toggleContent);
      }
    },
    /**
     * @name setContentWidth
     * @desc set the widget of the content based on the target
     * @returns {void}
     */
    setContentWidth() {
      this.contentWidth = this.$refs.target.getBoundingClientRect().width;
    },
    /**
     * @name buildPicker
     * @desc build (or rebuild) the picker whenever activated.
     * @returns {void}
     */
    buildPicker() {
      this.color = this.value;
      this.buildDarkness();
      this.buildRainbow();
    },
    /**
     * @name updatePicker
     * @desc rebuild the picker whenever data is changed.
     * @returns {void}
     */
    updatePicker() {
      this.color = this.value;
      this.buildDarkness();
    },
    /**
     * @name buildRainbow
     * @desc build the rainbow canvas
     * @returns {void}
     */
    buildRainbow() {
      const ctx = this.$refs.rainbow.getContext("2d");
      const canvasBoundingClientRect = this.$refs.rainbow.getBoundingClientRect();
      ctx.canvas.width = canvasBoundingClientRect.width;
      ctx.canvas.height = canvasBoundingClientRect.height;

      // create the rainbow gradient
      let grd = ctx.createLinearGradient(
        0,
        ctx.canvas.height / 2,
        ctx.canvas.width,
        ctx.canvas.height / 2
      );

      grd.addColorStop(0.0, "rgba(255, 0, 0, 1)");
      grd.addColorStop(0.15, "rgba(255, 0, 255, 1)");
      grd.addColorStop(0.33, "rgba(0, 0, 255, 1)");
      grd.addColorStop(0.49, "rgba(0, 255, 255, 1)");
      grd.addColorStop(0.67, "rgba(0, 255, 0, 1)");
      grd.addColorStop(0.84, "rgba(255, 255, 0, 1)");
      grd.addColorStop(1.0, "rgba(255, 0, 0, 1)");

      // add gradient
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // create a shading gradient
      grd = ctx.createLinearGradient(
        ctx.canvas.width / 2,
        0,
        ctx.canvas.width / 2,
        ctx.canvas.height
      );

      grd.addColorStop(0.02, "rgba(255, 255, 255, 1)");
      grd.addColorStop(0.25, "rgba(255, 255, 255, 0)");
      grd.addColorStop(0.5, "rgba(0, 0, 0, 0)");
      grd.addColorStop(0.98, "rgba(0, 0, 0, 1)");

      // add gradient
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
    /**
     * @name buildDarkness
     * @desc build the darkness canvas
     * @returns {void}
     */
    buildDarkness() {
      const ctx = this.$refs.darkness.getContext("2d");
      const canvasBoundingClientRect = this.$refs.darkness.getBoundingClientRect();
      ctx.canvas.width = canvasBoundingClientRect.width;
      ctx.canvas.height = canvasBoundingClientRect.height;

      //add the background color
      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // create a shading gradient
      const grd = ctx.createLinearGradient(
        ctx.canvas.width / 2,
        0,
        ctx.canvas.width / 2,
        ctx.canvas.height
      );
      grd.addColorStop(0.02, "rgba(255, 255, 255, 1)");
      grd.addColorStop(0.25, "rgba(255, 255, 255, 0)");
      grd.addColorStop(0.5, "rgba(0, 0, 0, 0)");
      grd.addColorStop(0.98, "rgba(0, 0, 0, 1)");

      // add gradient
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
    /**
     * @name onCanvasClick
     * @desc called when the canvas is clicked
     * @param {event} event - dom event
     * @param {string} canvas - active canvas
     * @returns {void}
     */
    onCanvasClick: function(event, canvas) {
      event.preventDefault();
      event.stopPropagation();
      this.canvas = canvas;
      this.onCanvasMousemove(event);
    },
    /**
     * @name onCanvasMousedown
     * @desc called when the canvas is pressed down
     * @param {event} event - dom event
     * @param {string} canvas - active canvas
     * @returns {void}
     */
    onCanvasMousedown: function(event, canvas) {
      event.preventDefault();
      event.stopPropagation();
      this.canvas = canvas;
      document.addEventListener("mousemove", this.onCanvasMousemove);
      document.addEventListener("mouseup", this.onCanvasMouseup);
    },
    /**
     * @name onCanvasMousemove
     * @desc called when the canvas is pressed down and moved
     * @param {event} event - dom event
     * @returns {void}
     */
    onCanvasMousemove: function(event) {
      event.preventDefault();
      event.stopPropagation();

      // get the position of the mouse
      const canvasBoundingClientRect = this.$refs[
        this.canvas
      ].getBoundingClientRect();

      let posX =
        event.pageX - (window.pageXOffset + canvasBoundingClientRect.left);

      if (posX < 0) {
        posX = 0;
      } else if (canvasBoundingClientRect.width < posX) {
        posX = canvasBoundingClientRect.width;
      }

      let posY =
        event.pageY - (window.pageYOffset + canvasBoundingClientRect.top);

      if (posY < 0) {
        posY = 0;
      } else if (canvasBoundingClientRect.height < posY) {
        posY = canvasBoundingClientRect.width;
      }

      // get the image information
      const ctx = this.$refs[this.canvas].getContext("2d");
      const imageData = ctx.getImageData(posX, posY, 1, 1).data;

      //update the color
      this.changeColorpicker(
        Utility.helpers.rgbaToHex(imageData[0], imageData[1], imageData[2])
      );
    },
    /**
     * @name onCanvasMouseup
     * @desc called when the canvas is let go
     * @param {event} event - dom event
     * @returns {void}
     */
    onCanvasMouseup: function(event) {
      event.preventDefault();
      event.stopPropagation();
      document.removeEventListener("mousemove", this.onCanvasMousemove);
      document.removeEventListener("mouseup", this.onCanvasMouseup);
    },
    /**
     * @name changeColorpicker
     * @desc trigger a change in the model
     * @returns {void}
     */
    changeColorpicker(color) {
      if (Utility.helpers.isDefined(color) && Utility.helpers.isColor(color)) {
        this.input(color, {
          type: "replace",
          value: color
        });
      }
    }
  },
  watch: {
    value: function(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.updatePicker();
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.setContentWidth);

    this.setContentWidth();
    this.$on("show", this.buildPicker);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setContentWidth);
  }
};
</script>
