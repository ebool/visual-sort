<template>
  <div class="selection-sort">
    <sort-visualization
    :list="items"
    :isFocused="(i) => {return i === index}"
    :isSorted="(i) => {return i < sortedIndex}"
    :isSelected="(i) => {return i === smallest}"
    >
    </sort-visualization>
    <color-explains
    :focused="true"
    :sorted="true"
    :selected="true"
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
      autoTimer: null,
      smallest: 0
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
      this.smallest = 0;
    },
    sort () {
      if (this.isEnd) {
        this.reset();
        return;
      }
      if (this.items[this.index + 1] < this.items[this.smallest]) {
        this.smallest = this.index + 1;
      }
      if (this.count - 1 <= this.index) {
        this.items = changeItem(this.items, this.sortedIndex, this.smallest)
        this.sortedIndex++;
        this.smallest = this.sortedIndex;
        this.index = this.sortedIndex;
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
@import 'src/assets/css/color.scss';

.selection-sort {
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
      background-color: $focused !important;
    }
    .sorted {
      background-color: $sorted;
    }
    

    .item {
      width: 8px;
      border: 1px solid $block-border;
      margin-left: 5px;
      box-sizing: border-box;
    }
  }
}
</style>
