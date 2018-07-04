<style lang="scss">
@import "../theme.scss";
$size: 1.25em;

.s-radio {
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
    .s-radio__input ~ .s-radio__mark {
      @include set-color("grey1", "background");
    }
  }

  &__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:focus ~ .s-radio__mark {
      @include focus(box-shadow);
    }

    &:checked ~ .s-radio__mark:after {
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
    border-radius: $size;
    @include set-color("grey3", "border", "1px solid");
    @include set-color("neutral", "background");
    overflow: hidden;

    &--right {
      left: auto;
      right: 0;
    }
  }

  &__text {
    position: absolute;
    top: 0;
    left: 25px;
    right: 0;
    bottom: 0;
    @include set-color("text", "color");
    @include text-overflow();

    &--right {
      left: 0;
      right: 25px;
    }
  }
}
</style>
<template>
  <div>
    <div class="s-label" v-if="label">{{label}}</div>
    <label v-bind:class="classObj">
      <input class="s-radio__input" :tabindex="disabled ? -1 : 0" :disabled="disabled" :value="val" v-model="computedValue" type="radio">
      <span class="s-radio__mark" v-bind:class="{'s-radio__mark--right':align === 'right'}"></span>
      <div v-bind:class="{'s-radio__text--right':align === 'right'}" class="s-radio__text">
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
  name: "s-radio",
  mixins: [Input],
  computed: {
    classObj: function() {
      const classObj = {
        "s-radio": true,
        "s-radio--disabled": this.disabled
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
    val: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
};
</script>
