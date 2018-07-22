<style lang="scss">
@import "../theme.scss";

.s-checklist {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @include disabled();
  @include set-color("neutral", "background");

  &__holder {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    @include disabled();

    &--label {
      height: calc(100% - #{$height + 0.5 * $spacing});
    }
  }

  &__selectall {
    width: 100%;
    height: $height;
    @include set-color("grey3", "border-left", "1px solid");
    @include set-color("grey3", "border-right", "1px solid");

    &__checkbox {
      padding: 0 $scroll-size;
      width: 100%;
      height: $height;
    }

    &--single {
      @include set-color("grey3", "border-top", "1px solid");
    }
  }

  &__list {
    @include set-color("grey3", "border", "1px solid");
    height: 100%;

    &--single {
      border-top: 0;
      height: calc(100% - #{$height});
    }

    &--double {
      border-top: 0;
      height: calc(100% - #{$height * 2});
    }

    & .s-list__option:hover {
      @include set-color("grey1", "background");
    }
  }
}
</style>
<template>
  <div class="s-checklist">
    <div class="s-label" v-if="label">{{label}}</div>
    <div v-bind:class="classObj">
      <s-input ref="search" v-if="searchable" v-model="searchTerm" :placeholder="placeholder" :inputDelay="searchDelay" v-on:input="searchChecklist"></s-input>
      <div v-if="multiple" class="s-checklist__selectall" v-bind:class="{'s-checklist__selectall--single': !searchable}">
        <div class="s-checklist__selectall__checkbox">
          <s-checkbox ref="selectall" align="right" v-on:input="selectAllChecklist()" v-model="viewSelectAll">
            Select All
          </s-checkbox>
        </div>
      </div>
      <div class="s-checklist__list" v-bind:class="{'s-checklist__list--single':((searchable && !multiple) || (!searchable && multiple)), 's-checklist__list--double':(searchable && multiple)}">
        <s-list ref="list" :scroll="scroll" :loading="loading" :options="rendered">
          <template slot-scope="item">
            <s-checkbox v-bind:title="item.display" align="right" v-on:input="changeChecklist(item.value)" v-model="item.selected">
              <slot v-bind="item">
                {{item.display}}
              </slot>
            </s-checkbox>
          </template>
        </s-list>
      </div>
    </div>
  </div>
</template>
<script>
import Input from "../mixins/input.js";

import Utility from "../utility.js";
import SInput from "./s-input.vue";
import SCheckbox from "./s-checkbox.vue";
import SList from "./s-list.vue";

export default {
  name: "s-checklist",
  mixins: [Input],
  components: {
    SInput,
    SCheckbox,
    SList
  },
  props: {
    placeholder: {
      type: String,
      default: "Search Checklist"
    },
    display: {
      type: String,
      default: ""
    },
    model: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: [],
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    search: {
      type: Function
    },
    searchDelay: {
      type: Number,
      default: -1
    },
    scroll: {
      type: Function
    },
    selectAll: {}
  },
  computed: {
    classObj: function() {
      const classObj = {
        "s-checklist__holder": true,
        "s-checklist__holder--disabled": this.disabled,
        "s-checklist__holder--label": !!this.label
      };

      return classObj;
    },
    computedValue: function() {
      return this.value;
    }
  },
  data() {
    return {
      filtered: [],
      rendered: [],
      searchTerm: "",
      viewSelectAll: false
    };
  },
  methods: {
    /**
     * @name isAllSelected
     * @desc validates the select all value. This will either use the passed in value or the internal value
     * @returns {void}
     */
    isAllSelected() {
      if (this.multiple) {
        if (Utility.helpers.isDefined(this.selectAll)) {
          this.viewSelectAll = this.selectAll;
        } else {
          // verify viewSelectAll by looking at all of the options and see if model contains all of them
          let foundMatch = true;
          for (let opt of this.options) {
            const frozenValue = Utility.helpers.convert(
              opt,
              this.model,
              "value"
            );

            foundMatch = false;
            for (let computedValue of this.computedValue) {
              if (Utility.helpers.isEqual(computedValue, frozenValue)) {
                foundMatch = true;
                break;
              }
            }

            if (!foundMatch) {
              this.viewSelectAll = false;
              return;
            }
          }

          this.viewSelectAll = true;
        }
      }
    },
    /**
     * @name selectAllChecklist
     * @desc triggered to select all of the values. Updates the model.
     * @returns {void}
     */
    selectAllChecklist() {
      // clear out
      let updatedValues = [];
      if (this.viewSelectAll) {
        for (let opt of this.options) {
          updatedValues.push(Utility.helpers.convert(opt, this.model, "value"));
        }

        this.input(updatedValues, {
          type: "all",
          value: updatedValues
        });
      } else {
        this.input(updatedValues, {
          type: "none",
          value: updatedValues
        });
      }
    },
    /**
     * @name selectAllChecklist
     * @desc triggered to search the available options. This will either search the passed in search function or search the values with a simple string matching.
     * @returns {void}
     */
    searchChecklist() {
      if (this.search) {
        if (!this.loading) {
          this.search(this.searchTerm);
        }
        return;
      }

      this.filtered = [];

      const cleanedTerm = Utility.helpers.clean(this.searchTerm, "search");

      for (let opt of this.options) {
        let cleanedSearch = Utility.helpers.convert(
          opt,
          this.display,
          "search"
        );
        if (cleanedSearch.indexOf(cleanedTerm) > -1) {
          this.filtered.push(opt);
        }
      }

      this.renderChecklist();
    },
    /**
     * @name changeChecklist
     * @desc trigger a change in the model
     * @param {*} val - value to change
     * @returns {void}
     */
    changeChecklist(val) {
      const frozenVal = Utility.helpers.freeze(val);
      if (this.multiple) {
        let updatedValues = Utility.helpers.freeze(this.computedValue);
        let idx = -1;
        const len = updatedValues.length;
        for (let i = 0; i < len; i++) {
          if (Utility.helpers.isEqual(updatedValues[i], frozenVal)) {
            idx = i;
            break;
          }
        }

        if (idx === -1) {
          // add it
          updatedValues.push(frozenVal);

          this.input(updatedValues, {
            type: "add",
            value: frozenVal
          });
        } else {
          // remove it
          updatedValues.splice(idx, 1);

          this.input(updatedValues, {
            type: "remove",
            value: frozenVal
          });
        }
      } else {
        this.input(frozenVal, {
          type: "replace",
          value: frozenVal
        });
      }
    },
    /**
     * @name renderChecklist
     * @desc render the checklist based on the passed in values
     * @returns {void}
     */
    renderChecklist() {
      this.rendered = [];
      for (let opt of this.filtered) {
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

        let selected = false;
        if (this.multiple) {
          for (let computedValue of this.computedValue) {
            if (Utility.helpers.isEqual(computedValue, convertedValue)) {
              selected = true;
              break;
            }
          }
        } else {
          selected = Utility.helpers.isEqual(
            convertedValue,
            this.computedValue
          );
        }

        this.rendered.push({
          raw: opt,
          display: convertedDisplay,
          value: convertedValue,
          selected: selected
        });
      }
    },
    /**
     * @name buildChecklist
     * @desc build (or rebuild) the checklist whenever the data or the view changes.
     * @returns {void}
     */
    buildChecklist() {
      // add listeners
      this.$watch("options", function(options) {
        this.filtered = this.options;
        this.renderChecklist();
        if (this.multiple) {
          this.isAllSelected();
        }
      });

      this.$watch("value", function() {
        this.renderChecklist();
        if (this.multiple) {
          this.isAllSelected();
        }
      });

      if (this.multiple) {
        this.$watch("selectAll", function() {
          this.isAllSelected();
        });
      }

      this.filtered = this.options;
      this.renderChecklist();

      if (this.multiple) {
        this.isAllSelected();
      }
    }
  },
  mounted() {
    this.buildChecklist();
  }
};
</script>
