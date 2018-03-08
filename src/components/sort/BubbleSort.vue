<template>
  <div class="bubble-sort">
    <h3>거품 정렬</h3>
    <transition-group name="flip-list" tag="ul" class="container">
      <li 
      class="item" 
      v-for="(item, i) in items" :key="item"
      :class="{focused : i === index, sorted : i > items.length - sortedIndex - 1}"
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
    <div class="option-box">
      <h4>options</h4>
      개수 : <input type="tel" v-model="count" maxlength="2"><br>
    </div>
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
      index: 0,
      sortedIndex: 0,
      count: 20,
      isRunning: false,
      autoTimer: null
    }
  },
  watch: {
    count () {
      this.reset();
      if (!this.count) return;
      this.items = shuffle(makeArray(this.count));
    }
  },
  computed: {
    getButtonName () {
      return this.isRunning ? 'stop!!' : 'auto sort';
    },
    isEnd () {
      return this.sortedIndex >= this.items.length - 1;
    }
  },
  methods: {
    reset () {
      this.clearAutoTimer();
      this.sortedIndex = 0;
      this.index = 0;
      this.isRunning = false;
    },
    sort () {
      if (this.items[this.index] > this.items[this.index + 1]) {
        this.items = changeItem(this.items, this.index, this.index + 1);
      }
      if (this.index >= this.items.length - this.sortedIndex - 2) {
        this.index = 0;
        this.sortedIndex++;
        if (this.isEnd) this.reset();
        return;
      }
      this.index++;
    },
    runAutoSort () {
      this.isRunning = true;
      this.autoTimer = this.setAutoTimer();
    },
    stopAutoSort () {
      this.isRunning = false;
      this.clearAutoTimer();
    },
    setAutoTimer () {
      let vue = this;
      return setInterval(function () {
        vue.sort();
      }, 300);
    },
    clearAutoTimer () {
      clearInterval(this.autoTimer);
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
<style scoped lang="scss">
@import "src/assets/css/color.scss";

.bubble-sort {
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
