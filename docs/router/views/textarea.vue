<style lang="scss" scoped>
</style>

<template>
  <div>
    <h3> Textarea </h3>
    <p> Textareas are elements that allow a user to type and interact with the UI. They are better suited for situations where input is large (i.e: long address entries)</p>
    <demo :code="textareaTemplate">
      <s-textarea label="Textarea" v-model="textarea">
      </s-textarea>
      <s-textarea label="Disabled Textarea" :disabled="true" v-model="textarea">
      </s-textarea>
    </demo>
    <options :items="textareaItems"></options>
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
      textareaTemplate: `
<template>
  <s-textarea label="Textarea" v-model="textarea">
  </s-textarea>
  <s-textarea label="Disabled Textarea" :disabled="true" v-model="textarea">
  </s-textarea>
</template>
<script>
  export default {
    data(){
      return{
        textarea:'Textarea'
      }
    }
  }
<\/script>`,
      textarea: "Textarea",
      textareaItems: {
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