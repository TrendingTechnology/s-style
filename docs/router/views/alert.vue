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
          ["Name", "Type", "Default", "Required", "Description"],
          ["disabled", "Boolean", "false", "", "Disable interaction"],
          ["v-model", "Boolean", "true", "", "Close the model"],
          ["label", "String", "", "", "Label to render"],
          ["text", "String", "", "", "Text to render"],
          ["closeable", "Boolean", "false", "", "Show the close icon"]
        ],
        Slots: [
          ["Name", "Scope", "Description"],
          ["", "", "Manually edit the view of the alert"]
        ],
        Events: [["Name", "Parameters", "Description"], ["", "", ""]]
      }
    };
  }
};
</script>