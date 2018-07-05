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
            description: "Selected tab"
          },
          {
            name: "inputDelay",
            type: "Number",
            default: -1,
            required: "",
            description: "Time (ms) to delay before updating the model"
          },
          {
            name: "display",
            type: "String",
            default: "",
            required: "",
            description: "Displayed name in the form of 'a.b.c'"
          },
          {
            name: "model",
            type: "String",
            default: "",
            required: "",
            description:
              "Value to bind from options in the form of 'a.b.c'. Useful for 1-1 Mapping"
          },
          {
            name: "options",
            type: "Array",
            default: "[]",
            required: "Yes",
            description: "Tab options to select from"
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