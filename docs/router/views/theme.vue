<style lang="scss" scoped>
@import "~theme";

.theme {
  &__color {
    float: left;
    height: 150px;
    line-height: 150px;
    width: calc(25% - #{2 * $spacing});
    margin: 0 $spacing;
    text-align: center;
  }

  &__border {
    float: left;
    height: 150px;
    line-height: 150px;
    width: calc(33% - #{2 * $spacing});
    margin: 0 $spacing;
    text-align: center;
    &--grey3 {
      @include set-color("grey3", "border", "1px solid");
    }

    &--primary {
      @include set-color("primary", "border", "1px solid");
    }
  }
}
</style>

<template>
  <div>
    <h3> Theme </h3>
    <s-alert color="primary">
      Note: Font-family of "Helvetica Neue", Helvetica, Arial, sans-serif with a default font-size of 14px and a default line-height of 28px. This can all be customized inside of variables.scss.
    </s-alert>
    <h6> Background Color </h6>
    <demo :code="backgroundTemplate">
      <div class="s-color__background--primary theme__color">
        <div class="s-color__text--text-invert"> primary </div>
      </div>
      <div class="s-color__background--success theme__color">
        <div class="s-color__text--text-invert"> success </div>
      </div>
      <div class="s-color__background--error theme__color">
        <div class="s-color__text--text-invert"> error </div>
      </div>
      <div class="s-color__background--grey1 theme__color">
        <div> grey1 </div>
      </div>
      <div class="s-color__background--grey2 theme__color">
        <div> grey2 </div>
      </div>
      <div class="s-color__background--neutral theme__color">
        <div> neutral </div>
      </div>
    </demo>
    <h6> Border Colors </h6>
    <demo :code="borderTemplate">
      <div class="theme__border theme__border--grey3">
        <div> grey3 </div>
      </div>
      <div class="theme__border theme__border--primary">
        <div> primary </div>
      </div>
    </demo>
    <h6> Text Styles </h6>
    <demo :code="textStyleTemplate">
      <h1>Heading</h1>
      <h2>Heading</h2>
      <h3>Heading</h3>
      <h4>Heading</h4>
      <h5>Heading</h5>
      <h6>Heading</h6>

      <p>This is normal text in a paragraph block</p>
      <div>This is normal text in a div block</div>

      <div class="s-label"> This is a label</div>
      <div class="s-text">This is text </div>
      <div class="s-message"> This is a message </div>
    </demo>
    <h6> Text Colors </h6>
    <demo :code="textColorTemplate">
      <div class="s-box theme__box">
        <div class="s-text s-color__text--primary">This is primary </div>
        <div class="s-text s-color__text--success">This is success </div>
        <div class="s-text s-color__text--error">This is error </div>
        <div class="s-text s-color__text--title">This is title </div>
        <div class="s-text s-color__text--label">This is label </div>
        <div class="s-text s-color__text--text">This is text </div>
        <div class="s-text s-color__text--text-invert" style="background: #000">This is text-invert </div>
      </div>
    </demo>
  </div>
</template>

<script>
import demo from "../../components/demo.vue";

export default {
  components: {
    demo
  },
  data() {
    return {
      backgroundTemplate: `
<style lang="scss" scoped>
@import "~theme";

.theme {
  &__color {
    float: left;
    height: 150px;
    line-height: 150px;
    width: calc(25% - #{2 * $spacing});
    margin: 0 $spacing;
    text-align: center;
  }
}
</style>

<template>
  <div class="s-color__background--primary theme__color">
    <div class="s-color__text--text-invert"> primary </div>
  </div>
  <div class="s-color__background--success theme__color">
    <div class="s-color__text--text-invert"> success </div>
  </div>
  <div class="s-color__background--error theme__color">
    <div class="s-color__text--text-invert"> error </div>
  </div>
  <div class="s-color__background--grey1 theme__color">
    <div> grey1 </div>
  </div>
  <div class="s-color__background--grey2 theme__color">
    <div> grey2 </div>
  </div>
  <div class="s-color__background--neutral theme__color">
    <div> neutral </div>
  </div>
</template>`,
      borderTemplate: `
<style lang="scss" scoped>
@import "~theme";

.theme {

  &__border {
    float: left;
    height: 150px;
    line-height: 150px;
    width: calc(33% - #{2 * $spacing});
    margin: 0 $spacing;
    text-align: center;
    &--grey3 {
      @include set-color("grey3", "border", "1px solid");
    }

    &--primary {
      @include set-color("primary", "border", "1px solid");
    }
  }
}
</style>

<template>
  <div class="theme__border theme__border--grey3">
    <div> grey3 </div>
  </div>
  <div class="theme__border theme__border--primary">
    <div> primary </div>
  </div>
</template>`,
      textStyleTemplate: `
<template>
  <h1>Heading</h1>
  <h2>Heading</h2>
  <h3>Heading</h3>
  <h4>Heading</h4>
  <h5>Heading</h5>
  <h6>Heading</h6>

  <p>This is normal text in a paragraph block</p>
  <div>This is normal text in a div block</div>

  <div class="s-label"> This is a label</div>
  <div class="s-text">This is text </div>
  <div class="s-message"> This is a message </div>
</template>`,
      textColorTemplate: `
<template>
  <div class="s-box theme__box">
    <div class="s-text s-color__text--primary">This is primary </div>
    <div class="s-text s-color__text--success">This is success </div>
    <div class="s-text s-color__text--error">This is error </div>
    <div class="s-text s-color__text--title">This is title </div>
    <div class="s-text s-color__text--label">This is label </div>
    <div class="s-text s-color__text--text">This is text </div>
    <div class="s-text s-color__text--text-invert" style="background: #000">This is text-invert </div>
  </div>
</template>`
    };
  }
};
</script>