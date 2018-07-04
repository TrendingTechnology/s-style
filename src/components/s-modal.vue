<style lang="scss">
@import "../theme.scss";

.s-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  @include disabled("grey1");

  &--restricted {
    position: absolute;
  }

  &__wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    padding: $spacing;
    @include set-color("neutral", "background");
    @include set-color("grey3", "border", "1px solid");
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
  &__background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    background: #000000;
    opacity: 0.6;
  }
}
</style>
<template>
  <transition name="s-fade">
    <div v-bind:class="classObj" v-if="computedValue">
      <div class="s-modal__background" v-on:click="closeModal()"></div>
      <div class="s-modal__wrapper">
        <div class="s-modal__content">
          <slot></slot>
        </div>
        <div class="s-modal__times" v-if="!force" v-on:click="closeModal()">
          <i class="fas fa-times"></i>
        </div>
        <div class="s-clear"></div>
      </div>
    </div>
  </transition>

</template>
<script>
import Input from "../mixins/input.js";

export default {
  name: "s-modal",
  mixins: [Input],
  computed: {
    classObj: function() {
      let classObj = {
        "s-modal": true,
        "s-modal--disabled": this.disabled,
        "s-modal--restricted": this.restricted
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
  methods: {
    /**
     * @name closeModal
     * @desc close the modal
     * @returns {void}
     */
    closeModal() {
      if (this.force) {
        return;
      }

      this.computedValue = false;
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    restricted: {
      type: Boolean,
      default: false
    },
    force: {
      type: Boolean,
      default: false
    }
  }
};
</script>
