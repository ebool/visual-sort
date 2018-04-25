<template>
  <div class="bubble-sort">
    <sort-visualization
    :list="getList"
    :isSorted="(i) => {return i > getList.length - currentStep.sorted - 1}"
    :isFocused="(i) => {return i === currentStep.focused || i === currentStep.focused + 1}"
    ></sort-visualization>
    <div class="explain">{{explains[`${currentStep.type}`]}}</div>
    <progress-bar :max="scenarioLength - 1" @input="changeStep" :step="step"></progress-bar>
    <control-box
    :back="back"
    :next="next"
    :run="run"
    :stop="clearAutoTimer"
    :shuffle="reset"
    :isRunning="isRunning"
    :isEnd="currentStep.type === '3'"
    ></control-box>
  </div>
</template>

<script>
import {makeArray, shuffle, copy} from '@/assets/js/utils.js';
import SortVisualization from './commons/SortVisualization.vue';
import ProgressBar from './commons/ProgressBar.vue';
import ControlBox from './commons/ControlBox2.vue';

export default {
  components: {
    SortVisualization,
    ProgressBar,
    ControlBox
  },
  data () {
    return {
      scenario: '',
      currentStep: '',
      step: 0,
      explains: {
        '0': '선택된 두 요소를 비교.',
        '1': '앞 요소가 뒷 요소보다 크므로 자리 변경.',
        '2': '뒷 요소가 앞 요소보다 크므로 자리 유지.',
        '3': '정렬 완료!'
      },
      autoTimer: null
    }
  },
  watch: {
    step (step) {
      if (step >= this.scenarioLength) {
        this.clearAutoTimer();
        return;
      }
      if (step < 0) step = 0;
      this.currentStep = this.scenario[`${step}`];
    }
  },
  computed: {
    getList () { return this.currentStep ? this.currentStep.list : []; },
    scenarioLength () { return Object.keys(this.scenario).length; },
    isRunning () { return this.autoTimer ? true : false; }
  },
  methods: {
    changeStep (step) {
      if (step >= this.scenario.length - 1) return;
      this.step = step;
    },
    next () { this.changeStep(this.step + 1); },
    back () { this.changeStep(this.step - 1); },
    run () { this.autoTimer = this.setAutoTimer(); },
    setAutoTimer () {
      if (this.isRunning) this.clearAutoTimer();
      let vue = this;
      return setInterval(function () {
        vue.next();
      }, 1000);
    },
    clearAutoTimer () {
      clearInterval(this.autoTimer);
      this.autoTimer = null;
    },
    makeList (cnt) { return shuffle(makeArray(cnt)); },
    setScenario (list) {
      let result = {};
      let sorted = 0;
      let index = 0;
      for (let j = 0; j < list.length; j++) {
        for (let i = 0; i < list.length - 1 - sorted; i++) {
          result[`${index++}`] = this.setPartialScenario(list, i, j, '0')
          if (list[i] > list[i + 1]) {
            let temp = list[i];
            list[i] = list[i + 1];
            list[i + 1] = temp;
            result[`${index++}`] = this.setPartialScenario(list, i, j, '1')
          } else result[`${index++}`] = this.setPartialScenario(list, i, j, '2')
        }
        sorted++;
      }
      result[`${index}`] = this.setPartialScenario(list, -2, list.length, '3')
      return result;
    },
    setPartialScenario (list, focused, sorted, type) { return { list: list.slice(), focused, sorted, type } },
    reset () {
      this.scenario = this.setScenario(this.makeList(15));
      this.step = 0;
      this.currentStep = this.scenario['0'];
    }
  },
  mounted () {
    this.reset();
    console.log(this.scenario);
  }
}
</script>

<style lang="scss" scoped>
.bubble-sort {
  .explain {
    text-align: center;
    font-size: 1.25em;
  }
}
</style>
