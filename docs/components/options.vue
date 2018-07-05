<style lang="scss" scoped>
@import "~theme";

.options {
  margin: 0 0 $spacing 0;
  width: 100%;
  height: auto;

  &__content {
    padding: $spacing * 2;
    margin: 0 0 $spacing * 2 0;
    width: 100%;
    @include set-color("grey3", "border-right", "1px solid");
    @include set-color("grey3", "border-bottom", "1px solid");
    @include set-color("grey3", "border-left", "1px solid");
  }
}
</style>

<template>
  <div class="options">
    <h6> Options </h6>
    <s-tabs :options="options" v-model="model"></s-tabs>
    <div class="options__content">
      <s-scroll :staticY="true">
        <p v-show="table[model].length === 0">
          There are no {{model}}
        </p>
        <table v-show="table[model].length !== 0" class="options__table">
          <tr>
            <th v-for="(header, headerIdx) in tableHeaders[model]" :key="headerIdx">
              {{header.title}}
            </th>
          </tr>
          <tr v-for="(row, rowIdx) in table[model]" :key="rowIdx">
            <td v-for="(header, headerIdx) in tableHeaders[model]" :key="headerIdx">
              {{row[header.key]}}
            </td>
          </tr>
        </table>
      </s-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo",
  props: {
    items: {
      default: () => {
        return {
          Props: [],
          Slots: [],
          Events: []
        };
      }
    }
  },
  data() {
    return {
      model: "Props",
      options: ["Props", "Slots", "Events"],
      tableHeaders: {
        Props: [
          { title: "Name", key: "name" },
          { title: "Type", key: "type" },
          { title: "Default", key: "default" },
          { title: "Required", key: "required" },
          { title: "Description", key: "description" }
        ],
        Slots: [
          { title: "Name", key: "name" },
          { title: "Scope", key: "scope" },
          { title: "Description", key: "description" }
        ],
        Events: [
          { title: "Name", key: "name" },
          { title: "Parameters", key: "parameters" },
          { title: "Description", key: "description" }
        ]
      },
      table: {}
    };
  },
  created() {
    //clear
    this.table = {};
    for (let item in this.items) {
      if (this.items.hasOwnProperty(item)) {
        // create the table
        this.table[item] = [];

        // check if defaults are defined
        if (this.tableHeaders.hasOwnProperty(item)) {
          for (let opt of this.items[item]) {
            this.table[item].push(opt);
          }

          // sort
          this.table[item].sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        } else {
          console.warn("No defaults for " + item);
        }
      }
    }
  }
};
</script>