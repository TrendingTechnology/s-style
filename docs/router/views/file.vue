<style lang="scss" scoped>
.file {
  height: 175px;
  width: 100%;
}
</style>

<template>
  <div>
    <h3> File </h3>
    <p></p>
    <demo :code="fileTemplate">
      <div class="file">
        <s-file label="Multiple Files (only csv)" v-model="file" :multiple="true" :validate="fileValidate">
        </s-file>
      </div>
      <div class="file">
        <s-file label="Single File" v-model="file2">
        </s-file>
      </div>
      <div class="file">
        <s-file label="Drag and Drop" :disabled="true" v-model="file3">
        </s-file>
      </div>
    </demo>
    <options :items="fileItems"></options>
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
      fileTemplate: `
<style lang="scss" scoped>
.file {
  height: 175px;
  width: 100%;
}
</style>

<template>
  <div>
    <div class="file">
      <s-file label="Multiple Files (only csv)" v-model="file" :multiple="true" :validate="fileValidate">
      </s-file>
    </div>
    <div class="file">
      <s-file label="Single File" v-model="file2">
      </s-file>
    </div>
    <div class="file">
      <s-file label="Drag and Drop" :disabled="true" v-model="file3">
      </s-file>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        file: [],
        fileValidate: file => {
          return file.extension === "csv";
        },
        file2: [],
        file3: [],
      }
    }
  }
<\/script>`,
      file: [],
      fileValidate: file => {
        return file.extension === "csv";
      },
      file2: [],
      file3: [],
      fileItems: {
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
            type: "Array",
            default: "[]",
            required: "Yes",
            description: "Bind data to the model"
          },
           {
            name: "validate",
            type: "Function",
            default: "(file) => { return true; }",
            required: "",
            description: "Validate the input before adding it to the model. Return true if it is valid."
          },
          {
            name: "multiple",
            type: "Boolean",
            default: "false",
            required: "",
            description: "Allow multiple files to be added in"
          },
          {
            name: "inputDelay",
            type: "Number",
            default: -1,
            required: "",
            description: "Time (ms) to delay before updating the model"
          }
        ],
        Slots: [
          {
            name: "",
            scope: "",
            description:
              "Message to render when there are no files dragged in"
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