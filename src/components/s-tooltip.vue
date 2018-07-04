<style lang="scss">
@import "../theme.scss";

.s-tooltip {
  @include disabled();

  &__target {
  }

  &__content {
    position: absolute;
    @include set-color("neutral", "background");
    @include transition(opacity);
    @include set-color("grey3", "border", "1px solid");
    padding: $spacing;
  }
}
</style>
<template>
  <div v-bind:class="classObj">
    <span ref="target" class="s-tooltip__target">
      <slot name="target"></slot>
    </span>
    <div ref="content" class="s-tooltip__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
import Popover from "../mixins/popover.js";

export default {
  name: "s-tooltip",
  mixins: [Popover],
  computed: {
    classObj: function() {
      const classObj = {
        "s-tooltip": true,
        "s-tooltip--disabled": this.disabled
      };

      return classObj;
    }
  },
  data() {
    return {
      popoverDelay: 300
    };
  },
  methods: {
    /**
     * @name targetAction
     * @desc trigger to add or remove listeners on the target
     * @param {boolean} add - should we add a target listener?
     * @returns {void}
     */
    targetAction(add) {
      if (add) {
        this.$refs.target.addEventListener("mouseenter", this.showContent);
        this.$refs.target.addEventListener("mouseleave", this.hideContent);
      } else {
        this.$refs.target.removeEventListener("mouseenter", this.showContent);
        this.$refs.target.removeEventListener("mouseleave", this.hideContent);
      }
    }
  }
};
</script>
