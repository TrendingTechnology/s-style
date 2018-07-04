<style lang="scss" scoped>
.checklist {
  height: 250px;
  width: 100%;
}
</style>

<template>
  <div>
        <h3> Checklist </h3>
        <p> Checklists are  elements that allow a user to select a single or multiple values from a list. They are better suited for situations where the list of options needs to be visible (i.e: Selections that occur frequently)</p>
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
          ["Name", "Type", "Default", "Required", "Description"],
          ["label", "String", "", "", "Description of the element"],
          [
            "placeholder",
            "String",
            "Search Checklist",
            "",
            "Placeholder given when v-model is empty"
          ],
          ["disabled", "Boolean", "false", "", "Disable interaction"],
          [
            "v-model",
            "* (Array if multiple)",
            "",
            "Yes",
            "Bind data to the model"
          ],
          [
            "multiple",
            "Boolean",
            "false",
            "",
            "Allow the selection of multiple values"
          ],
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
          ["searchable", "Boolean", false, "", "Toggle search on/off."],
          [
            "searchDelay",
            "Number",
            -1,
            "",
            "Time (ms) to delay before searching the options. Searchable must be true"
          ],
          [
            "search",
            "Function",
            "",
            "",
            "Search options using a custom function. Searchable must be true"
          ],
          [
            "scroll",
            "Function",
            "",
            "",
            "Trigger function when the scroll is near the bottom"
          ]
        ],
        Slots: [
          ["Name", "Scope", "Description"],
          ["", "item (rendered item)", "Update the view of the checklist items"]
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