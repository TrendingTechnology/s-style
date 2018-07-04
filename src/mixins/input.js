const Input = {
  name: "",
  components: {},
  props: {
    label: {
      type: String,
      value: ""
    },
    placeholder: {
      type: String,
      default: "Enter a value"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    inputDelay: {
      type: Number,
      default: -1
    }
  },
  computed: {
    classObj: function () { }
  },
  data() {
    return {
      inputTimeout: undefined
    };
  },
  methods: {
    /**
     * @name input
     * @desc emit a message to update the value bound to v-model.
     * @param {*} val - value to update
     * @param {object} delta - delta showing the difference and what was modified
     * @returns {void}
     */
    input(val, delta) {
      if (this.inputDelay < 0) {
        this.$emit("input", val, delta);
        return;
      }

      if (this.inputTimeout) {
        clearTimeout(this.inputTimeout);
      }

      this.inputTimeout = setTimeout(() => {
        this.$emit("input", val, delta);
      }, this.inputDelay);
    }
  }
};

export default Input