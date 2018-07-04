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
          ["Name", "Type", "Default", "Required", "Description"],
          ["label", "String", "", "", "Description of the element"],
          ["disabled", "Boolean", "false", "", "Disable interaction"],
          ["v-model", "Boolean", "", "Yes", "Bind data to the model"],
          [
            "inputDelay",
            "Number",
            -1,
            "",
            "Time (ms) to delay before updating the model"
          ]
        ],
        Slots: [["Name", "Scope", "Description"], ["", "", ""]],
        Events: [
          ["Name", "Parameters", "Description"],
          [
            "input",
            "val (newly selected value), delta (change from previous state)",
            "Triggered whenever the model is updated"
          ]
        ]
      }
    };
  }
};
</script>