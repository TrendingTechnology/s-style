<style lang="scss" scoped>
.accordion {
  height: 500px;
  width: 100%;
}
</style>

<template>
  <div>
        <h3> Accordion </h3>
        <p> Accordion organizes and divides content into collapable and resizable sections of the view</p>
        <s-alert color="primary"> 
          Note: Accordions must have child elements of s-accordion-item. Accordions will also try to fill the height of its parent container (height:100%. It may render incorrectly if the height is not set)
        </s-alert>
        <demo :code="accordionTemplate">
          <div class="accordion">
            <s-accordion>
              <s-accordion-item :default="25">
                <template slot="header"> Header 1 </template>
                <template slot="content"> Content 1 </template>
              </s-accordion-item>
              <s-accordion-item :default="25">
                <template slot="header"> Header 2 </template>
                <template slot="content"> Content 2 </template>
              </s-accordion-item>
              <s-accordion-item :default="25">
                <template slot="header"> Header 3 </template>
                <template slot="content"> Content 3 </template>
              </s-accordion-item>
              <s-accordion-item :default="25">
                <template slot="header"> Header 4 </template>
                <template slot="content"> Content 4 </template>
              </s-accordion-item>
            </s-accordion>
          </div>
        </demo>
        <demo :code="accordion2Template">
          <div class="accordion">
            <s-accordion :rotated="true">
              <s-accordion-item :default="50">
                <template slot="header"> Header 1 </template>
                <template slot="content"> Content 1 </template>
              </s-accordion-item>
              <s-accordion-item :default="50">
                <template slot="header"> Header 2 </template>
                <template slot="content"> Content 2 </template>
              </s-accordion-item>
            </s-accordion>
          </div>
        </demo>
        <options :items="accordionItems"></options>
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
      accordionTemplate: `
<template>
  <s-accordion>
    <s-accordion-item :default="25">
      <template slot="header"> Header 1 </template>
      <template slot="content"> Content 1 </template>
    </s-accordion-item>
    <s-accordion-item :default="25">
      <template slot="header"> Header 2 </template>
      <template slot="content"> Content 2 </template>
    </s-accordion-item>
    <s-accordion-item :default="25">
      <template slot="header"> Header 3 </template>
      <template slot="content"> Content 3 </template>
    </s-accordion-item>
    <s-accordion-item :default="25">
      <template slot="header"> Header 4 </template>
      <template slot="content"> Content 4 </template>
    </s-accordion-item>
  </s-accordion>
</template>`,
      accordion2Template: `
<template>
  <s-accordion :rotated="true">
    <s-accordion-item :default="50">
      <template slot="header"> Header 1 </template>
      <template slot="content"> Content 1 </template>
    </s-accordion-item>
    <s-accordion-item :default="50">
      <template slot="header"> Header 2 </template>
      <template slot="content"> Content 2 </template>
    </s-accordion-item>
  </s-accordion>
</template>`,
      accordionItems: {
        Props: [
          ["Name", "Type", "Default", "Required", "Description"],
          ["disabled", "Boolean", "false", "", "Disable interaction"],
          [
            "rotated",
            "Boolean",
            "",
            "",
            "Is the accordion rotated to be horizontal?"
          ],
          [
            "default",
            "Number",
            "0",
            "",
            "Default size of the accordion (set on s-accordion-item)"
          ]
        ],
        Slots: [
          ["Name", "Scope", "Description"],
          [
            "",
            "",
            "Pass in <s-accordion-item><s-accordion-item> with the appropriate props"
          ]
        ],
        Events: [["Name", "Parameters", "Description"], ["", "", ""]]
      }
    };
  }
};
</script>