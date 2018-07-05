<style lang="scss" scoped>
</style>

<template>
  <div>
    <h3> Alert </h3>
    <p> Alerts help inform the user of important messages.</p>
    <demo :code="alertTemplate">
      <s-alert label="Normal Alert" text="This is the actual message of the alert"></s-alert>
      <s-alert label="Primary Alert" text="This is the actual message of the alert" color="primary"></s-alert>
      <s-alert label="Success Alert" text="This is the actual message of the alert" color="success"></s-alert>
      <s-alert label="Error Alert" text="This is the actual message of the alert" color="error"></s-alert>
      <s-alert label="Closeable Alert" text="This is the actual message of the alert" v-model="alert" :closeable="true"></s-alert>
      <s-alert label="Disabled Alert" text="This is the actual message of the alert" :closeable="true" :disabled="true"></s-alert>
    </demo>
    <options :items="alertItems"></options>
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
      alert: true,
      alertTemplate: `
<template>
  <s-alert label="Normal Alert" text="This is the actual message of the alert"></s-alert>
  <s-alert label="Primary Alert" text="This is the actual message of the alert" color="primary"></s-alert>
  <s-alert label="Success Alert" text="This is the actual message of the alert" color="success"></s-alert>
  <s-alert label="Error Alert" text="This is the actual message of the alert" color="error"></s-alert>
  <s-alert label="Closeable Alert" text="This is the actual message of the alert" v-model="alert" :closeable="true"></s-alert>
  <s-alert label="Disabled Alert" text="This is the actual message of the alert"  :closeable="true" :disabled="true"></s-alert>
</template>
<script>
  export default {
    data(){
      return{
        alert:true
      }
    }
  }
<\/script>`,
      alertItems: {
        Props: [
          {
            name: "disabled",
            type: "Boolean",
            default: "false",
            required: "",
            description: "Disable interaction with the alert."
          },
          {
            name: "v-model",
            type: "*",
            default: "",
            required: "Yes",
            description: "Bind data to the model. This will close the alert."
          },
          {
            name: "label",
            type: "String",
            default: "",
            required: "",
            description: "Alert's label to render"
          },
          {
            name: "text",
            type: "String",
            default: "",
            required: "",
            description: "Alerts's text to render"
          },
          {
            name: "closeable",
            type: "Boolean",
            default: "false",
            required: "",
            description: "Show the close icon"
          }
        ],
        Slots: [
          {
            name: "",
            scope: "",
            description: "Manually set the view of the alert"
          }
        ],
        Events: []
      }
    };
  }
};
</script>