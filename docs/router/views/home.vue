<style lang="scss">
@import "~theme";

.home {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &__middle {
    position: relative;
    top: calc(50% - 75px);
    height: 150px;
    margin: auto;
    text-align: center;
    overflow: auto;
  }

  &__button {
    line-height: $height * 2;
    height: $height * 2;
    width: 175px;
    font-size: 1.5em;
  }
}
</style>

<template>
  <div class="home">
    <div class="home__middle">
      <h1 class="s-color__text--primary"> Simple Style Components </h1>
      <div class="s-group">
        <a href="https://github.com/neelneelneel/s-style" target="_blank">
          <s-button class="home__button"> Github </s-button>
        </a>
        <s-button class="home__button" color="primary" v-on:click.native="$router.push('Setup')"> Get Started </s-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>