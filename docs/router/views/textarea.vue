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
          ["Name", "Type", "Default", "Required", "Description"],
          ["label", "String", "", "", "Description of the element"],
          [
            "placeholder",
            "String",
            "Enter a value",
            "",
            "Placeholder given when v-model is empty"
          ],
          ["disabled", "Boolean", "false", "", "Disable interaction"],
          ["v-model", "String", "", "Yes", "Bind data to the model"],
          [
            "textareaDelay",
            "Number",
            -1,
            "",
            "Time (ms) to delay before updating the model"
          ]
        ],
        Slots: [["Name", "Scope", "Description"], ["", "", ""]],
        Events: [
          ["Name", "Parameters", "Description"],
          [
            "textarea",
            "val (newly selected value), delta (change from previous state)",
            "Triggered whenever the model is updated"
          ]
        ]
      }
    };
  }
};
</script>