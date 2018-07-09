<style lang="scss" scoped>
</style>

<template>
  <div>
    <h3> Datepicker </h3>
    <p> Datepickers are elements that allow a user to type and interact with the UI. They are better suited for situations where input is large (i.e: long address entries)</p>
    <demo :code="datepickerTemplate">
      <s-datepicker label="Datepicker" v-model="datepicker">
      </s-datepicker>
    </demo>
    <options :items="datepickerItems"></options>
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
      datepickerTemplate: `
<template>
  <s-datepicker label="Datepicker" v-model="datepicker">
  </s-datepicker>
</template>
<script>
  export default {
    data(){
      return{
        datepicker:'Datepicker'
      }
    }
  }
<\/script>`,
      datepicker: (function() {
        var current = new Date();
        return (
          current.getMonth() +
          1 +
          "/" +
          current.getDate() +
          "/" +
          current.getFullYear()
        );
      })(),
      datepickerItems: {
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
            type: "String",
            default: "",
            required: "Yes",
            description: "Bind data to the model. Must be a valid date string"
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