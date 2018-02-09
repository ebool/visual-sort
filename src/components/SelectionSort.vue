<template>
  <div class="selection-sort">
    <h3>Selection Sort</h3>
    <h3>smallest - index:{{smallest}}, value:{{items[smallest]}}</h3>
    <h3>index : {{index}}</h3>
    <transition-group name="flip-list" tag="ul" class="container">
      <li 
      class="item"
      v-for="(item, i) in items" :key="item"
      :class="{focused : i === index, selected : i === smallest, sorted : i < sortedIndex}"
      :style="{height: (item + 1) * 8 + 'px'}">
      </li>
    </transition-group>
    <div class="control-box">
      <h4>sort button</h4>
      <button @click="sort">1 step</button>
      <button @click="autoSort">{{getButtonName}}</button>
      <button @click="shuffle">shuffle!!!!</button>
    </div>
    <div class="option-box">
      <h4>options</h4>
      개수 : <input type="tel" v-model="count" maxlength="2"><br>
    </div>
  </div>
</template>

<script>
import {makeArray, shuffle, changeItem} from '@/assets/js/utils.js'

export default {
  data () {
    return {
      items: [],
      index: 0,
      sortedIndex: 0,
      count: 20,
      isAuto: false,
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
      return this.isAuto ? 'stop!!' : 'auto sort';
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
      this.isAuto = false;
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
    autoSort () {
      if (this.isAuto) {
        this.isAuto = false;
        this.clearAutoTimer();
      } else {
        this.isAuto = true;
        this.autoTimer = this.setAutoTimer();
      }
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
      if (this.isAuto) {
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
    .selected {
      background-color: $selected;
    }

    .item {
      width: 5px;
      border: 1px solid $block-border;
      margin-left: 5px;
    }
  }
}
</style>
