<style lang="scss" scoped>
</style>

<template>
  <div>
    <h3> Datepicker </h3>
    <p> Datepickers are elements that allow a user to type and interact with the UI. They are better suited for situations where input is large (i.e: long address entries)</p>
    <demo :code="datepickerTemplate">
      <s-datepicker label="Datepicker" v-model="datepicker">
      </s-datepicker>
      <s-datepicker label="Datepicker" v-model="datepicker">
        <template slot-scope="date">
          {{date.fullDate}}
        </template>
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
  <s-datepicker label="Datepicker" v-model="datepicker">
    <template slot-scope="date">
      {{date.fullDate}}
    </template>
  </s-datepicker>
</template>
<script>
  export default {
    data(){
      return{
        datepicker: new Date()
      }
    }
  }
<\/script>`,
      datepicker: new Date(),
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
            type: "Date",
            default: "",
            required: "Yes",
            description: "Bind data to the model. Must be a valid date object"
          },
          {
            name: "inputDelay",
            type: "Number",
            default: -1,
            required: "",
            description: "Time (ms) to delay before updating the model"
          }
        ],
        Slots: [
           {
            name: "",
            scope: "value (raw value), shortDate (date in the form of MM/DD/YYYY), fullDate (date in the form of Month Day, Year)",
            description: "Manually set the view of the datepicker"
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