const Popover = {
  name: "",
  components: {},
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "S"
    },
    spacing: {
      type: Number,
      default: 4
    }
  },
  computed: {
    classObj: function () { }
  },
  data() {
    return {
      popoverVisible: false,
      popoverDelay: 300,
      popoverTimeout: undefined
    };
  },
  methods: {
    /**
     * @name documentAction
     * @desc trigger to add or remove listeners on the document
     * @param {boolean} add - should we add a document listener?
     * @returns {void}
     */
    documentAction(add) { },
    /**
     * @name targetAction
     * @desc trigger to add or remove listeners on the target
     * @param {boolean} add - should we add a target listener?
     * @returns {void}
     */
    targetAction(add) { },
    /**
     * @name toggleContent
     * @desc toggle the content to be open or close
     * @returns {void}
     */
    toggleContent() {
      if (this.disabled) {
        this.hideContent();
        return;
      }

      if (this.popoverVisible) {
        this.hideContent();
      } else {
        this.showContent();
      }
    },
    /**
     * @name showContent
     * @desc show the content
     * @param {event} event - dom event
     * @returns {void}
     */
    showContent(event) {
      this.popoverVisible = true;

      this.addContent();

      this.documentAction(true);
      window.addEventListener("resize", this.positionContent)
      document.addEventListener("scroll", this.positionContent, true);

      this.$emit('show')
    },
    /**
     * @name hideContent
     * @desc hide the content
     * @param {event} event - dom event
     * @returns {void}
     */
    hideContent(event) {
      this.popoverVisible = false;

      this.removeContent();

      this.documentAction(false);
      document.removeEventListener("scroll", this.positionContent, true);

      this.$emit('hide')
    },
    /**
     * @name addContent
     * @desc actually add the content to the view
     * @returns {void}
     */
    addContent() {
      // we want to hide it, but add it to the dom to get its height and width
      this.$refs.content.style.visibility = "hidden";
      this.$refs.content.style.opacity = "0";

      document.body.appendChild(this.$refs.content);

      if (this.popoverTimeout) {
        clearTimeout(this.popoverTimeout);
      }

      this.popoverTimeout = setTimeout(() => {
        this.positionContent();

        this.$refs.content.style.visibility = "visible";
        this.$refs.content.style.opacity = "1";
      }, this.popoverDelay);

    },
    /**
     * @name positionContent
     * @desc position the content to the view. Triggered when the view is scrolled or resized
     * @returns {void}
     */
    positionContent() {
      const targetRect = this.$refs.target.firstElementChild.getBoundingClientRect();
      const contentRect = this.$refs.content.getBoundingClientRect();

      let pos;
      if (
        this.position === "auto" ||
        this.position === "vertical" ||
        this.position === "horizontal"
      ) {
        const containerRect = document.body.getBoundingClientRect();
        const positionMappings = {
          auto: ["S", "N", "E", "W", "NE", "SE", "SW", "NW"],
          vertical: ["S", "N",],
          horizontal: ["E", "W"]
        };
        let calculatedPositions = {};
        for (let position of positionMappings[this.position]) {
          calculatedPositions[position] = {
            count: 0,
            pos: this.calculatePosition(position, targetRect, contentRect)
          };

          if (
            calculatedPositions[position].pos.top >=
            containerRect.top + window.pageYOffset
          ) {
            calculatedPositions[position].count++;
          }

          if (
            calculatedPositions[position].pos.right <=
            containerRect.left + containerRect.width + window.pageXOffset
          ) {
            calculatedPositions[position].count++;
          }

          if (
            calculatedPositions[position].pos.bottom <=
            containerRect.top + containerRect.height + window.pageYOffset
          ) {
            calculatedPositions[position].count++;
          }

          if (
            calculatedPositions[position].pos.left >=
            containerRect.left + window.pageXOffset
          ) {
            calculatedPositions[position].count++;
          }

          if (calculatedPositions[position].pos.top >= window.pageYOffset) {
            calculatedPositions[position].count++;
          }

          if (
            calculatedPositions[position].pos.right <=
            window.innerWidth + window.pageXOffset
          ) {
            calculatedPositions[position].count++;
          }

          if (
            calculatedPositions[position].pos.bottom <=
            window.innerHeight + window.pageYOffset
          ) {
            calculatedPositions[position].count++;
          }

          if (calculatedPositions[position].pos.left >= window.pageXOffset) {
            calculatedPositions[position].count++;
          }

          // perfect match!
          if (calculatedPositions[position].count === 8) {
            break;
          }
        }

        let iteration = 8;
        while (0 <= iteration && iteration <= 8 && !pos) {
          for (let position of positionMappings[this.position]) {
            if (calculatedPositions[position].count === iteration) {
              pos = calculatedPositions[position].pos;
              break;
            }
          }

          iteration--;
        }
      } else {
        pos = this.calculatePosition(this.position, targetRect, contentRect);
      }

      this.$refs.content.style.top = pos.top + "px";
      this.$refs.content.style.left = pos.left + "px";
    },
    /**
     * @name removeContent
     * @desc actually remove the content from the view
     * @returns {void}
     */
    removeContent() {
      if (this.$refs.content && this.$refs.content.parentNode !== null) {
        this.$refs.content.parentNode.removeChild(this.$refs.content);
      }
    },
    /**
     * @name calculatePosition
     * @desc calculate the position of the content
     * @param {string} position - position to calculate for N, NE, E, SE, S, SW, W, NW
     * @param {object} targetRect - target rect
     * @param {object} contentRect - content rect
     * @returns {void}
     */
    calculatePosition(position, targetRect, contentRect) {
      let topPos, leftPos;
      //position top
      if (position === "NW" || position === "N" || position === "NE") {
        topPos =
          window.pageYOffset +
          targetRect.top -
          contentRect.height -
          this.spacing;
      } else if (position === "E" || position === "W") {
        topPos =
          window.pageYOffset +
          targetRect.top +
          targetRect.height / 2 -
          contentRect.height / 2;
      } else if (position === "SE" || position === "S" || position === "SW") {
        topPos =
          window.pageYOffset +
          targetRect.top +
          targetRect.height +
          this.spacing;
      }

      //position left
      if (position === "NW" || position === "W" || position === "SW") {
        leftPos =
          window.pageXOffset +
          targetRect.left -
          contentRect.width -
          this.spacing;
      } else if (position === "N" || position === "S") {
        leftPos =
          window.pageXOffset +
          targetRect.left +
          targetRect.width / 2 -
          contentRect.width / 2;

      } else if (position === "NE" || position === "E" || position === "SE") {
        leftPos =
          window.pageXOffset +
          targetRect.left +
          targetRect.width +
          this.spacing;
      }

      return {
        top: topPos,
        right: leftPos + contentRect.width,
        bottom: topPos + contentRect.height,
        left: leftPos
      };
    }
  },
  mounted() {
    if (!(this.$slots.target || this.$refs.target)) {
      console.error(this.$options.name + " requires a target");
    }

    if (!(this.$slots.content || this.$refs.content)) {
      console.error(this.$options.name + " requires content");
    }

    // hide initial
    this.removeContent();

    // add the event to the target
    this.targetAction(true);
  },
  beforeDestroy() {
    // add the event to the target
    this.targetAction(false);
    this.documentAction(false);
    window.removeEventListener("resize", this.positionContent)
    document.removeEventListener("scroll", this.positionContent, true);
  }
};

export default Popover