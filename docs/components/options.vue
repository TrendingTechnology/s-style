<style lang="scss" scoped>
@import "~theme";

.options {
  margin: 0 0 $spacing 0;
  width: 100%;
  height: auto;

  &__content {
    padding: $spacing * 2;
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
    <s-tabs :options="options" display="display" model="value" v-model="model"></s-tabs>
    <div class="options__content">
      <s-scroll :staticY="true">
        <p v-show="items[model].length === 0"> 
          There are no {{model}}
        </p>
        <table v-show="items[model].length !== 0" class="options__table">
          <tr v-for="(row, rowIdx) in items[model]" :key="rowIdx">
            <th v-if="rowIdx === 0" v-for="(cell, cellIdx) in row" :key="cellIdx">
              {{cell}}
            </th>
            <td  v-if="rowIdx !== 0" v-for="(cell, cellIdx) in row" :key="cellIdx">
              {{cell}}
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
      model: "",
      options: []
    };
  },
  created() {
    this.options = [];
    for (let option in this.items) {
      if (this.items.hasOwnProperty(option)) {
        this.options.push({
          display: option,
          value: option
        });
      }
    }

    if (this.options.length > 0) {
      this.model = this.options[0].value;
    }
  }
};
</script>