<template>
  <transition-group tag="ul" class="viz-box" name="move" mode="out-in">
    <li 
    class="item" 
    v-for="(item, i) in list" :key="item"
    :class="{focused : isFocused(i), sorted : isSorted(i), selected : isSelected(i)}"
    :style="{height: (item + 1) * 10 + 'px'}">
    </li>
  </transition-group>
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
  align-items: baseline;
  justify-content: center;
  margin: 30px 0px;
  min-height: 150px;

  li {
    list-style: none;
  }
  .focused {
    background-color: $focused !important;
    border: 0px !important;
  }
  .sorted {
    background-color: $sorted;
    border: 0px !important;
  }
  .selected {
    border: 2px solid $selected !important;
  }

  .item {
    transition: background-color .3s, transform .3s;
    width: 15px;
    border: 1px solid $block-border;
    margin-left: 5px;
  }
}
.move-enter-active.focused, .move-move.focused, .move-enter.focused {
  transform: translateY(-60px);
}
</style>
