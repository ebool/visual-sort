<template>
  <transition-group name="flip-list" tag="ul" class="viz-box">
    <li 
    class="item" 
    v-for="(item, i) in list" :key="item"
    :class="{focused : isFocused(i), sorted : isSorted(i), selected : isSelected(i)}"
    :style="{height: (item + 1) * 6 + 'px'}">
    </li>
  </transition-group>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    },
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
  methods: {
    default () {
      return false;
    }
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

  .flip-list-move {
    transition: transform .3s;
  }

  li {
    list-style: none;
  }
  .focused {
    background-color: $focused;
  }
  .sorted {
    background-color: $sorted;
  }
  .selected {
    border: 2px solid $selected !important;
  }

  .item {
    width: 10px;
    border: 1px solid $block-border;
    margin-left: 5px;
  }
}
</style>
