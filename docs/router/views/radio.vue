<style lang="scss" scoped></style>

<template>
  <div>
    <h3> Radio </h3>
    <p> Radios are toggable elements that allow a user to select a value. They are better suited for situations where the user is making selections from a small group</p>
    <demo :code="radioTemplate">
      <s-radio label="Radio Label" val="radio1" v-model="radio">
        Radio
      </s-radio>
      <s-radio label="Radio Label" val="radio2" :align="'right'" v-model="radio">
        Right Radio
      </s-radio>
      <s-radio label="Radio Label" val="radio3" :disabled="true" v-model="radio">
        Disabled Radio
      </s-radio>
    </demo>
    <options :items="radioItems"></options>
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
      radioTemplate: `
<template>
  <s-radio label="Radio Label" val="radio1" v-model="radio">
    Radio
  </s-radio>
  <s-radio label="Radio Label" val="radio2" :align="'right'" v-model="radio">
    Right Radio
  </s-radio>
  <s-radio label="Radio Label" val="radio3" :disabled="true" v-model="radio">
    Disabled Radio
  </s-radio>
</template>
<script>
  export default {
    data(){
      return{
        radio:'radio1'
      }
    }
  }
<\/script>`,
      radio: "radio1",
      radioItems: {
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
            description: "Align the radio to the right or the left of the view"
          },
          {
            name: "val",
            type: "*",
            default: "",
            required: "Yes",
            description: "Value of the radio (when toggled)"
          }
        ],
        Slots: [
          {
            name: "",
            scope: "",
            description: "Manually set the view of the radio"
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