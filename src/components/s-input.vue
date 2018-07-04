<style lang="scss">
@import "../theme.scss";

.s-input {
  @include set-color("text", "color");
  @include disabled("grey3");
  display: block;
  height: $height;
  width: 100%;
  padding: 0 $spacing;
  @include set-color("grey3", "border", "1px solid");
  @include set-color("neutral", "background");
  outline: none;

  &:focus {
    @include focus(border);
  }

  &::placeholder {
    @include set-color("grey2", "color");
  }
}
</style>
<template>
  <div>
    <div class="s-label" v-if="label">{{label}}</div>
    <input :tabindex="disabled ? -1 : 0" :placeholder="placeholder" :type="type"  v-model="computedValue" :disabled="disabled" v-bind:class="classObj">
  </div>
</template>
<script>
import Input from "../mixins/input.js";

export default {
  name: "s-input",
  mixins: [Input],
  computed: {
    classObj: function() {
      const classObj = {
        "s-input": true,
        "s-input--disabled": this.disabled
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
    type: {
      type: String,
      default: "text"
    }
  }
};
</script>
