<style lang="scss">
@import "../theme.scss";

.s-file {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  @include set-color("neutral", "background");

  &__holder {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    @include disabled("grey3");

    &--label {
      height: calc(100% - #{$height + 0.5 * $spacing});
    }
  }

  &__content {
    position: relative;
    padding: $spacing;
    width: 100%;
    height: 100%;
    @include set-color("grey3", "border", "1px solid");
    overflow: auto;

    &--highlight {
      @include set-color("primary", "border", "1px dashed");
    }
  }

  &__message {
    position: relative;
    top: calc(50% - #{$height * 2 / 2});
    height: $height * 2;
    line-height: $height;
    text-align: center;
    @include set-color("grey5", "color");
  }

  &__preview {
    position: relative;
    z-index: 2;
    float: left;
    margin: $spacing;
    padding: 0 $spacing $spacing $spacing;
    width: 128px;
    cursor: default;
    text-align: center;
    @include set-color("grey5", "color");
    @include set-color("grey3", "border", "1px solid");

    &__times {
      float: right;
      width: 1.5 * $spacing;
      text-align: center;
      font-size: 0.875em;
      cursor: pointer;
      @include set-color("grey4", "color");

      &:hover {
        @include set-color("grey5", "color");
      }
    }
  }

  &__input {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  }
}
</style>
<template>
  <div class="s-file">
    <div class="s-label" v-if="label"> {{label}} </div>
    <div :disabled="disabled" v-bind:class="classObj">
      <div ref="content" class="s-file__content" v-bind:class="{'s-file__content--highlight':highlight}">
        <s-scroll>
          <div class="s-file__message" v-show="computedValue.length === 0">
            <slot>
              <i class="fas fa-file-upload fa-2x"></i>
              <div class="s-text">
                Drag and Drop a File
              </div>
            </slot>
          </div>
          <div v-show="computedValue.length > 0">
            <div class="s-file__preview" v-for="(file, fileIdx) in computedValue" :key="fileIdx" :title="file.name">
              <div class="s-file__preview__times" v-on:click="removeFile(fileIdx)">
                <i class="fas fa-times"></i>
              </div>
              <div class="s-clear"></div>
              <i class="fas fa-file fa-3x"></i>
              <div class="s-text">
                {{file.name}}
              </div>
            </div>
            <div class="s-clear"></div>
          </div>
          <input :disabled="disabled" class="s-file__input" type="file" title=" " multiple v-on:change="updateFile">
        </s-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import Input from "../mixins/input.js";

import SScroll from "./s-scroll.vue";

export default {
  name: "s-file",
  mixins: [Input],
  components: {
    SScroll
  },
  props: {
    value: {
      required: true,
      type: Array
    },
    multiple: {
      type: Boolean,
      default: false
    },
    validate: {
      type: Function,
      default: () => {
        return true;
      }
    }
  },
  computed: {
    classObj: function() {
      const classObj = {
        "s-file__holder": true,
        "s-file__holder--disabled": this.disabled,
        "s-file__holder--label": !!this.label
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
  data() {
    return {
      highlight: false
    };
  },
  methods: {
    /**
     * @name showHighlightFile
     * @desc highlight a file when an item is dragged in
     * @returns {void}
     */
    showHighlightFile() {
      this.highlight = true;
    },
    /**
     * @name hideHighlightFile
     * @desc unhighlight a file when an item is dragged in
     * @returns {void}
     */
    hideHighlightFile() {
      this.highlight = false;
    },
    /**
     * @name removeFile
     * @desc remove a file from the index
     * @param {number} index - index to remove the file from
     * @returns {void}
     */
    removeFile(index) {
      this.computedValue.splice(index, 1);
    },
    /**
     * @name updateFile
     * @desc add a new file to the file object
     * @param {event} event - dom event
     * @returns {void}
     */
    updateFile(event) {
      const files = Array.from(event.target.files);

      for (let fileObj of files) {
        const file = {
          name: fileObj.name,
          extension: fileObj.name.substring(fileObj.name.lastIndexOf(".") + 1),
          fileObj: fileObj
        };

        // check if the file can be added
        if (!this.validate(file)) {
          continue;
        }

        if (!this.multiple) {
          this.computedValue = [file];
          break;
        }

        this.computedValue.push(file);
      }
    }
  },
  mounted() {
    // add the highlight
    this.$refs.content.addEventListener("dragenter", this.showHighlightFile);
    this.$refs.content.addEventListener("dragover", this.showHighlightFile);

    // remove the highlight
    this.$refs.content.addEventListener("dragleave", this.hideHighlightFile);
    this.$refs.content.addEventListener("drop", this.hideHighlightFile);
  },
  beforeDestroy() {
    this.$refs.content.removeEventListener("dragenter", this.showHighlightFile);
    this.$refs.content.removeEventListener("dragover", this.showHighlightFile);
    this.$refs.content.removeEventListener("dragleave", this.hideHighlightFile);
    this.$refs.content.removeEventListener("drop", this.hideHighlightFile);
  }
};
</script>
