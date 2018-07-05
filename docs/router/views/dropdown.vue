<style lang="scss" scoped>
</style>

<template>
  <div>
    <h3> Dropdown </h3>
    <p> Dropdowns are toggable checklist elements that allow a user to select one value from a list. They are better suited for situations where the list of options needs to be hidden (i.e: Numerous selection inputs on a single screen or selections that do not occur frequently)</p>
    <s-alert color="primary">
      Note: Dropdown lists are appended to the body
    </s-alert>
    <demo :code="dropdown1Template">
      <s-dropdown label="Dropdown" :options="dropdown1Options" v-model="dropdown1">
      </s-dropdown>
    </demo>
    <demo :code="dropdown2Template">
      <s-dropdown label="Dropdown" :options="dropdown2Options" model="model" display="display" v-model="dropdown2">
        <template slot="toggle" slot-scope="toggle">
          Toggle {{toggle.display}}
        </template>
        <template slot="item" slot-scope="item">
          List {{item.display}}
        </template>
      </s-dropdown>
    </demo>
    <options :items="dropdownItems"></options>
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
      dropdown1Template: `
<template>
  <s-dropdown label="Dropdown" :options="options" v-model="model">
  </s-dropdown>
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
      dropdown1Options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      dropdown1: 10,
      dropdown2Template: `
<template>
  <s-dropdown label="Dropdown" :options="options" model="model" display="display" v-model="model">
    <template slot="toggle" slot-scope="toggle">
      Toggle {{toggle.display}}
    </template>
    <template slot="item" slot-scope="item">
      List {{item.display}}
    </template>
  </s-dropdown>
</template>
<script>
  export default {
    data(){
      return{
        options:[
          { display: "zero", model: 0 },
          { display: "one", model: 1 },
          { display: "two", model: 2 },
          { display: "three", model: 3 },
          { display: "four", model: 4 },
          { display: "five", model: 5 }
        ],
        model: 3
      }
    }
  }
<\/script>`,
      dropdown2Options: [
        { display: "zero", model: 0 },
        { display: "one", model: 1 },
        { display: "two", model: 2 },
        { display: "three", model: 3 },
        { display: "four", model: 4 },
        { display: "five", model: 5 }
      ],
      dropdown2: 3,
      dropdownItems: {
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
            default: "Select Dropdown",
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
          },
          {
            name: "position",
            type: "String",
            default: "vertical",
            required: "",
            description: "Default position of the dropdown content"
          }
        ],
        Slots: [
          {
            name: "toggle",
            scope: "display (text of the toggle), value (selected value)",
            description: "Update the view of the dropdown toggle"
          },
          {
            name: "item",
            scope: "item (rendered item)",
            description: "Update the view of the dropdown items"
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