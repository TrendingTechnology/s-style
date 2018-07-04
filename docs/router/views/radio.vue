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
          ["Name", "Type", "Default", "Required", "Description"],
          ["label", "String", "", "", "Description of the element"],
          [
            "align",
            "String",
            "left",
            "",
            "Align to the right or the left of the view"
          ],
          ["disabled", "Boolean", "false", "", "Disable interaction"],
          ["val", "*", "", "Yes", "Value of the radio (when toggled)"],
          ["v-model", "Boolean", "", "Yes", "Bind data to the model"],
          [
            "inputDelay",
            "Number",
            -1,
            "",
            "Time (ms) to delay before updating the model"
          ]
        ],
        Slots: [["Name", "Scope", "Description"], ["", "", "text of the view"]],
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