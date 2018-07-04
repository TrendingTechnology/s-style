<style lang="scss">
@import "../theme.scss";

.s-dropdown {
  @include disabled();
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__toggle {
    @include disabled();
    position: relative;
    display: block;
    width: 100%;
    line-height: $height;
    height: $height;
    @include set-color("grey3", "border", "1px solid");
    cursor: pointer;
    user-select: none;
    outline: none;
    padding: 0 $scroll-size;

    &:hover {
      & > .s-dropdown__toggle__mark {
        @include set-color("grey5", "color");
      }
    }

    &:focus {
      @include focus(border);
    }

    &__text {
      @include set-color("text", "color");
      @include text-overflow();
      position: relative;
      height: 100%;
      width: 100%;
    }

    &__mark {
      position: absolute;
      top: 0;
      bottom: 0;
      right: $scroll-size;
      font-size: 0.75em;
      @include set-color("grey4", "color");
    }
  }

  &__content {
    position: absolute;
    @include set-color("neutral", "background");
    @include transition(opacity);
  }

  &__checklist {
    width: 100%;
    height: 200px;
  }
}
</style>
<template>
  <div v-bind:class="classObj">
    <div class="s-label" v-if="label">{{label}}</div>
    <div ref="target" :tabindex="disabled ? -1 : 0" v-on:keyup.enter="toggleContent()" class="s-dropdown__toggle">
      <div class="s-dropdown__toggle__text">
        <slot v-bind="{display:toggleText, value:computedValue}" name="toggle">
          {{toggleText}}
        </slot>
      </div>
      <span class="s-dropdown__toggle__mark">
        <i class="fas fa-chevron-down"></i>
      </span>
    </div>
    <div class="s-dropdown__content" ref="content">
      <div class="s-dropdown__checklist" v-bind:style="{width: contentWidth + 'px'}">
        <s-checklist ref="checklist" v-if="popoverVisible" :display="display" :model="model" :searchable="true" :search="search" :searchDelay="searchDelay" :multiple="false" :disabled="disabled" :loading="loading" :scroll="scroll" :options="options" v-on:input="updateChecklist" :value="computedValue">
          <template slot-scope="item">
            <slot v-bind="item" name="item">
              {{item.display}}
            </slot>
          </template>
        </s-checklist>
      </div>
    </div>
  </div>
</template>
<script>
import Input from "../mixins/input.js";
import Popover from "../mixins/popover.js";

import Utility from "../utility.js";
import SChecklist from "./s-checklist.vue";

export default {
  name: "s-dropdown",
  mixins: [Input, Popover],
  components: {
    SChecklist
  },
  props: {
    placeholder: {
      type: String,
      default: "Select Dropdown"
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
    search: {
      type: Function
    },
    searchDelay: {
      type: Number,
      default: -1
    },
    position: {
      type: String,
      default: "vertical"
    },
    scroll: {
      type: Function
    }
  },
  computed: {
    classObj: function() {
      const classObj = {
        "s-dropdown": true,
        "s-dropdown--disabled": this.disabled
      };

      return classObj;
    },
    computedValue: function() {
      return this.value;
    },
    toggleText: function() {
      if (!Utility.helpers.isDefined(this.value)) {
        return this.placeholder;
      }

      let option = this.value;

      // loop through the model to backtrack to the selected option;
      if (this.model && this.model.length > 0) {
        // need to look at every option to find the true option
        for (let opt of this.options) {
          const optValue = Utility.helpers.convert(opt, this.model);

          // compare the traversed value to the model value, if equal we assume that first option is correct (so options need to be 1 to 1)
          if (Utility.helpers.isEqual(optValue, this.value)) {
            option = opt;
            break;
          }
        }
      }

      // use the selected option to get the display value
      return Utility.helpers.convert(option, this.display, "display");
    }
  },
  data() {
    return {
      contentWidth: 0,
      popoverDelay: 0
    };
  },
  methods: {
    /**
     * @name updateChecklist
     * @desc triggered when the checklist model changes. This will be used to propagate changes to the parent. Closes the options.
     * @returns {void}
     */
    updateChecklist() {
      this.input(...arguments);
      this.hideContent();
    },
    /**
     * @name documentClick
     * @desc hide the content if the document is clicked (not on the target or content)
     * @param {event} event - dom event
     * @returns {void}
     */
    documentClick(event) {
      // ignore if it is on the target (bubbling)
      if (
        event &&
        event.target &&
        (this.$refs.target.contains(event.target) ||
          this.$refs.content.contains(event.target))
      ) {
        return;
      }

      this.hideContent();
    },
    /**
     * @name documentAction
     * @desc trigger to add or remove listeners on the document
     * @param {boolean} add - should we add a document listener?
     * @returns {void}
     */
    documentAction(add) {
      if (add) {
        document.addEventListener("click", this.documentClick);
      } else {
        document.removeEventListener("click", this.documentClick);
      }
    },
    /**
     * @name targetAction
     * @desc trigger to add or remove listeners on the target
     * @param {boolean} add - should we add a target listener?
     * @returns {void}
     */
    targetAction(add) {
      if (add) {
        this.$refs.target.addEventListener("click", this.toggleContent);
      } else {
        this.$refs.target.removeEventListener("click", this.toggleContent);
      }
    },
    /**
     * @name setContentWidth
     * @desc set the widget of the content based on the target
     * @returns {void}
     */
    setContentWidth() {
      this.contentWidth = this.$refs.target.getBoundingClientRect().width;
    }
  },
  mounted() {
    window.addEventListener("resize", this.setContentWidth);

    this.setContentWidth();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setContentWidth);
  }
};
</script>
