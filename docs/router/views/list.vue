<style lang="scss" scoped>
.list {
  height: 250px;
  width: 100%;
}
</style>

<template>
  <div>
        <h3> List </h3>
        <p> Lists hold a collection of elements, but only render those taht are in the view</p>
        <s-alert color="primary"> 
          Note: Lists will try to fill the height of its parent container (height:100%. It may render incorrectly if the height is not set)
        </s-alert>
        <demo :code="listTemplate">
          <div class="list">
            <s-list label="List" :options="listOptions">
            </s-list>
          </div>
        </demo>
        <options :items="listItems"></options>
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
      listTemplate: `
<template>
  <s-list label="List" :options="options">
  </s-list>
</template>
<script>
  export default {
    data(){
      return{
        options:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    }
  }
<\/script>`,
      listOptions: (function() {
        let arr = [];
        for (let i = 0; i <= 1000; i++) {
          arr.push(i);
        }
        return arr;
      })(),
      listItems: {
        Props: [
          ["Name", "Type", "Default", "Required", "Description"],
          ["disabled", "Boolean", "false", "", "Disable interaction"],
          ["options", "Array", "[]", "Yes", "Options to select from"],
          ["loading", "Boolean", false, "", "Loading for the scroll"],
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
          ["", "", "Update the view of the list items"]
        ],
        Events: [["Name", "Parameters", "Description"], ["", "", ""]]
      }
    };
  }
};
</script>