<style lang="scss">
@import "../theme.scss";

.s-tabs {
  @include disabled();
  position: relative;
  display: block;
  width: 100%;
  height: $height;
  outline: none;

  & > :not(:first-child) {
    border-left: none;
  }

  &__tab {
    position: relative;
    z-index: 0;
    display: inline-block;
    float: left;
    line-height: $height;
    height: $height;
    width: 100%;
    margin: 0;
    padding: 0 $spacing;
    text-align: center;
    font-size: 0.875em;
    @include text-overflow;
    cursor: pointer;
    outline: none;
    @include set-color("text", "color");
    @include set-color("grey3", "border", "1px solid");

    &:focus {
      z-index: 1;
      @include focus("border");
    }

    &:hover {
      @include set-color("grey1", "background");
    }

    &--selected {
      @include set-color("primary", "border-bottom", "2px solid", "!important");
    }
  }
}
</style>
<template>
  <div>
    <div class="s-label" v-if="label">{{label}}</div>
    <div :disabled="disabled" v-bind:class="classObj">
      <div v-for="(tab, index) in rendered" :key="index" v-on:click="selectTabs(tab.value)" v-on:keyup.enter="selectTabs(tab.value)" :tabindex="tab.disabled ? -1 : 0" :disabled="tab.disabled" v-bind:class="{'s-tabs__tab':true, 's-tabs__tab--selected': tab.value === computedValue }" v-bind:style="{width: (100/rendered.length) + '%'}">
        {{tab.display}}
      </div>
    </div>
  </div>
</template>
<script>
import Input from "../mixins/input.js";

import Utility from "../utility.js";

export default {
  name: "s-tabs",
  mixins: [Input],
  computed: {
    classObj: function() {
      const classObj = {
        "s-tabs": true,
        "s-tabs--disabled": this.disabled
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
    options: {
      type: Array,
      default: [],
      required: true
    },
    display: {
      type: String,
      default: ""
    },
    model: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      rendered: []
    };
  },
  methods: {
    /**
     * @name selectTabs
     * @desc select a tab and update the computed view
     * @param {*} val - value to set as the new active tab
     * @returns {void}
     */
    selectTabs(val) {
      if (this.disabled) {
        return;
      }

      this.computedValue = val;
    },
    /**
     * @name renderTabs
     * @desc render the tabs
     * @returns {void}
     */
    renderTabs() {
      this.rendered = [];
      for (let opt of this.options) {
        const convertedValue = Utility.helpers.convert(
          opt,
          this.model,
          "value"
        );
        const convertedDisplay = Utility.helpers.convert(
          opt,
          this.display,
          "display"
        );

        let selected = Utility.helpers.isEqual(
          convertedValue,
          this.computedValue
        );

        this.rendered.push({
          raw: opt,
          display: convertedDisplay,
          value: convertedValue,
          selected: selected
        });
      }
    },
    /**
     * @name buildTabs
     * @desc build the tabs. Rebuild when the options change
     * @returns {void}
     */
    buildTabs() {
      // add listeners
      this.$watch("options", function(options) {
        this.renderTabs();
      });

      this.$watch("value", function() {
        this.renderTabs();
      });

      this.renderTabs();
    }
  },
  mounted() {
    this.buildTabs();
  }
};
</script>
