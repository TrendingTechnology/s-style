<style lang="scss" scoped>
</style>

<template>
  <div>
        <h3> Tabs </h3>
        <p> Tabs allow the user to quickly switch between options</p>
        <demo :code="tabsTemplate">
          <s-tabs label="Tabs" :options="tabsOptions" v-model="tabs">
          </s-tabs>
        </demo>
        <options :items="tabsItems"></options>
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
      tabsTemplate: `
<template>
  <s-tabs label="Tabs" :options="options" v-model="model">
  </s-tabs>
</template>
<script>
  export default {
    data(){
      return{
        options:[0, 1, 2, 3, 4, 5],
        model: 1
      }
    }
  }
<\/script>`,
      tabsOptions: [0, 1, 2, 3, 4, 5],
      tabs: 1,
      tabsItems: {
        Props: [
          ["Name", "Type", "Default", "Required", "Description"],
          ["label", "String", "", "", "Description of the element"],
          [
            "placeholder",
            "String",
            "Select Tabs",
            "",
            "Placeholder given when v-model is empty"
          ],
          ["disabled", "Boolean", "false", "", "Disable interaction"],
          ["v-model", "*", "", "Yes", "Bind data to the model"],
          [
            "inputDelay",
            "Number",
            -1,
            "",
            "Time (ms) to delay before updating the model"
          ],
          [
            "display",
            "String",
            "",
            "",
            "Displayed name in the form of 'a.b.c'"
          ],
          [
            "model",
            "String",
            "",
            "",
            "Value to bind from options in the form of 'a.b.c'. Useful for 1-1 Mapping"
          ],
          ["options", "Array", "[]", "Yes", "Options to select from"]
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