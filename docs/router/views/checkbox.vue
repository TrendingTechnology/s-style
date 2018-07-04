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