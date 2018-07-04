<style lang="scss">
@import "../theme.scss";

.s-button {
  @include disabled("neutral");
  line-height: $height;
  height: $height;
  margin: 0;
  padding: 0 1.5 * $spacing;
  text-align: center;
  font-size: 0.875em;
  @include set-color("grey3", "border", "1px solid");
  @include set-color("neutral", "background");
  @include set-color("text", "color");
  cursor: pointer;
  outline: none;
  display: inline-block;

  &:focus {
    @include focus("border");
  }

  &:hover {
    @include set-color("grey1", "background");
  }

  &--selected {
    @include set-color("grey1", "background");
  }

  &--primary {
    @include set-color("primary", "background");
    @include set-color("text-invert", "color");

    &:hover {
      @include set-color("primary-dark", "background");
    }

    &.s-button--selected {
      @include set-color("primary-dark", "background");
    }
  }

  &--success {
    @include set-color("success", "background");
    @include set-color("text-invert", "color");

    &:hover {
      @include set-color("success-dark", "background");
    }

    &.s-button--selected {
      @include set-color("success-dark", "background");
    }
  }

  &--error {
    @include set-color("error", "background");
    @include set-color("text-invert", "color");

    &:hover {
      @include set-color("error-dark", "background");
    }

    &.s-button--selected {
      @include set-color("error-dark", "background");
    }
  }
}
</style>
<template>
  <button :tabindex="disabled ? -1 : 0" :disabled="disabled" v-bind:class="classObj">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "s-button",
  computed: {
    classObj: function() {
      let classObj = {
        "s-button": true,
        "s-button--disabled": this.disabled,
        "s-button--selected": this.selected
      };

      if (this.color) {
        classObj["s-button--" + this.color] = true;
      }

      return classObj;
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ""
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
};
</script>
