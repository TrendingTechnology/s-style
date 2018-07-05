<style lang="scss" scoped>
.scroll {
  &__outer {
    float: left;
    height: 200px;
    width: 33%;
  }

  &__inner {
    position: relative;
    height: 100%;
    width: 100%;

    &--width {
      width: 500%;
    }

    &--height {
      height: 500%;
    }
  }
}
</style>

<template>
  <div>
    <h3> Scroll </h3>
    <p> Scrolls wrap an element, emulating a scrollbar that is visible on hover.</p>
    <demo :code="scrollTemplate">
      <div class="scroll__outer">
        <s-scroll :staticY="true">
          <div class="scroll__inner scroll__inner--width">
            Scroll Me Left and Right<br>
          </div>
        </s-scroll>
      </div>
      <div class="scroll__outer">
        <s-scroll :staticX="true">
          <div class="scroll__inner scroll__inner--height">
            Scroll Me Up and Down
          </div>
        </s-scroll>
      </div>
      <div class="scroll__outer">
        <s-scroll>
          <div class="scroll__inner scroll__inner--width scroll__inner--height">
            Scroll Me All Around
          </div>
        </s-scroll>
      </div>
    </demo>
    <options :items="scrollItems"></options>
  </div>
</template>

<script>
import demo from "../../components/demo.vue";
import options from "../../components/options.vue";

export default {
  components: {
    demo,
    options
  },
  data() {
    return {
      scrollTemplate: `
<style lang="scss" scoped>
.scroll {
  &__outer {
    float: left;
    height: 200px;
    width: 33%;
  }

  &__inner {
    position: relative;
    height: 100%;
    width: 100%;

    &--width {
      width: 500%;
    }

    &--height {
      height: 500%;
    }
  }
}
</style>

<template>
  <div class="scroll__outer">
    <s-scroll :staticY="true">
      <div class="scroll__inner scroll__inner--width">
        Scroll Me Left and Right<br>             
      </div>
    </s-scroll>
  </div>
  <div class="scroll__outer">
    <s-scroll :staticX="true">
      <div class="scroll__inner scroll__inner--height">
        Scroll Me Up and Down
      </div>
    </s-scroll>
  </div>
  <div class="scroll__outer">
    <s-scroll>
      <div class="scroll__inner scroll__inner--width scroll__inner--height">
        Scroll Me All Around
      </div>
    </s-scroll>
  </div>
</template>`,
      scrollItems: {
        Props: [
          {
            name: "disabled",
            type: "Boolean",
            default: "false",
            required: "",
            description: "Disable interaction"
          },
          {
            name: "staticX",
            type: "Boolean",
            default: "false",
            required: "",
            description: "Disable the horizontal scroll"
          },
          {
            name: "staticY",
            type: "Boolean",
            default: "false",
            required: "",
            description: "Disable the vertical scroll"
          }
        ],
        Slots: [
          {
            name: "",
            scope: "",
            description: "Main content to render"
          }
        ],
        Events: []
      }
    };
  }
};
</script>