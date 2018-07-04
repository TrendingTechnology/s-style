<style lang="scss">
@import "~theme";

.install {
}
</style>

<template>
  <div>
    <h3> Installation </h3>
    <p> The easist way to install simple-style is to use a package manager and a bundler (Webpack). You can directly import the package into your project and begin development right away. </p>
    <pre>
      <code>
// npm
npm install simple-style

// yarn
yarn add simple-style
      </code>
    </pre>
    <p> Next, register simple-style in your entry of your vue application. Note: simple-style will try to mount directly if loaded via the index.html. </p>
    <pre>
      <code>
// entry

import Vue from 'vue'
import SimpleStyle from 's-style/dist'

Vue.use(SimpleStyle)

new Vue({
  ...
})
      </code>
    </pre>
    <h3> Single Components </h3>
    <p> If you would like to only utilize specific components, then you can do this by directly importing them. </p>
    <pre>
      <code>
// import location

import { SButton, SInput } from 's-style/dist'
      </code>
    </pre>
    <h3> Customization </h3>
    <s-alert color="primary">
      Note: When customizing, don't forget to import the raw src files!
    </s-alert>
    <p> Customizing simple-style is simple and straightforward. The component library is built off of sass, so changing the variables can give the components a new look and feel. To do this, change the alias of your configuration file to point to a new variables.scss. IE: </p>
    <pre>
      <code>
// webpack configuration 

...
  resolve: {
    alias: {
      'variables$': path.resolve(__dirname, './src/variables.scss')
      ...
    }
  }
...
      </code>
    </pre>
    <p> Default configuration of the variables.scss is below: </p>
    <pre>
      <code>
// variables.scss

$colors: (
  primary-light: lighten( #278DD3, 40% ),
  primary: #278DD3,
  primary-dark: darken( #278DD3, 5% ),
  success-light: lighten( #52CF87, 35% ),
  success: #52CF87,
  success-dark: darken( #52CF87, 5% ),
  error-light: lighten( #EB6456, 35% ),
  error: #EB6456,
  error-dark: darken( #EB6456, 5% ),
  grey1: #FAFAFA,
  grey2: #EEEEEE,
  grey3: #E7E7E7,
  grey4: #A6A6A6,
  grey5: #777777,
  neutral: #FFFFFF,
  text: #000000,
  text-invert: #FFFFFF,
  title: #000000,
  label: #2b2b2b
);
$font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
$font-size: 14px;
$font-weight: 300;
$line-height: 2;
$height: 28px;
$spacing: 8px;
$scroll-size: 8px;
      </code>
    </pre>
  </div>
</template>

<script>
export default {};
</script>