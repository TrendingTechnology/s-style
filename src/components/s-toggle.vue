<style lang="scss">
@import "../theme.scss";

.s-toggle {
  position: relative;
  display: inline-block;
  padding: 0.5 * $spacing;
  height: $height;
  width: 1.5 * $height;
  @include set-color("grey3", "border", "1px solid");
  @include set-color("neutral", "background");
  cursor: pointer;
  outline: none;
  @include disabled();

  &:hover {
    @include set-color("grey1", "background");
  }

  &:focus {
    @include focus(border);
  }

  &__handle {
    box-sizing: border-box;
    width: 50%;
    height: 100%;
    @include set-color("grey3", "border", "1px solid");
    @include set-color("neutral", "background");
    margin-left: 0;
    @include transition(margin);

    &--selected {
      margin-left: 50%;
      @include set-color("primary", "background");
    }
  }
}
</style>
<template>
  <div>
    <div class="s-label" v-if="label">{{label}}</div>
    <div :tabindex="disabled ? -1 : 0" v-on:click="selectToggle()" v-on:keyup.enter="select()" :disabled="disabled" v-bind:class="classObj">
      <div class="s-toggle__handle" v-bind:class="{'s-toggle__handle--selected': computedValue}"></div>
    </div>
  </div>
</template>
<script>
import Input from "../mixins/input.js";

export default {
  name: "s-toggle",
  mixins: [Input],
  computed: {
    classObj: function() {
      const classObj = {
        "s-toggle": true,
        "s-toggle--disabled": this.disabled
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
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    /**
     * @name selectToggle
     * @desc select the toggle and update the computed view
     * @returns {void}
     */
    selectToggle() {
      if (this.disabled) {
        return;
      }

      this.computedValue = !this.computedValue;
    }
  }
};
</script>
