<template>
  <div class="bubble-sort">
    <h3>bubble sort</h3>
    <transition-group name="flip-list" tag="ul" class="container">
      <li 
      class="item" 
      v-for="(item, i) in items" :key="item"
      :class="{focused : i === index}"
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
      count: 30,
      isAuto: false,
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
      background-color: palevioletred;
    }

    .item {
      width: 5px;
      border: 1px solid gray;
      margin-left: 5px;
    }
  }
}
</style>
