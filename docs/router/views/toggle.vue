<style lang="scss" scoped></style>

<template>
  <div>
    <h3> Toggle </h3>
    <p> Toggles are toggable elements that allow a user to select a value. They are better suited for situations where the user is making selections from a small group</p>
    <demo :code="toggleTemplate">
      <s-toggle label="Toggle Label" v-model="toggle">
      </s-toggle>
      <s-toggle label="Toggle Label" :disabled="true" v-model="toggle">
      </s-toggle>
    </demo>
    <options :items="toggleItems"></options>
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
      toggleTemplate: `
<template>
  <s-toggle label="Toggle Label" v-model="toggle">
    Toggle
  </s-toggle>
  <s-toggle label="Toggle Label" :disabled="true" v-model="toggle">
    Disabled Toggle
  </s-toggle>
</template>
<script>
  export default {
    data(){
      return{
        toggle:true
      }
    }
  }
<\/script>`,
      toggle: true,
      toggleItems: {
        Props: [
          {
            name: "label",
            type: "String",
            default: "",
            required: "",
            description: "Description of the element"
          },
          {
            name: "disabled",
            type: "Boolean",
            default: "false",
            required: "",
            description: "Disable interaction"
          },
          {
            name: "v-model",
            type: "Boolean",
            default: "",
            required: "Yes",
            description: "Bind data to the model"
          },
          {
            name: "inputDelay",
            type: "Number",
            default: -1,
            required: "",
            description: "Time (ms) to delay before updating the model"
          }
        ],
        Slots: [],
        Events: [
          {
            name: "input",
            scope:
              "val (newly selected value), delta (change from previous state)",
            description: "Triggered whenever the model is updated"
          }
        ]
      }
    };
  }
};
</script>