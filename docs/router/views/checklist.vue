<style lang="scss" scoped>
.checklist {
  height: 250px;
  width: 100%;
}
</style>

<template>
  <div>
    <h3> Checklist </h3>
    <p> Checklists are elements that allow a user to select a single or multiple values from a list. They are better suited for situations where the list of options needs to be visible (i.e: Selections that occur frequently)</p>
    <s-alert color="primary">
      Note: Checklists will try to fill the height of its parent container (height:100%. It may render incorrectly if the height is not set)
    </s-alert>
    <demo :code="checklist1Template">
      <div class="checklist">
        <s-checklist label="Checklist" :options="checklist1Options" v-model="checklist1">
        </s-checklist>
      </div>
    </demo>
    <demo :code="checklist2Template">
      <div class="checklist">
        <s-checklist label="Checklist" :options="checklist2Options" v-model="checklist2">
          <template slot-scope="item">
            List {{item.display}}
          </template>
        </s-checklist>
      </div>
    </demo>
    <options :items="checklistItems"></options>
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
      checklist1Template: `
<template>
  <s-checklist label="Checklist" :options="options" v-model="model">
  </s-checklist>
</template>
<script>
  export default {
    data(){
      return{
        options:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        model: 10
      }
    }
  }
<\/script>`,
      checklist1Options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      checklist1: 10,
      checklist2Template: `
<template>
  <s-checklist label="Checklist" :options="options" v-model="model">
    <template slot-scope="item">
      List {{item.display}}
    </template>
  </s-checklist>
</template>
<script>
  export default {
    data(){
      return{
        options:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        model: 10
      }
    }
  }
<\/script>`,
      checklist2Options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      checklist2: 10,
      checklistItems: {
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
            default: "Search Checklist",
            required: "",
            description: "Placeholder given when search is empty"
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
            name: "multiple",
            type: "Boolean",
            default: "false",
            required: "",
            description: "Allow the selection of multiple values"
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
            description: "Options to select from"
          },
          {
            name: "loading",
            type: "Boolean",
            default: false,
            required: "",
            description: "Loading for the scroll and/or search"
          },
          {
            name: "searchable",
            type: "Boolean",
            default: false,
            required: "",
            description: "Toggle search on/off."
          },
          {
            name: "searchDelay",
            type: "Number",
            default: -1,
            required: "",
            description: "Time (ms) to delay before searching the options"
          },
          {
            name: "search",
            type: "Function",
            default: "",
            required: "",
            description: "Search options using a custom function"
          },
          {
            name: "scroll",
            type: "Function",
            default: "",
            required: "",
            description: "Trigger function when the scroll is near the bottom"
          }
        ],
        Slots: [
          {
            name: "item",
            scope: "item (rendered item)",
            description: "Update the view of the checklist items"
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