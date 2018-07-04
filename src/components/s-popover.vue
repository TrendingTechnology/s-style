<style lang="scss">
@import "../theme.scss";

.s-popover {
  @include disabled();

  &__target {
  }

  &__content {
    position: absolute;
    @include set-color("neutral", "background");
    @include transition(opacity);
  }
}
</style>
<template>
  <div v-bind:class="classObj">
    <span ref="target" class="s-popover__target">
      <slot name="target"></slot>
    </span>
    <div ref="content" class="s-popover__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
import Popover from "../mixins/popover.js";

export default {
  name: "s-popover",
  mixins: [Popover],
  computed: {
    classObj: function() {
      const classObj = {
        "s-popover": true,
        "s-popover--disabled": this.disabled
      };

      return classObj;
    }
  },
  data() {
    return {
      popoverDelay: 0
    };
  },
  methods: {
    /**
     * @name documentClick
     * @desc hide the content if the document is clicked (not on the target or content)
     * @param {event} event - dom event
     * @returns {void}
     */
    documentClick(event) {
      // ignore if it is on the target (bubbling)
      if (event && event.target && this.$refs.target.contains(event.target)) {
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
    }
  }
};
</script>
