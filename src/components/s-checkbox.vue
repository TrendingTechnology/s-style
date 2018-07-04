<style lang="scss">
@import "../theme.scss";
$size: 1.25em;

.s-checkbox {
  @include disabled();
  position: relative;
  display: block;
  width: 100%;
  line-height: $height;
  height: $height;
  cursor: pointer;
  user-select: none;
  outline: none;
  margin: 0;

  &:hover {
    .s-checkbox__input ~ .s-checkbox__mark {
      @include set-color("grey1", "background");
    }
  }

  &__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:focus ~ .s-checkbox__mark {
      @include focus(box-shadow);
    }

    &:checked ~ .s-checkbox__mark:after {
      font-family: "Font Awesome\ 5 Free";
      font-size: 0.7 * $size;
      content: "\f00c";
      @include set-color("primary", "color");
    }
  }

  &__mark {
    position: absolute;
    top: calc(50% - #{($size) / 2});
    left: 0;
    height: $size;
    line-height: calc(#{$size} - 2px);
    width: $size;
    text-align: center;
    @include set-color("grey3", "border", "1px solid");
    @include set-color("neutral", "background");
    overflow: hidden;

    &--right {
      left: auto;
      right: 0;
    }
  }

  &__text {
    @include set-color("text", "color");
    @include text-overflow();
    position: absolute;
    top: 0;
    left: $spacing * 3;
    right: 0;
    bottom: 0;

    &--right {
      left: 0;
      right: $spacing * 3;
    }
  }
}
</style>
<template>
  <div>
    <div class="s-label" v-if="label">{{label}}</div>
    <label v-bind:class="classObj">
      <input class="s-checkbox__input"
            :tabindex="disabled ? -1 : 0"
            :disabled="disabled"
            v-model="computedValue"
            v-on:keyup.enter="computedValue = !value"
            type="checkbox">
      <span class="s-checkbox__mark" v-bind:class="{'s-checkbox__mark--right':align === 'right'}"></span>
      <div v-bind:class="{'s-checkbox__text--right':align === 'right'}"
          class="s-checkbox__text"> 
          <div class="s-text">
            <slot></slot>
          </div>
      </div>
    </label>
  </div>
</template>
<script>
import Input from "../mixins/input.js";

export default {
  name: "s-checkbox",
  mixins: [Input],
  computed: {
    classObj: function() {
      const classObj = {
        "s-checkbox": true,
        "s-checkbox--disabled": this.disabled
      };

      return classObj;
    },
    computedValue: {
      get: function() {
        return this.value;
      },
      set: function(val) {
        this.input(val, {
          type: "replace",
          value: val
        });
      }
    }
  },
  props: {
    align: {
      type: String,
      default: "left"
    },
    value: {
      type: Boolean,
      required: true
    }
  }
};
</script>
