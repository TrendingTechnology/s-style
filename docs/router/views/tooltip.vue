<style lang="scss" scoped>
.tooltip {
  &__content {
    height: 100px;
    width: 100px;
  }

  &__target {
    float: left;
    width: calc(33% - 8px);
    height: 28px;
    margin: 4px;
  }
}
</style>

<template>
  <div>
    <h3> Tooltips </h3>
    <p> Tooltips wrap an element and uncover content when hovered over.</p>
    <s-alert color="primary">
      Note: Tooltip are appended to the body
    </s-alert>
    <demo :code="tooltipTemplate">
      <s-tooltip position="horizontal">
        <template slot="target">
          <s-button class="tooltip__target">Horizonal</s-button>
        </template>
        <template slot="content">
          <div class="tooltip__content">
            This is my content
          </div>
        </template>
      </s-tooltip>
      <s-tooltip position="auto">
        <template slot="target">
          <s-button class="tooltip__target">Auto</s-button>
        </template>
        <template slot="content">
          <div class="tooltip__content">
            This is my content
          </div>
        </template>
      </s-tooltip>
      <s-tooltip position="vertical">
        <template slot="target">
          <s-button class="tooltip__target">Vertical</s-button>
        </template>
        <template slot="content">
          <div class="tooltip__content">
            This is my content
          </div>
        </template>
      </s-tooltip>
      <s-tooltip position="NW">
        <template slot="target">
          <s-button class="tooltip__target">North West</s-button>
        </template>
        <template slot="content">
          <div class="tooltip__content">
            This is my content
          </div>
        </template>
      </s-tooltip>
      <s-tooltip position="N">
        <template slot="target">
          <s-button class="tooltip__target">North</s-button>
        </template>
        <template slot="content">
          <div class="tooltip__content">
            This is my content
          </div>
        </template>
      </s-tooltip>
      <s-tooltip position="NE">
        <template slot="target">
          <s-button class="tooltip__target">North East</s-button>
        </template>
        <template slot="content">
          <div class="tooltip__content">
            This is my content
          </div>
        </template>
      </s-tooltip>
      <s-tooltip position="W">
        <template slot="target">
          <s-button class="tooltip__target">West</s-button>
        </template>
        <template slot="content">
          <div class="tooltip__content">
            This is my content
          </div>
        </template>
      </s-tooltip>
      <div class="tooltip__target"></div>
      <s-tooltip position="E">
        <template slot="target">
          <s-button class="tooltip__target">East</s-button>
        </template>
        <template slot="content">
          <div class="tooltip__content">
            This is my content
          </div>
        </template>
      </s-tooltip>
      <s-tooltip position="SW">
        <template slot="target">
          <s-button class="tooltip__target">South West</s-button>
        </template>
        <template slot="content">
          <div class="tooltip__content">
            This is my content
          </div>
        </template>
      </s-tooltip>
      <s-tooltip position="S">
        <template slot="target">
          <s-button class="tooltip__target">South</s-button>
        </template>
        <template slot="content">
          <div class="tooltip__content">
            This is my content
          </div>
        </template>
      </s-tooltip>
      <s-tooltip position="SE">
        <template slot="target">
          <s-button class="tooltip__target">South East</s-button>
        </template>
        <template slot="content">
          <div class="tooltip__content">
            This is my content
          </div>
        </template>
      </s-tooltip>
    </demo>
    <options :items="tooltipItems"></options>
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
      tooltipTemplate: `
<template>
  <s-tooltip position="horizontal">
    <template slot="target">
      <s-button class="tooltip__target">Horizonal</s-button>
    </template>
    <template slot="content">
      <div class="tooltip__content">
        This is my content
      </div>
    </template>
  </s-tooltip>
  <s-tooltip position="auto">
    <template slot="target">
      <s-button class="tooltip__target">Auto</s-button>
    </template>
    <template slot="content">
      <div class="tooltip__content">
        This is my content
      </div>
    </template>
  </s-tooltip>
  <s-tooltip position="vertical">
    <template slot="target">
      <s-button class="tooltip__target">Vertical</s-button>
    </template>
    <template slot="content">
      <div class="tooltip__content">
        This is my content
      </div>
    </template>
  </s-tooltip>
  <s-tooltip position="NW">
    <template slot="target">
      <s-button class="tooltip__target">North West</s-button>
    </template>
    <template slot="content">
      <div class="tooltip__content">
        This is my content
      </div>
    </template>
  </s-tooltip>
  <s-tooltip position="N">
    <template slot="target">
      <s-button class="tooltip__target">North</s-button>
    </template>
    <template slot="content">
      <div class="tooltip__content">
        This is my content
      </div>
    </template>
  </s-tooltip>
  <s-tooltip position="NE">
    <template slot="target">
      <s-button class="tooltip__target">North East</s-button>
    </template>
    <template slot="content">
      <div class="tooltip__content">
        This is my content
      </div>
    </template>
  </s-tooltip>
  <s-tooltip position="W">
    <template slot="target">
      <s-button class="tooltip__target">West</s-button>
    </template>
    <template slot="content">
      <div class="tooltip__content">
        This is my content
      </div>
    </template>
  </s-tooltip>
  <div class="tooltip__target"></div>
  <s-tooltip position="E">
    <template slot="target">
      <s-button class="tooltip__target">East</s-button>
    </template>
    <template slot="content">
      <div class="tooltip__content">
        This is my content
      </div>
    </template>
  </s-tooltip>
  <s-tooltip position="SW">
    <template slot="target">
      <s-button class="tooltip__target">South West</s-button>
    </template>
    <template slot="content">
      <div class="tooltip__content">
        This is my content
      </div>
    </template>
  </s-tooltip>
  <s-tooltip position="S">
    <template slot="target">
      <s-button class="tooltip__target">South</s-button>
    </template>
    <template slot="content">
      <div class="tooltip__content">
        This is my content
      </div>
    </template>
  </s-tooltip>
  <s-tooltip position="SE">
    <template slot="target">
      <s-button class="tooltip__target">South East</s-button>
    </template>
    <template slot="content">
      <div class="tooltip__content">
        This is my content
      </div>
    </template>
  </s-tooltip>
</template>`,
      tooltipItems: {
        Props: [
          {
            name: "disabled",
            type: "Boolean",
            default: "false",
            required: "",
            description: "Disable interaction"
          },
          {
            name: "position",
            type: "String",
            default: "vertical",
            required: "",
            description: "Default position of the tooltip content"
          }
        ],
        Slots: [],
        Events: []
      }
    };
  }
};
</script>