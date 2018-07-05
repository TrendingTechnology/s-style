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
          {
            name: "label",
            type: "String",
            default: "",
            required: "",
            description: "Description of the element"
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
            type: "Number",
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
            name: "min",
            type: "Number",
            default: 0,
            required: "",
            description: "Minimum range value"
          },
          {
            name: "max",
            type: "Number",
            default: 100,
            required: "",
            description: "Maximum range value"
          },
          {
            name: "step",
            type: "Number",
            default: 1,
            required: "",
            description: "Step size for the range"
          }
        ],
        Slots: [],
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