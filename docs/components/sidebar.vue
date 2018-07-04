<style lang="scss" scoped>
@import "~theme";

.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  @include set-color("grey1", "background");

  &__header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    font-size: 1.25em;
    height: 2 * $height;
    line-height: 2 * $height;
    padding: 0 2 * $spacing;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    @include set-color("primary", "background");
    @include set-color("text-invert", "color");
  }

  &__menu {
    position: absolute;
    top: 2 * $height;
    right: 0;
    bottom: 0;
    left: 0;

    &__label {
      font-size: 1em;
      @include text-overflow();
      @include set-color("title", "color");
      font-weight: bold;
      position: relative;
      display: block;
      width: 100%;
      height: $height;
      line-height: $height;
      padding: 0 2 * $spacing;
    }

    &__item {
      @include text-overflow();
      @include disabled();
      position: relative;
      display: block;
      width: 100%;
      height: $height;
      line-height: $height;
      margin-top: 0.5 * $spacing;
      margin-bottom: 0.5 * $spacing;
      padding-right: 2 * $spacing;
      padding-left: 3 * $spacing;
      @include set-color("text", "color");
      cursor: pointer;
      width: 100%;
      text-decoration: none;
      border-left: 4px solid transparent;

      &:hover {
        @include set-color("neutral", "background");
      }

      &.router-link-active {
        @include set-color("primary", "border-left", "4px solid");
        @include set-color("primary", "color");
      }
    }
  }
}
</style>

<template>
  <div class="sidebar">
    <router-link class="sidebar__header" to="/">
      simple-style
    </router-link>
    <div class="sidebar__menu">
      <s-scroll :staticX="true">
        <div v-if="route.name" v-for="(route, index) in routes" :key="index">
          <div class="sidebar__menu__label">
            {{route.name}}
          </div>
          <router-link class="sidebar__menu__item" v-for="(routeChild, index) in route.children" :key="index" :to="routeChild.path">
            {{routeChild.name}}
          </router-link>
        </div>
      </s-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  created() {
    this.$router.options.routes.forEach(route => {
      let routeObj = {
        path: route.path,
        name: route.name,
        children: []
      };

      if (route.hasOwnProperty("children")) {
        route.children.map(routeChild => {
          routeObj.children.push({
            path: route.path + "/" + routeChild.path,
            name: routeChild.name
          });
        });
      }

      this.routes.push(routeObj);
    });
  },
  data() {
    return {
      routes: []
    };
  }
};
</script>