<style lang="scss">
@import "../theme.scss";

.s-datepicker {
  &__toggle {
    @include disabled();
    position: relative;
    display: block;
    width: 100%;
    line-height: $height;
    height: $height;
    @include set-color("grey3", "border", "1px solid");
    cursor: pointer;
    user-select: none;
    outline: none;
    padding: 0 $scroll-size;

    &:hover {
      & > .s-datepicker__toggle__mark {
        @include set-color("grey5", "color");
      }
    }

    &:focus {
      @include focus(border);
    }

    &__text {
      @include set-color("text", "color");
      @include text-overflow();
      position: relative;
      height: 100%;
      width: 100%;
    }

    &__mark {
      position: absolute;
      top: 0;
      bottom: 0;
      right: $scroll-size;
      font-size: 0.875em;
      @include set-color("grey4", "color");
    }
  }

  &__content {
    position: absolute;
    z-index: 1000;
    @include transition(opacity);

    &__holder {
      width: 100%;
      height: auto;
    }
  }

  &__picker {
    width: 200px;
    @include set-color("neutral", "background");

    &__control {
      position: relative;
      display: block;
      line-height: $height;
      height: $height;
      width: 100%;
      cursor: pointer;
      text-align: center;
      font-size: 0.875em;
      @include set-color("grey3", "border-top", "1px solid");

      &__left {
        float: left;
        display: inline-block;
        height: 100%;
        width: 2.5 * $spacing;
        @include set-color("grey4", "color");
        @include set-color("grey3", "border-left", "1px solid");

        &:hover {
          @include set-color("grey1", "background");
          @include set-color("grey5", "color");
        }
      }

      &__center {
        float: left;
        display: inline-block;
        height: 100%;
        width: calc(100% - #{2 * 2.5 * $spacing});

        &:hover {
          @include set-color("grey1", "background");
        }
      }

      &__right {
        float: left;
        display: inline-block;
        height: 100%;
        width: 2.5 * $spacing;
        @include set-color("grey4", "color");
        @include set-color("grey3", "border-right", "1px solid");

        &:hover {
          @include set-color("grey1", "background");
          @include set-color("grey5", "color");
        }
      }
    }

    &__selection {
      position: relative;
      display: block;
      height: calc(100% - #{$height});
      width: 100%;
      @include set-color("grey3", "border-top", "1px solid");
      @include set-color("grey3", "border-left", "1px solid");

      &__option {
        float: left;
        display: inline-block;
        line-height: $height;
        height: $height + $spacing/2 * 2;
        padding: $spacing/2;
        width: 25%;
        cursor: pointer;
        text-align: center;
        font-size: 0.875em;
        @include text-overflow();
        @include set-color("neutral", "background");
        @include set-color("grey3", "border-right", "1px solid");
        @include set-color("grey3", "border-bottom", "1px solid");
        @include disabled();

        &:hover {
          @include set-color("grey1", "background");
        }

        &--small {
          width: (100% / 7);
        }

        &--faded {
          cursor: default;
          @include set-color("grey4", "color");

          &:hover {
            @include set-color("neutral", "background");
          }
        }

        &--selected {
          @include set-color("primary", "color");
          @include set-color("primary", "border", "1px solid");
          @include set-color("grey1", "background");
        }
      }
    }
  }
}
</style>
<template>
  <div>
    <div class="s-label" v-if="label">{{label}}</div>
    <div ref="target" :tabindex="disabled ? -1 : 0" v-on:keyup.enter="toggleContent()" v-bind:class="classObj">
      <div class="s-datepicker__toggle__text">
        <slot v-bind="{value:computedValue}">
          {{computedValue}}
        </slot>
      </div>
      <span class="s-datepicker__toggle__mark">
        <i class="fas fa-calendar-alt"></i>
      </span>
    </div>
    <div class="s-datepicker__content" ref="content">
      <div class="s-datepicker__content__holder" v-bind:style="{width: contentWidth + 'px'}">
        <div class="s-datepicker__picker">
          <div class="s-datepicker__picker__control">
            <div class="s-datepicker__picker__control__left" v-on:click="previousLevel()">
              <i class="fas fa-angle-left"></i>
            </div>
            <div class="s-datepicker__picker__control__center" v-on:click="exitLevel()">
              {{title}}
            </div>
            <div class="s-datepicker__picker__control__right" v-on:click="nextLevel()">
              <i class="fas fa-angle-right"></i>
            </div>
            <div class="s-clear"></div>
          </div>
          <div class="s-datepicker__picker__selection">
            <div v-if="level === 'day'">
              <div v-bind:title="w.name" class="s-datepicker__picker__selection__option s-datepicker__picker__selection__option--small s-datepicker__picker__selection__option--faded" v-for="(w, wIdx) in week" :key="wIdx">
                {{w.abbreviation}}
              </div>
            </div>
            <div v-if="level === 'day'">
              <div v-bind:title="item.title" class="s-datepicker__picker__selection__option s-datepicker__picker__selection__option--small" v-bind:class="{'s-datepicker__picker__selection__option--selected': (item.year === year && item.month === month && item.day === day), 's-datepicker__picker__selection__option--faded': (item.year !== renderedYear || item.month !== renderedMonth)}" v-on:click="enterLevel(item.year, item.month, item.day)" v-for="(item, itemIdx) in items" :key="itemIdx">
                {{item.display}}
              </div>
            </div>
            <div v-if="level === 'month'">
              <div v-bind:title="item.title" class="s-datepicker__picker__selection__option" v-bind:class="{'s-datepicker__picker__selection__option--selected': (item.year === year && item.month === month)}" v-on:click="enterLevel(item.year, item.month, 1)" v-for="(item, itemIdx) in items" :key="itemIdx">
                {{item.display}}
              </div>
            </div>
            <div v-if="level === 'year'">
              <div v-bind:title="item.title" class="s-datepicker__picker__selection__option" v-bind:class="{'s-datepicker__picker__selection__option--selected': (item.year === year)}" v-on:click="enterLevel(item.year,0 ,1)" v-for="(item, itemIdx) in items" :key="itemIdx">
                {{item.display}}
              </div>
            </div>
            <div class="s-clear"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Input from "../mixins/input.js";
import Popover from "../mixins/popover.js";
import Utility from "../utility.js";

export default {
  name: "s-datepicker",
  mixins: [Input, Popover],
  computed: {
    classObj: function() {
      const classObj = {
        "s-datepicker__toggle": true,
        "s-datepicker__toggle--disabled": this.disabled
      };

      return classObj;
    },
    computedValue: function() {
      return this.value;
    }
  },
  props: {
    position: {
      type: String,
      default: "vertical"
    }
  },
  data() {
    return {
      day: undefined,
      month: undefined,
      year: undefined,
      level: "day",
      title: "",
      items: [],
      week: Utility.constants.week,
      renderedMonth: undefined,
      renderedYear: undefined,
      contentWidth: 0,
      popoverDelay: 0
    };
  },
  methods: {
    /**
     * @name documentClick
     * @desc hide the content if the document is clicked (not on the target or content)
     * @param {event} event - dom event
     * @returns {void}
     */
    documentClick(event) {
      // ignore if it is on the target (bubbling)
      if (
        event &&
        event.target &&
        (this.$refs.target.contains(event.target) ||
          this.$refs.content.contains(event.target))
      ) {
        return;
      }

      this.hideContent();
    },
    /**
     * @name documentAction
     * @desc trigger to add or remove listeners on the document
     * @param {boolean} add - should we add a document listener?
     * @returns {void}
     */
    documentAction(add) {
      if (add) {
        document.addEventListener("click", this.documentClick);
      } else {
        document.removeEventListener("click", this.documentClick);
      }
    },
    /**
     * @name targetAction
     * @desc trigger to add or remove listeners on the target
     * @param {boolean} add - should we add a target listener?
     * @returns {void}
     */
    targetAction(add) {
      if (add) {
        this.$refs.target.addEventListener("click", this.toggleContent);
      } else {
        this.$refs.target.removeEventListener("click", this.toggleContent);
      }
    },
    /**
     * @name setContentWidth
     * @desc set the widget of the content based on the target
     * @returns {void}
     */
    setContentWidth() {
      this.contentWidth = this.$refs.target.getBoundingClientRect().width;
    },
    /**
     * @name buildPicker
     * @desc build (or rebuild) the picker whenever activated.
     * @returns {void}
     */
    buildPicker() {
      let date = new Date(this.value);

      // if the date is not valid set it to today's date
      if (!Utility.helpers.isDate(date)) {
        console.error("Not valid");
        date = new Date();
      } else {
        this.day = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear();
      }

      this.renderedMonth = date.getMonth();
      this.renderedYear = date.getFullYear();

      this.renderLevel();
    },
    /**
     * @name renderLevel
     * @desc set the items for the current level
     * @returns {void}
     */
    renderLevel() {
      //TODO: validate w/ minimum + maximum date ranges
      this.items = [];
      if (this.level === "day") {
        const currentMonthObj = Utility.constants.month[this.renderedMonth];
        this.title = currentMonthObj.abbreviation + " " + this.renderedYear;

        //add any buffer days
        const firstDateObj = new Date(this.renderedYear, this.renderedMonth, 1),
          firstDateDay = firstDateObj.getDay();

        if (0 < firstDateDay) {
          // get the previously rendered month
          let previousMonth, previousYear;
          if (this.renderedMonth === 0) {
            previousMonth = Utility.constants.month.length - 1;
            previousYear = this.renderedYear - 1;
          } else {
            previousMonth = this.renderedMonth - 1;
            previousYear = this.renderedYear;
          }

          const previousMonthObj = Utility.constants.month[previousMonth];
          let previousMonthLength = previousMonthObj.length;

          // leapyear check
          if (previousMonth === 1 && Utility.helpers.isLeapYear(previousYear)) {
            previousMonthLength++;
          }

          for (
            let b = previousMonthLength - firstDateDay + 1;
            b <= previousMonthLength;
            b++
          ) {
            this.items.push({
              title: previousMonthObj.name + " " + b + ", " + previousYear,
              display: b,
              year: previousYear,
              month: previousMonth,
              day: b
            });
          }
        }

        // add the days of the current rendered month
        // leapyear check
        let currentMonthLength = currentMonthObj.length;
        if (
          this.renderedMonth === 1 &&
          Utility.helpers.isLeapYear(this.renderedYear)
        ) {
          currentMonthLength++;
        }

        for (let d = 1; d <= currentMonthLength; d++) {
          this.items.push({
            title: currentMonthObj.name + " " + d + ", " + this.renderedYear,
            display: d,
            year: this.renderedYear,
            month: this.renderedMonth,
            day: d
          });
        }

        if (0 < this.items.length % 7) {
          // get the next month
          let nextMonth, nextYear;
          if (this.renderedMonth === 11) {
            nextMonth = 0;
            nextYear = this.renderedYear + 1;
          } else {
            nextMonth = this.renderedMonth + 1;
            nextYear = this.renderedYear;
          }

          const nextMonthObj = Utility.constants.month[nextMonth];

          for (let b = 1, bLen = 7 - this.items.length % 7; b <= bLen; b++) {
            this.items.push({
              title: nextMonthObj.name + " " + b + ", " + nextYear,
              display: b,
              year: nextYear,
              month: nextMonth,
              day: b
            });
          }
        }
      } else if (this.level === "month") {
        this.title = this.renderedYear;
        for (
          let mIdx = 0, mLen = Utility.constants.month.length;
          mIdx < mLen;
          mIdx++
        ) {
          this.items.push({
            title: Utility.constants.month[mIdx].name + " " + this.renderedYear,
            display: Utility.constants.month[mIdx].abbreviation,
            year: this.renderedYear,
            month: mIdx
          });
        }
      } else if (this.level === "year") {
        this.title = "";

        const min = this.renderedYear - 5;
        const max = min + 11;
        for (let y = min; min <= y && y <= max; y++) {
          this.items.push({
            title: y,
            display: y,
            year: y
          });
        }
      }
    },
    /**
     * @name nextLevel
     * @desc go to the next part of the current level and set the items
     * @returns {void}
     */
    nextLevel() {
      let renderedMonth = this.renderedMonth,
        renderedYear = this.renderedYear;

      if (this.level === "day") {
        if (renderedMonth === 11) {
          renderedMonth = 0;
          renderedYear++;
        } else {
          renderedMonth++;
        }
      } else if (this.level === "month") {
        renderedYear++;
      } else if (this.level === "year") {
        renderedYear += 12;
      }

      this.renderedMonth = renderedMonth;
      this.renderedYear = renderedYear;

      this.renderLevel();
    },
    /**
     * @name previousLevel
     * @desc go to the previous part of the current level and set the items
     * @returns {void}
     */
    previousLevel() {
      let renderedMonth = this.renderedMonth,
        renderedYear = this.renderedYear;

      if (this.level === "day") {
        if (renderedMonth === 0) {
          renderedMonth = Utility.constants.month.length - 1;
          renderedYear--;
        } else {
          renderedMonth--;
        }
      } else if (this.level === "month") {
        renderedYear--;
      } else if (this.level === "year") {
        renderedYear -= 12;
      }

      this.renderedMonth = renderedMonth;
      this.renderedYear = renderedYear;

      this.renderLevel();
    },
    /**
     * @name exitLevel
     * @desc exit the current level and set the items
     * @returns {void}
     */
    exitLevel() {
      if (this.level === "year") {
        return;
      }
      if (this.level === "day") {
        this.day = 1;
        this.level = "month";
      } else if (this.level === "month") {
        this.month = 0;
        this.level = "year";
      }

      this.renderLevel();
      this.changeDatepicker();
    },
    /**
     * @name enterLevel
     * @desc select the day, and the month, and enter the next level
     * @param {number} year - selected year
     * @param {number} month - selected month
     * @param {number} day - selected day
     * @returns {void}
     */
    enterLevel(year, month, day) {
      this.year = year;
      this.month = month;
      this.day = day;
      this.renderedYear = year;
      this.renderedMonth = month;

      if (this.level === "day") {
        this.changeDatepicker();
        this.hideContent();
        return;
      }

      if (this.level === "month") {
        this.level = "day";
      } else if (this.level === "year") {
        this.level = "month";
      }

      this.renderLevel();
      this.changeDatepicker();
    },
    /**
     * @name changeDatepicker
     * @desc trigger a change in the model
     * @returns {void}
     */
    changeDatepicker() {
      if (
        Utility.helpers.isDefined(this.month) &&
        Utility.helpers.isDefined(this.day) &&
        Utility.helpers.isDefined(this.year)
      ) {
        let val = this.month + 1 + "/" + this.day + "/" + this.year;

        this.input(val, {
          type: "replace",
          value: val
        });
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.setContentWidth);

    this.setContentWidth();

    this.$on("show", this.buildPicker);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setContentWidth);
  }
};
</script>
