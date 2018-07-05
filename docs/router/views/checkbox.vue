<style lang="scss" scoped></style>

<template>
  <div>
    <h3> Checkbox </h3>
    <p> Checkboxs are toggable elements that allow a user to turn a value on or off. They are better suited for situations where the user is making isolated selections</p>
    <demo :code="checkboxTemplate">
      <s-checkbox label="Checkbox Label" v-model="checkbox">
        Checkbox
      </s-checkbox>
      <s-checkbox label="Checkbox Label" :align="'right'" v-model="checkbox">
        Right Checkbox
      </s-checkbox>
      <s-checkbox label="Checkbox Label" :disabled="true" v-model="checkbox">
        Disabled Checkbox
      </s-checkbox>
    </demo>
    <options :items="checkboxItems"></options>
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
      checkboxTemplate: `
<template>
  <s-checkbox label="Checkbox Label" v-model="checkbox">
    Checkbox
  </s-checkbox>
  <s-checkbox label="Checkbox Label" :align="'right'" v-model="checkbox">
    Right Checkbox
  </s-checkbox>
  <s-checkbox label="Checkbox Label" :disabled="true" v-model="checkbox">
    Disabled Checkbox
  </s-checkbox>
</template>
<script>
  export default {
    data(){
      return{
        checkbox:true
      }
    }
  }
<\/script>`,
      checkbox: true,
      checkboxItems: {
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
          },
          {
            name: "align",
            type: "String",
            default: "",
            required: "",
            description:
              "Align the checkbox to the right or the left of the view"
          }
        ],
        Slots: [
          {
            name: "",
            scope: "",
            description: "Manually set the view of the checkbox"
          }
        ],
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