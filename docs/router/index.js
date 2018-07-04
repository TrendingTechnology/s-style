import Vue from 'vue'
import VueRouter from 'vue-router'

// Views
import home from './views/home.vue'

import install from './views/install.vue'

import theme from './views/theme.vue'

import accordion from './views/accordion.vue'
import alert from './views/alert.vue'
import block from './views/block.vue'
import button from './views/button.vue'
import checkbox from './views/checkbox.vue'
import checklist from './views/checklist.vue'
import dropdown from './views/dropdown.vue'
import input from './views/input.vue'
import list from './views/list.vue'
import modal from './views/modal.vue'
import radio from './views/radio.vue'
import scroll from './views/scroll.vue'
import slider from './views/slider.vue'
import tabs from './views/tabs.vue'
import textarea from './views/textarea.vue'
import toggle from './views/toggle.vue'
import tooltip from './views/tooltip.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: home
    },
    {
      name: 'Setup',
      path: '/setup',
      component: { template: '<router-view/>' },
      redirect: '/setup/install',
      children: [
        {
          name: 'Install',
          path: 'install',
          component: install
        },
      ]
    },
    {
      name: 'Style',
      path: '/style',
      component: { template: '<router-view/>' },
      redirect: '/style/theme',
      children: [
        {
          name: 'Theme',
          path: 'theme',
          component: theme
        }
      ]
    },
    {
      name: 'Components',
      path: '/components',
      component: { template: '<router-view/>' },
      redirect: '/components/accordion',
      children: [
        {
          name: 'Accordion',
          path: 'accordion',
          component: accordion
        },
        {
          name: 'Alert',
          path: 'alert',
          component: alert
        },
        {
          name: 'Block',
          path: 'block',
          component: block
        },
        {
          name: 'Button',
          path: 'button',
          component: button
        },
        {
          name: 'Checkbox',
          path: 'checkbox',
          component: checkbox
        },
        {
          name: 'Checklist',
          path: 'checklist',
          component: checklist
        },
        {
          name: 'Dropdown',
          path: 'dropdown',
          component: dropdown
        },
        {
          name: 'Input',
          path: 'input',
          component: input
        },
        {
          name: 'List',
          path: 'list',
          component: list
        },
        {
          name: 'Modal',
          path: 'modal',
          component: modal
        },
        {
          name: 'Radio',
          path: 'radio',
          component: radio
        },
        {
          name: 'Scroll',
          path: 'scroll',
          component: scroll
        },
        {
          name: 'Slider',
          path: 'slider',
          component: slider
        },
        {
          name: 'Tabs',
          path: 'tabs',
          component: tabs
        },
        {
          name: 'Textarea',
          path: 'textarea',
          component: textarea
        },
        {
          name: 'Toggle',
          path: 'toggle',
          component: toggle
        },
        {
          name: 'Tooltip',
          path: 'tooltip',
          component: tooltip
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

