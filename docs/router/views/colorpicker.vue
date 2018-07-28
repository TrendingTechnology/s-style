<style lang="scss" scoped>
</style>

<template>
  <div>
    <h3> Colorpicker </h3>
    <p> Colorpickers are elements that allow a user to type and interact with the UI. They are better suited for situations where input is large (i.e: long address entries)</p>
    <demo :code="colorpickerTemplate">
      <s-colorpicker label="Colorpicker" v-model="colorpicker">
      </s-colorpicker>
      <s-colorpicker label="Colorpicker" align="right" v-model="colorpicker">
        <template>
          {{colorpicker}}
        </template>
      </s-colorpicker>
      <s-colorpicker label="Colorpicker" v-model="colorpicker" :disabled="true">
      </s-colorpicker>
    </demo>
    <options :items="colorpickerItems"></options>
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
      colorpickerTemplate: `
<template>
  <s-colorpicker label="Colorpicker" v-model="colorpicker">
  </s-colorpicker>
  <s-colorpicker label="Colorpicker" align="right" v-model="colorpicker">
    <template>
      {{colorpicker}}
    </template>
  </s-colorpicker>
  <s-colorpicker label="Colorpicker" v-model="colorpicker" :disabled="true">
  </s-colorpicker>
</template>
<script>
  export default {
    data(){
      return{
        colorpicker: "#278DD3"
      }
    }
  }
<\/script>`,
      colorpicker: "#278DD3",
      colorpickerItems: {
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
            type: "Color (Hex)",
            default: "",
            required: "Yes",
            description:
              "Bind data to the model. Must be a valid  Color (Hex) string"
          },
          {
            name: "inputDelay",
            type: "Number",
            default: -1,
            required: "",
            description: "Time (ms) to delay before updating the model"
          },
          {
            name: "position",
            type: "String",
            default: "vertical",
            required: "",
            description: "Default position of the color content"
          },
          {
            name: "align",
            type: "String",
            default: "left",
            required: "",
            description:
              "Align the checkbox to the right or the left of the view"
          }
        ],
        Slots: [
          {
            name: "",
            scope: "",
            description: "Manually set the view of the colorpicker"
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