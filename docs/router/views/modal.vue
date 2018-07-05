<style lang="scss" scoped>
</style>

<template>
  <div>
    <h3> Modal </h3>
    <p> Modals force the user to perform certain actions before continuing.</p>
    <demo :code="modalTemplate">
      <div class="s-group">
        <s-button color="primary" v-on:click.native="modal1 = true">
          Open Modal
        </s-button>
        <s-button color="primary" v-on:click.native="modal2 = true">
          Open Restricted Modal
        </s-button>
      </div>
      <s-modal v-model="modal1" :force="true">
        <h5> Modal Title </h5>
        <p>This is the content of my modal</p>
        <div class="s-group">
          <s-button color="primary" v-on:click.native="modal1 = false">
            Agree
          </s-button>
        </div>
      </s-modal>
      <s-modal v-model="modal2" :restricted="true">
        <h5> Restricted Modal Title </h5>
        <p>This is the content of my restricted modal</p>
        <div class="s-group">
          <s-button v-on:click.native="modal2 = false">
            Close
          </s-button>
          <s-button color="primary" v-on:click.native="modal2 = false">
            Submit
          </s-button>
        </div>
      </s-modal>
    </demo>
    <options :items="modalItems"></options>
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
      modal1: false,
      modal2: false,
      modalTemplate: `
<template>
  <div>
    <h3> Modal </h3>
    <p> Modals force the user to perform certain actions before continuing.</p>
    <demo :code="modalTemplate">
      <div class="s-group">
        <s-button color="primary" v-on:click.native="modal1 = true">
          Open Modal
        </s-button>
        <s-button color="primary" v-on:click.native="modal2 = true">
          Open Restricted Modal
        </s-button>
      </div>
      <s-modal v-model="modal1" :force="true">
        <h5> Modal Title </h5>
        <p>This is the content of my modal</p>
        <div class="s-group">
          <s-button color="primary" v-on:click.native="modal1 = false">
            Agree
          </s-button>
        </div>
      </s-modal>
      <s-modal v-model="modal2" :restricted="true">
        <h5> Restricted Modal Title </h5>
        <p>This is the content of my restricted modal</p>
        <div class="s-group">
          <s-button v-on:click.native="modal2 = false">
            Close
          </s-button>
          <s-button color="primary" v-on:click.native="modal2 = false">
            Submit
          </s-button>
        </div>
      </s-modal>
    </demo>
    <options :items="modalItems"></options>
  </div>  :closeable="true" :disabled="true"></s-modal>
</template>
<script>
  export default {
    data(){
      return{
        modal1: false,
        modal2: false
      }
    }
  }
<\/script>`,
      modalItems: {
        Props: [
          {
            name: "disabled",
            type: "Boolean",
            default: "false",
            required: "",
            description: "Disable interaction"
          },
          {
            name: "v-model",
            type: "Boolean",
            default: "false",
            required: "Yes",
            description: "Shows/hides the modal based on truthiness"
          },

          {
            name: "restricted",
            type: "Boolean",
            default: "false",
            required: "",
            description: "Restrict the modal to the nearest positioned ancestor"
          },
          {
            name: "force",
            type: "Boolean",
            default: "false",
            required: "",
            description:
              "User must select a section to close. Cannot close by clicking on the background or clicking on the close icon."
          }
        ],
        Slots: [
          {
            name: "",
            scope: "",
            description: "Main content to render"
          }
        ],
        Events: []
      }
    };
  }
};
</script>