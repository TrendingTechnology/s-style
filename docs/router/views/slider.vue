<style lang="scss" scoped>
</style>

<template>
  <div>
        <h3> Slider </h3>
        <p> Sliders are draggable elements that allow a user to select one value from a range</p>
        <demo :code="slider1Template">
          <s-slider label="Slider" v-model="slider"></s-slider>
          <s-slider label="Slider" v-model="slider" :disabled="true"></s-slider>
          <s-slider label="Slider" v-model="slider" :step="10" :min="0" :max="100"></s-slider>
        </demo>
        <options :items="sliderItems"></options>
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
      slider1Template: `
<template>
  <s-slider label="Slider" v-model="model"></s-slider>
  <s-slider label="Slider" v-model="model" :disabled="true"></s-slider>
  <s-slider label="Slider" v-model="model" :step="10" :min="0" :max="100"></s-slider>
</template>
<script>
  export default {
    data(){
      return{
        model: 50
      }
    }
  }
<\/script>`,
      slider: 50,
      sliderItems: {
        Props: [
          ["Name", "Type", "Default", "Required", "Description"],
          ["label", "String", "", "", "Description of the element"],

          ["disabled", "Boolean", "false", "", "Disable interaction"],
          ["v-model", "*", "", "Yes", "Bind data to the model"],
          [
            "inputDelay",
            "Number",
            -1,
            "",
            "Time (ms) to delay before updating the model"
          ],
          ["min", "Number", "", "", "Minimum range value"],
          ["max", "Number", "", "", "Maximum range value"],
          ["step", "Number", "", "", "Step size for the range"]
        ],
        Slots: [["Name", "Scope", "Description"], ["", "", ""]],
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