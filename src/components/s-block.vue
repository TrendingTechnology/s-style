<style lang="scss">
@import "../theme.scss";

.s-block {
  @include set-color("text", "color");
  @include disabled();
  position: relative;
  display: block;
  width: 100%;
  height: 1.5 * $height;
  outline: none;
  @include set-color("neutral", "background");
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  cursor: pointer;

  &:hover {
    @include set-color("grey1", "background");
  }

  &--selected {
    @include set-color("primary", "border-left", "4px solid");
    @include set-color("grey1", "background");
  }

  &__image {
    position: relative;
    float: left;
    display: inline-block;
    padding: $spacing 0.5 * $spacing;
    height: 100%;
    width: 1.5 * $height;
    overflow: hidden;

    & img {
      height: 100%;
      margin: 0 auto;
      display: block;
      vertical-align: middle;
      border: none;
    }

    & + .s-block__text {
      width: calc(100% - #{$height * 1.5});
    }
  }

  &__text {
    position: relative;
    float: left;
    display: inline-block;
    height: 100%;
    width: 100%;
    line-height: 1.5 * $height;
    padding: 0 0.5 * $spacing;
    @include text-overflow();
  }
}
</style>
<template>
  <div :tabindex="disabled ? -1 : 0" :disabled="disabled" v-bind:class="classObj">
    <slot v-bind="{image, text}">
      <div class="s-block__image">
        <img v-bind:src="image">
      </div>
      <div class="s-block__text">
        {{text}}
      </div>
    </slot>
  </div>
</template>
<script>
export default {
  name: "s-block",
  computed: {
    classObj: function() {
      const classObj = {
        "s-block": true,
        "s-block--selected": this.selected,
        "s-block--disabled": this.disabled
      };

      return classObj;
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>
