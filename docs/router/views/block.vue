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
          ["Name", "Type", "Default", "Required", "Description"],
          ["disabled", "Boolean", "false", "", "Disable interaction"],
          ["selected", "Boolean", "false", "", "Is the block selected?"],
          ["text", "String", "", "", "Default text to render"],
          ["image", "String", "", "", "Default image to render"]
        ],
        Slots: [
          ["Name", "Scope", "Description"],
          [
            "",
            "text (text of the block), image (image of the block)",
            "Manually edit the view of the block"
          ]
        ],
        Events: [["Name", "Parameters", "Description"], ["", "", ""]]
      }
    };
  }
};
</script>