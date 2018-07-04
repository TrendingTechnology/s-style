<style lang="scss">
@import "../theme.scss";

.s-alert {
  @include disabled("grey1");
  position: relative;
  display: block;
  width: 100%;
  padding: $spacing;
  margin: $spacing 0;
  border-right: 4px solid transparent;
  @include set-color("grey3", "border-left", "4px solid");
  @include set-color("grey1", "background");
  @include set-color("text", "color");

  &--primary {
    @include set-color("primary", "border-left", "4px solid");
    @include set-color("primary-light", "background");
  }
  &--success {
    @include set-color("success", "border-left", "4px solid");
    @include set-color("success-light", "background");
  }
  &--error {
    @include set-color("error", "border-left", "4px solid");
    @include set-color("error-light", "background");
  }

  &__content {
    height: auto;
    float: left;
    width: calc(100% - #{1.5 * $spacing});
  }

  &__times {
    float: left;
    width: 1.5 * $spacing;
    text-align: center;
    font-size: 0.875em;
    cursor: pointer;
    @include set-color("grey4", "color");

    &:hover {
      @include set-color("grey5", "color");
    }
  }
}
</style>
<template>
  <transition name="s-fade">
    <div :disabled="disabled" v-bind:class="classObj" v-if="computedValue">
      <div class="s-alert__content">
        <slot>
          <div class="s-label" v-if="label"> {{label}} </div>
        {{text}} 
        </slot>
      </div>
      <div class="s-alert__times" v-show="closeable">
        <i class="fas fa-times" v-on:click="computedValue = false"></i>
      </div>
      <div class="s-clear"></div>
    </div>
  </transition>
</template>
<script>
import Input from "../mixins/input.js";

export default {
  name: "s-alert",
  mixins: [Input],
  computed: {
    classObj: function() {
      let classObj = {
        "s-alert": true,
        "s-alert--disabled": this.disabled
      };

      if (this.color) {
        classObj["s-alert--" + this.color] = true;
      }

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
    color: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    value: {
      type: Boolean,
      default: true
    },
    closeable: {
      type: Boolean,
      default: false
    }
  }
};
</script>
