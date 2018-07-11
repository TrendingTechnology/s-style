<style lang="scss">
@import "~theme";

.app {
  &__alert {
    position: fixed;
    top: 0;
    right: $spacing * 2;
    width: 400px;
    z-index: 1;
  }
  &__sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 176px;
    padding: $spacing;
    @include set-color("grey3", "border-right", "1px solid");
  }

  &__content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 176px;
    padding: $spacing;
  }
}
</style>

<template>
  <div class="app">
    <div class="app__alert">
      <transition-group name="s-fade" tag="div">
        <s-alert v-for="alert in alerts" :key="alert.id" :color="alert.color" :text="alert.text" v-model="alert.open" :closeable="true"></s-alert>
      </transition-group>
    </div>
    <div class="app__sidebar">
      <sidebar></sidebar>
    </div>
    <div class="app__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import EventBus from "./event/bus.js";
import sidebar from "./components/sidebar.vue";

export default {
  name: "app",
  components: {
    sidebar
  },
  data() {
    return {
      alerts: [],
      alertCounter: 0
    };
  },
  mounted() {
    EventBus.$on("alert", opts => {
      this.alerts.push({
        color: opts.color,
        text: opts.text,
        open: true,
        id: ++this.alertCounter
      });

      setTimeout(() => {
        this.alerts.shift();
      }, 3000);
    });
  }
};
</script>