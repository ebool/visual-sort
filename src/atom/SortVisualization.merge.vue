<template>
  <ul tag="ul" class="viz-box">
    <li
      class="item"
      v-for="(item, idx) in list" :key="idx"
      :class="{
        focused : isFocused({idx, item}),
        sorted : isSorted({idx, item}),
        selected : isSelected({idx, item}),
        dismiss : isDismiss({idx, item}),
        'left-side': isLeft({idx, item}),
        'right-side': isRight({idx, item})
      }"
      :style="{height: (item + 1) * 10 + 'px'}">
    </li>
  </ul>
  <!--<transition-group tag="ul" class="viz-box">-->
    <!--<li-->
    <!--class="item"-->
    <!--v-for="(item, idx) in list" :key="idx"-->
    <!--:class="{-->
      <!--focused : isFocused({idx, item}),-->
      <!--sorted : isSorted({idx, item}),-->
      <!--selected : isSelected({idx, item}),-->
      <!--dismiss : isDismiss({idx, item}),-->
      <!--'left-side': isLeft({idx, item}),-->
      <!--'right-side': isRight({idx, item})-->
    <!--}"-->
    <!--:style="{height: (item + 1) * 10 + 'px'}">-->
    <!--</li>-->
  <!--</transition-group>-->
</template>

<script>
export default {
  props: {
    isSorted: {
      type: Function,
      default: () => {return false}
    },
    isFocused: {
      type: Function,
      default: () => {return false}
    },
    isSelected: {
      type: Function,
      default: () => {return false}
    },
    isDismiss: {
      type: Function,
      default: () => {return false}
    },
    isLeft: {
      type: Function,
      default: () => {return false}
    },
    isRight: {
      type: Function,
      default: () => {return false}
    }
  },
  computed: {
    list () { return this.$store.getters.currentStep.list; }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/color.scss";
.viz-box {
  display: flex;
  justify-content: center;
  margin: 0 0 30px 0;
  min-height: 150px;

  li {
    list-style: none;
  }
  .focused {
    background-color: $focused;
    border: 0 !important;
  }
  .sorted {
    background-color: $sorted;
    border: 0 !important;
  }
  .selected {
    border: 2px solid $selected !important;
  }
  .dismiss {
    display: none;
  }

  .left-side {
    background-color: #80cbc4;
    border: 0 !important;
  }
  .right-side {
    background-color: #ffcc80;
    border: 0 !important;
  }

  .item {
    transition: background-color .3s, transform .3s;
    width: 15px;
    border: 1px solid $block-border;
    margin-left: 5px;
    margin-top: auto;
  }
}
</style>
