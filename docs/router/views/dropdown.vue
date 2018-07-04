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
          ["Name", "Type", "Default", "Required", "Description"],
          ["label", "String", "", "", "Description of the element"],
          [
            "placeholder",
            "String",
            "Select Dropdown",
            "",
            "Placeholder given when v-model is empty"
          ],
          ["disabled", "Boolean", "false", "", "Disable interaction"],
          ["v-model", "*", "", "Yes", "Bind data to the model"],
          [
            "inputDelay",
            "Number",
            -1,
            "",
            "Time (ms) to delay before updating the model"
          ],
          [
            "display",
            "String",
            "",
            "",
            "Displayed name in the form of 'a.b.c'"
          ],
          [
            "model",
            "String",
            "",
            "",
            "Value to bind from options in the form of 'a.b.c'. Useful for 1-1 Mapping"
          ],
          ["options", "Array", "[]", "Yes", "Options to select from"],
          ["loading", "Boolean", false, "", "Loading for the scroll or search"],
          [
            "searchDelay",
            "Number",
            -1,
            "",
            "Time (ms) to delay before searching the options"
          ],
          [
            "search",
            "Function",
            "",
            "",
            "Search options using a custom function"
          ],
          [
            "scroll",
            "Function",
            "",
            "",
            "Trigger function when the scroll is near the bottom"
          ],
          [
            "position",
            "String",
            "vertical",
            "",
            "Default position of the dropdown"
          ]
        ],
        Slots: [
          ["Name", "Scope", "Description"],
          [
            "toggle",
            "display (text of the toggle), value (selected value)",
            "Update the view of the toggle"
          ],
          [
            "item",
            "item (rendered item)",
            "Update the view of the dropdown items"
          ]
        ],
        Events: [
          ["Name", "Parameters", "Description"],
          [
            "input",
            "val (newly selected value), delta (change from previous state)",
            "Triggered whenever the model is updated"
          ]
        ]
      }
    };
  }
};
</script>