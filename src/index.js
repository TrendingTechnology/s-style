// normalize
import 'normalize.css'

// font awesome
import '@fortawesome/fontawesome-free/scss/fontawesome.scss'
import '@fortawesome/fontawesome-free/scss/fa-solid.scss'

// base styles
import './base.scss'

// constants
import Utility from './utility.js'

// Components
import SButton from './components/s-button.vue'
import SInput from './components/s-input.vue'
import STextarea from './components/s-textarea.vue'
import SCheckbox from './components/s-checkbox.vue'
import SRadio from './components/s-radio.vue'
import SScroll from './components/s-scroll.vue'
import SList from './components/s-list.vue'
import SChecklist from './components/s-checklist.vue'
import SPopover from './components/s-popover.vue'
import STooltip from './components/s-tooltip.vue'
import SDropdown from './components/s-dropdown.vue'
import SToggle from './components/s-toggle.vue'
import SSlider from './components/s-slider.vue'
import SAccordion from './components/s-accordion.vue'
import SAccordionItem from './components/s-accordion-item.vue'
import SBlock from './components/s-block.vue'
import STabs from './components/s-tabs.vue'
import SAlert from './components/s-alert.vue'
import SModal from './components/s-modal.vue'
import SDatepicker from './components/s-datepicker.vue'
import SFile from './components/s-file.vue'
import SColorpicker from './components/s-colorpicker.vue'

// Plugin
class SimpleStyle {
  static install(Vue) {
    Vue.component('s-button', SButton)
    Vue.component('s-input', SInput)
    Vue.component('s-textarea', STextarea)
    Vue.component('s-checkbox', SCheckbox)
    Vue.component('s-radio', SRadio)
    Vue.component('s-scroll', SScroll)
    Vue.component('s-list', SList)
    Vue.component('s-checklist', SChecklist)
    Vue.component('s-popover', SPopover)
    Vue.component('s-tooltip', STooltip)
    Vue.component('s-dropdown', SDropdown)
    Vue.component('s-toggle', SToggle)
    Vue.component('s-slider', SSlider)
    Vue.component('s-accordion', SAccordion)
    Vue.component('s-accordion-item', SAccordionItem)
    Vue.component('s-block', SBlock)
    Vue.component('s-tabs', STabs)
    Vue.component('s-alert', SAlert)
    Vue.component('s-modal', SModal)
    Vue.component('s-datepicker', SDatepicker)
    Vue.component('s-file', SFile)
    Vue.component('s-colorpicker', SColorpicker)
  }
}

export {
  SButton,
  SInput,
  STextarea,
  SCheckbox,
  SScroll,
  SList,
  SChecklist,
  SPopover,
  STooltip,
  SDropdown,
  SToggle,
  SSlider,
  SAccordion,
  SAccordionItem,
  SBlock,
  STabs,
  SAlert,
  SModal,
  SDatepicker,
  SFile,
  SColorpicker
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SimpleStyle);
}

export default SimpleStyle;