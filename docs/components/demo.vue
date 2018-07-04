<style lang="scss" scoped>
@import "~theme";

.demo {
  margin: 0 0 $spacing 0;
  width: 100%;
  height: auto;

  &__content {
    padding: $spacing;
    width: 100%;
    @include set-color("grey3", "border", "1px solid");

    &--code {
      border-bottom: none;
    }
  }

  &__block {
    position: relative;
    @include set-color("grey1", "background");
    @include set-color("grey3", "border", "1px solid");

    &__copy {
      position: absolute;
      top: $spacing;
      right: $spacing;
      z-index: 1;
      font-size: 0.875em;
      cursor: pointer;
      @include set-color("label", "color");

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__code {
    background: transparent !important;
    border: none !important;
  }

  &__button {
    width: 100%;
    @include set-color("label", "color");
  }
}
</style>

<template>
  <div class="demo">
    <div class="demo__content" v-bind:class="{'demo__content--code': code}">
      <slot></slot>
      <div class="s-clear"></div>
      <div class="demo__block" v-if="code" v-show="open">
        <div class="demo__block__copy" v-on:click="copy()">Copy</div>
        <s-scroll :staticY="true" v-if="open">
          <pre>
            <code class="demo__code">
                {{code}}
            </code>
          </pre>
        </s-scroll>
      </div>
    </div>
    <s-button v-if="code" v-on:click.native="open = !open" class="demo__button"> {{open ? 'Hide' : 'Show'}} Code </s-button>
  </div>
</template>
<script>
import EventBus from "../event/bus.js";

export default {
  name: "demo",
  props: {
    code: {}
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    /**
     * @name copy
     * @desc copy the provided text to the clipboard
     * @param {string} text - text to copy
     * @returns {void}
     */
    copy(text) {
      // For IE.
      if (window.clipboardData) {
        window.clipboardData.setData("Text", this.code);
      } else {
        let exportElement = document.createElement("textarea");
        exportElement.style.position = "fixed";
        exportElement.style.left = "-1000px";
        exportElement.style.top = "-1000px";
        exportElement.value = this.code;
        document.body.append(exportElement);
        exportElement.select();

        if (document.execCommand("copy")) {
          exportElement.remove();
          EventBus.$emit("alert", {
            color: "success",
            text: "Successfully copied to clipboard"
          });
        } else {
          exportElement.remove();
          EventBus.$emit("alert", {
            color: "error",
            text: "Unsuccessfully copied to clipboard"
          });
        }
      }
    }
  }
};
</script>