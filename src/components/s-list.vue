<style lang="scss">
@import "../theme.scss";

.s-list {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @include disabled();

  &__background {
    display: block;
    height: auto;
    width: 100%;
    overflow: hidden;
  }

  &__option {
    display: block;
    margin: 0;
    width: 100%;
    overflow: hidden;
  }
}
</style>
<template>
  <div v-bind:class="classObj">
    <s-scroll ref="scroll" :staticX="true" :gutter="true" :scrollY="scrollList">
      <div class="s-list__background" v-bind:style="{height: virtualHeight + 'px'}">
        <div ref="view" v-bind:style="{paddingTop:virtualTop + 'px', paddingBottom:virtualBottom + 'px'}">
          <div class="s-list__option" v-for="v in virtualNodes" :key="v.key">
            <slot v-bind="v.data">
              <div class="s-text">
                {{v.data}}
              </div>
            </slot>
          </div>
        </div>
      </div>
    </s-scroll>
  </div>
</template>
<script>
import SScroll from "./s-scroll.vue";

export default {
  name: "s-list",
  components: {
    SScroll
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: []
    },
    optionHeight: {
      type: Number,
      default: 28
    },
    loading: {
      type: Boolean,
      default: false
    },
    scroll: {
      type: Function
    }
  },
  computed: {
    classObj: function() {
      const classObj = {
        "s-list": true,
        "s-list--disabled": this.disabled
      };

      return classObj;
    },
    virtualNodes: function() {
      let virtualNodes = [];

      for (let idx = this.start; idx <= this.end && this.total > 0; idx++) {
        virtualNodes.push({
          key: idx,
          data: this.options[idx]
        });
      }

      return virtualNodes;
    }
  },
  data() {
    return {
      start: 0,
      end: 0,
      total: 0,
      offsetHeight: 0,
      virtualHeight: 0,
      virtualTop: 0,
      virtualBottom: 0
    };
  },
  methods: {
    /**
     * @name scrollList
     * @desc trigger the scroll function if conditions are met (near the bottom and not loading)
     * @param {event} event - dom event
     * @param {string} direction - direction of the scroll (up or down)
     * @param {number} amount - amount from the bottom
     * @returns {void}
     */
    scrollList(event, direction, amount) {
      this.renderList();

      if (this.scorll) {
        if (!this.loading) {
          if (amount >= 0.75 && direction === "down") {
            this.scroll();
          }
        }
      }
    },
    /**
     * @name renderList
     * @desc render the list
     * @returns {void}
     */
    renderList() {
      // find the options to render
      const scrollTop = this.$refs.scroll.$refs.scroller.scrollTop;
      const offsetHeight = this.$el.offsetHeight;
      let start = Math.floor(scrollTop / this.optionHeight);
      let end = Math.ceil((scrollTop + offsetHeight) / this.optionHeight);

      start = start >= 0 ? start : 0;
      end = end <= this.total - 1 ? end : this.total - 1; //subtract so we do not get an extra one....

      // size
      this.virtualTop = this.optionHeight * start;
      this.virtualBottom = this.optionHeight * (this.total - 1 - end);
      this.offsetHeight = offsetHeight;

      this.start = start;
      this.end = end;
    },
    /**
     * @name buildList
     * @desc build the list. Rebuild whenever the size of the list changes.
     * @returns {void}
     */
    buildList() {
      // TODO: Render optionHeight based on contents
      // set the total length
      this.total = this.options.length;

      // set the intial height of the list
      this.virtualHeight = this.optionHeight * this.total;

      // render the list
      this.renderList();
    }
  },
  beforeUpdate() {
    if (this.total !== this.options.length) {
      this.buildList();
    }
  },
  updated() {
    if (this.offsetHeight !== this.$el.offsetHeight) {
      this.renderList();
    }
  },
  mounted() {
    window.addEventListener("resize", this.buildList);
    this.buildList();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.buildList);
  }
};
</script>
