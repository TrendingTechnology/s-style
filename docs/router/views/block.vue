<style lang="scss" scoped>
</style>

<template>
  <div>
    <h3> Block </h3>
    <p> Blocks help display items in a list. Images can be passed in to give it a better view.</p>
    <demo :code="blockTemplate">
      <s-block :text="'Normal Block'"></s-block>
      <s-block :text="'Selected Block'" :selected="true"></s-block>
      <s-block :text="'Disabled Block'" :disabled="true"></s-block>
    </demo>
    <options :items="blockItems"></options>
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
      blockTemplate: `
<template>
  <s-block :text="'Normal Block'"></s-block>
  <s-block :text="'Selected Block'" :selected="true"></s-block>
  <s-block :text="'Disabled Block'" :disabled="true"></s-block>
</template>`,
      blockItems: {
        Props: [
          {
            name: "disabled",
            type: "Boolean",
            default: "false",
            required: "",
            description: "Disable interaction with the alert."
          },
          {
            name: "selected",
            type: "Boolean",
            default: "false",
            required: "",
            description: "Is the block selected?"
          },
          {
            name: "image",
            type: "String",
            default: "",
            required: "",
            description: "Block's image to render"
          },
          {
            name: "text",
            type: "String",
            default: "",
            required: "",
            description: "Blocks's text to render"
          }
        ],
        Slots: [
          {
            name: "",
            scope: "",
            description: "Manually set the view of the block"
          }
        ],
        Events: []
      }
    };
  }
};
</script>