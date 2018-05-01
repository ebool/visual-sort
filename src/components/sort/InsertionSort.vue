<template>
  <div class="insertion-sort">
    <h3>삽입 정렬</h3>
    <transition-group name="flip-list" tag="ul" class="container">
      <li 
      class="item" 
      v-for="(item, i) in items" :key="item"
      :class="{focused : i === index, sorted : i < sortedCnt }"
      :style="{height: (item + 1) * 8 + 'px'}">
      </li>
    </transition-group>
    <color-explains
    :focused="true"
    :sorted="true"
    ></color-explains>
    <control-box
    :isRunning="isRunning"
    @oneStep="sort"
    @runAutoSort="runAutoSort"
    @stopAutoSort="stopAutoSort"
    @shuffle="shuffle"
    ></control-box>
  </div>
</template>

<script>
import {makeArray, shuffle, changeItem} from '@/assets/js/utils.js';
import ColorExplains from '../commons/ColorExplains.vue';
import ControlBox from '../commons/ControlBox.vue';

export default {
  components: {
    ColorExplains,
    ControlBox
  },
  data () {
    return {
      items: [],
      index: 1,
      sortedCnt: 1,
      count: 20,
      isRunning: false,
      autoTimer: null
    }
  },
  methods: {
    sort () {
      if (this.index >= this.items.length) {
        return;
      }
      let newArray = this.items.slice(0);
      let i = newArray.splice(this.index,1)[0];
      let k = this.getInsertionIndex(i);
      newArray.splice(k, 0, i);
      this.items = newArray;
      this.index++;
      this.sortedCnt++;
    },
    runAutoSort () {

    },
    stopAutoSort () {

    },
    getInsertionIndex (value) {
      let array = this.getSortedArray();
      let length = array.length;
      while (length--) {
        if (value >= array[length]) {
          return length + 1;
        }
      }
    },
    getSortedArray () {
      return this.items.slice(0, this.sortedCnt);
    },
    shuffle () {
      if (this.isRunning) {
        return;
      }
      this.reset();
      this.items = shuffle(this.items);
    }
  },
  mounted () {
    this.items = shuffle(makeArray(this.count));
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/color.scss";

.insertion-sort {
  .container {
    display: flex;
    align-items: center;
    justify-content: center;

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

    .item {
      width: 5px;
      border: 1px solid $block-border;
      margin-left: 5px;
    }
  }
}
</style>
