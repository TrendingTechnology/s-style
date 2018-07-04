<style lang="scss">
@import '../theme.scss';

.s-accordion {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  @include disabled();
}
</style>
<template>
  <div :disabled="disabled" v-bind:class="classObj">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "s-accordion",
  computed: {
    classObj: function() {
      const classObj = {
        "s-accordion": true,
        "s-accordion--disabled": this.disabled
      };

      return classObj;
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    rotated: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      titleSize: 28,
      isResizing: false,
      currentChild: undefined,
      previousChild: undefined
    };
  },
  methods: {
    /**
     * @name resetSize
     * @desc set the size based on the initial options
     * @returns {void}
     */
    resetSize: function() {
      const childrenLen = this.$children.length;
      for (let childIdx = 0; childIdx < childrenLen; childIdx++) {
        if (this.$children[childIdx].$options.name !== "s-accordion-item") {
          console.error(
            "Children of s-accordion must be s-accordion-item"
          );
          continue;
        }

        this.$children[childIdx].id = childIdx;
        this.$children[childIdx].rotated = this.rotated;
        this.$children[childIdx].size = this.$children[childIdx].default;
      }

      this.setSize();
    },
    /**
     * @name setSize
     * @desc change the sizes of the accordions based on calculated % sizes
     * @returns {void}
     */
    setSize: function() {
      let previousShift = 0;
      let newSize = 0;
      const accordionEleBoundingClientRect = this.$el.getBoundingClientRect();

      const childrenLen = this.$children.length;
      for (let child of this.$children) {
        if (this.rotated) {
          newSize =
            (accordionEleBoundingClientRect.width -
              childrenLen * this.titleSize) *
              child.size /
              100 +
            this.titleSize;

          child.top = 0;
          child.right =
            accordionEleBoundingClientRect.width - (previousShift + newSize);
          child.bottom = 0;
          child.left = previousShift;
        } else {
          newSize =
            (accordionEleBoundingClientRect.height -
              childrenLen * this.titleSize) *
              child.size /
              100 +
            this.titleSize;

          child.top = previousShift;
          child.right = 0;
          child.bottom =
            accordionEleBoundingClientRect.height - (previousShift + newSize);
          child.left = 0;
        }

        previousShift += newSize;
      }
    },
    /**
     * @name fullSize
     * @desc set the size variable of the select id to 100 and close all others
     * @param {number} - id of the child to set to the full size
     * @returns {void}
     */
    fullSize: function(id) {
      //don't do open if it is resizing, there is some overlap between the events
      if (this.isResizing) {
        return;
      }

      for (let child of this.$children) {
        if (child.id === id) {
          child.size = 100;
          continue;
        }

        child.size = 0;
      }

      this.setSize();
    },
    /**
     * @name startManualSize
     * @desc triggered when the manual event is started
     * @param {number} - id of the child to set to the full size
     * @returns {void}
     */
    startManualSize: function(id) {
      //needs to have a previous sibling element to resize
      if (id === 0) {
        return;
      }

      this.currentChild = this.$children[id];
      this.previousChild = this.$children[id - 1];

      if (this.currentChild.size === 0 && this.previousChild.size === 0) {
        //clear
        this.currentChild = undefined;
        this.previousChild = undefined;

        return;
      }

      this.isResizing = true;

      document.addEventListener("mouseup", this.stopManualSize);
      document.addEventListener("mousemove", this.onManualSize);
    },
    /**
     * @name onManualSize
     * @desc triggered when the manual event is going on
     * @returns {void}
     */
    onManualSize: function() {
      const accordionEleBoundingClientRect = this.$el.getBoundingClientRect();

      if (this.rotated) {
        let pos =
          event.pageX -
          (window.pageXOffset + accordionEleBoundingClientRect.left);

        //right bound
        if (
          accordionEleBoundingClientRect.width -
            this.currentChild.right -
            this.titleSize <
          pos
        ) {
          pos =
            accordionEleBoundingClientRect.width -
            this.currentChild.right -
            this.titleSize;
        }

        //left bound
        if (pos < this.previousChild.left + this.titleSize) {
          pos = this.previousChild.left + this.titleSize;
        }

        //save positions
        this.currentChild.left = pos;
        this.previousChild.right = accordionEleBoundingClientRect.width - pos;
      } else {
        let pos =
          event.pageY -
          (window.pageYOffset + accordionEleBoundingClientRect.top);

        //bottom bound
        if (
          accordionEleBoundingClientRect.height -
            this.currentChild.bottom -
            this.titleSize <
          pos
        ) {
          pos =
            accordionEleBoundingClientRect.height -
            this.currentChild.bottom -
            this.titleSize;
        }

        //top bound
        if (pos < this.previousChild.top + this.titleSize) {
          pos = this.previousChild.top + this.titleSize;
        }

        //save positions
        this.currentChild.top = pos;
        this.previousChild.bottom = accordionEleBoundingClientRect.height - pos;
      }
    },
    /**
     * @name stopManualSize
     * @desc triggered when the manual event is stopped
     * @returns {void}
     */
    stopManualSize: function() {
      const accordionEleBoundingClientRect = this.$el.getBoundingClientRect();

      //remvoe event listeners
      document.removeEventListener("mouseup", this.stopManualSize);
      document.removeEventListener("mousemove", this.onManualSize);

      //we need to calculate the new heights in % (and save them in case of resize)
      const childrenLen = this.$children.length;

      if (this.rotated) {
        this.currentChild.size =
          (accordionEleBoundingClientRect.width -
            this.currentChild.left -
            this.currentChild.right -
            this.titleSize) *
          100 /
          (accordionEleBoundingClientRect.width - childrenLen * this.titleSize);

        this.previousChild.size =
          (accordionEleBoundingClientRect.width -
            this.previousChild.left -
            this.previousChild.right -
            this.titleSize) *
          100 /
          (accordionEleBoundingClientRect.width - childrenLen * this.titleSize);
      } else {
        this.currentChild.size =
          (accordionEleBoundingClientRect.height -
            this.currentChild.top -
            this.currentChild.bottom -
            this.titleSize) *
          100 /
          (accordionEleBoundingClientRect.height -
            childrenLen * this.titleSize);

        this.previousChild.size =
          (accordionEleBoundingClientRect.height -
            this.previousChild.top -
            this.previousChild.bottom -
            this.titleSize) *
          100 /
          (accordionEleBoundingClientRect.height -
            childrenLen * this.titleSize);
      }

      //auto close
      const availableSize = this.currentChild.size + this.previousChild.size;

      //if the previous is less than 5% auto close, and set the selected to the availableHeight;
      //if the selected is less than 5% auto close, and set the previous to the availableHeight;
      if (this.previousChild.size < 5) {
        this.currentChild.size = availableSize;

        this.previousChild.size = 0;
      } else if (this.currentChild.size < 5) {
        this.currentChild.size = 0;
        this.previousChild.size = availableSize;
      }

      //clear
      this.currentChild = undefined;
      this.previousChild = undefined;

      this.setSize();

      // wait (this is for the click and mousedown on the same element)
      setTimeout(() => {
        this.isResizing = false;
      });
    }
  },
  mounted() {
    window.addEventListener("resize", this.setSize);

    this.resetSize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setSize);

    document.removeEventListener("mouseup", this.stopManualSize);
    document.removeEventListener("mousemove", this.onManualSize);
  }
};
</script>
