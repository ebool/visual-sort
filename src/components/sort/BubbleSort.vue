<template>
  <div class="bubble-sort">
    <sort-visualization
    :list="items"
    :isSorted="(i) => {return i > items.length - sortedIndex - 1}"
    :isFocused="(i) => {return i === index}"
    ></sort-visualization>
    <color-explains
    :focused="true"
    :sorted="true"
    ></color-explains>
    <control-box
    :isRunning="isRunning"
    :next="sort"
    :auto="isRunning ? stopAutoSort : runAutoSort"
    :shuffle="shuffle"
    ></control-box>
    <div class="option-box">
      <h4>options</h4>
      개수 : <input type="tel" v-model="count" maxlength="2"><br>
    </div>
  </div>
</template>

<script>
import {makeArray, shuffle, changeItem} from '@/assets/js/utils.js';
import SortVisualization from './commons/SortVisualization.vue';
import ColorExplains from './commons/ColorExplains.vue';
import ControlBox from './commons/ControlBox.vue';

export default {
  components: {
    ColorExplains,
    ControlBox,
    SortVisualization
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
</style>
