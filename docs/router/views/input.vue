<style lang="scss" scoped>
</style>

<template>
  <div>
        <h3> Input </h3>
        <p> Inputs are elements that allow a user to type and interact with the UI. They are better suited for situations where input is small (i.e: Short name entries)</p>
        <demo :code="inputTemplate">
          <s-input label="Input" v-model="input">
          </s-input>
          <s-input label="Disabled Input" :disabled="true" v-model="input">
          </s-input>
        </demo>
        <options :items="inputItems"></options>
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
      inputTemplate: `
<template>
  <s-input label="Input" v-model="input">
  </s-input>
  <s-input label="Disabled Input" :disabled="true" v-model="input">
  </s-input>
</template>
<script>
  export default {
    data(){
      return{
        input:'Input'
      }
    }
  }
<\/script>`,
      input: "Input",
      inputItems: {
        Props: [
          ["Name", "Type", "Default", "Required", "Description"],
          ["label", "String", "", "", "Description of the element"],
          [
            "placeholder",
            "String",
            "Enter a value",
            "",
            "Placeholder given when v-model is empty"
          ],
          ["disabled", "Boolean", "false", "", "Disable interaction"],
          ["v-model", "String", "", "Yes", "Bind data to the model"],
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