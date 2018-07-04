<style lang="scss">
@import "../theme.scss";

.s-accordion-item {
  @include disabled();
  position: absolute;
  box-sizing: border-box;

  &__resizer {
    box-sizing: border-box;
    position: absolute;
    top: -2px;
    right: 0;
    bottom: 0;
    left: 0;
    width: auto;
    height: 2px;
    background: transparent;
    z-index: 1;
    outline: none;
    cursor: ns-resize;

    &--rotated {
      top: 0;
      right: 0;
      bottom: 0;
      left: -2px;
      width: 2px;
      height: auto;
      cursor: ew-resize;
    }
  }

  &__header {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    height: $height - 2;
    width: auto;
    @include set-color("neutral", "background");
    cursor: pointer;

    &:hover {
      @include set-color("grey1", "background");
    }

    &--opened {
      @include set-color("grey1", "background");
      @include set-color("primary", "color");
    }

    &--rotated {
      top: 0;
      right: auto;
      bottom: 0;
      left: 0;
      height: auto;
      width: $height - 2;
    }

    &__spacer {
      position: absolute;
      top: 0;
      right: 0;
      bottom: auto;
      left: 0;
      height: 0.5 * $spacing;
      width: auto;
      @include set-color("primary", "border-top", "1px solid");
      border-left: none;
      background: transparent;
      cursor: ns-resize;
      outline: none;

      &--rotated {
        top: 0;
        right: auto;
        bottom: 0;
        left: 0;
        height: auto;
        width: 0.5 * $spacing;
        border-top: none;
        @include set-color("primary", "border-left", "1px solid");
        cursor: ew-resize;
      }
    }

    &__text {
      box-sizing: border-box;
      position: absolute;
      top: 0.5 * $spacing;
      left: 1.5 * $spacing;
      line-height: $height - 0.5 * $spacing - 2;
      height: $height - 0.5 * $spacing - 2;
      width: calc(100% - 72px);
      user-select: none;
      @include text-overflow();

      &--rotated {
        top: 1.5 * $spacing;
        left: 0.5 * $spacing;
        height: calc(100% - 72px);
        width: $height - 0.5 * $spacing - 2;

        & span {
          float: left;
          position: absolute;
          transform-origin: top left;
          transform: rotate(-90deg) translate(-100%, 0);
          width: 250px;
          text-align: right;
        }
      }
    }
  }

  &__content {
    box-sizing: border-box;
    position: absolute;
    top: $height - 2;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0.5 * $spacing 0;
    user-select: none;
    outline: 0;
    @include set-color("neutral", "background");
    overflow: hidden;

    &--rotated {
      top: 0;
      right: 0;
      bottom: 0;
      left: $height - 2;
      padding: 0 0.5 * $spacing;
    }
  }
}

.s-accordion
  > .s-accordion-item:first-child
  .s-accordion-item__resizer {
  display: none;
}

.s-accordion
  > .s-accordion-item:first-child
  .s-accordion-item__header__spacer {
  cursor: default;
}
</style>
<template>
  <div v-bind:class="classObj" v-bind:style="{top: top + 'px', right: right + 'px', bottom: bottom + 'px', left: left +'px'}">
    <div class="s-accordion-item__resizer" v-on:mousedown="startManualSize($event)" v-bind:class="{'s-accordion-item__resizer--rotated':rotated}"></div>
    <div class="s-accordion-item__header" v-on:click="fullSize($event)" v-bind:class="{'s-accordion-item__header--opened':(size > 0),'s-accordion-item__header--rotated':rotated}">
      <div class="s-accordion-item__header__spacer" v-on:mousedown="startManualSize($event)" v-bind:class="{'s-accordion-item__header__spacer--rotated':rotated}"></div>
      <div class="s-accordion-item__header__text" v-bind:class="{'s-accordion-item__header__text--rotated':rotated}">
        <span><slot name="header"></slot></span>
      </div>
    </div>
    <div class="s-accordion-item__content" v-if="size > 0" v-bind:class="{'s-accordion-item__content--rotated':rotated}">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "s-accordion-item",
  computed: {
    classObj: function() {
      const classObj = {
        "s-accordion-item": true,
        "s-accordion-item--disabled": this.disabled
      };

      return classObj;
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    default: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      id: -1,
      rotated: false,
      size: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  },
  methods: {
    /**
     * @name fullSize
     * @desc trigger function to set the size of this element to 100
     * @param {event} event - dom event
     * @returns {void}
     */
    fullSize(event) {
      event.stopPropagation();

      this.$parent.fullSize(this.id);
    },
    /**
     * @name startManualSize
     * @desc start manual sizing of this element
     * @param {event} event - dom event
     * @returns {void}
     */
    startManualSize(event) {
      event.stopPropagation();

      this.$parent.startManualSize(this.id);
    }
  }
};
</script>
