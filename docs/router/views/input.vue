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
          {
            name: "label",
            type: "String",
            default: "",
            required: "",
            description: "Description of the element"
          },
          {
            name: "placeholder",
            type: "String",
            default: "Enter a value",
            required: "",
            description: "Placeholder given when v-model is empty"
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
            type: "*",
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