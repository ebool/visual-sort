<template>
  <div class="selection-sort">
    <sort-visualization
    :list="getList"
    :isSorted="(i) => {return i < currentStep.sorted}"
    :isSelected="(i) => {return i === currentStep.selected}"
    :isFocused="(i) => {return i === currentStep.focused}"
    >
    </sort-visualization>
    <div class="explain">{{explains[`${currentStep.type}`]}}</div>
    <progress-bar :max="scenarioLength - 1" @input="changeStep" :step="step"></progress-bar>
    <control-box
    :back="back"
    :next="next"
    :run="run"
    :stop="clearAutoTimer"
    :shuffle="setInit"
    :isRunning="isRunning"
    :isEnd="currentStep.type === '4'"
    ></control-box>
  </div>
</template>

<script>
import {makeArray, shuffle, changeItem} from '@/assets/js/utils.js';
import SortVisualization from './commons/SortVisualization.vue';
import ProgressBar from './commons/ProgressBar.vue';
import ControlBox from './commons/ControlBox.vue';

export default {
  components: {
    SortVisualization,
    ProgressBar,
    ControlBox
  },
  data () {
    return {
      scenario: '',
      currentStep: {
        list: [],
        selected: '',
        focused: '',
        sorted: ''
      },
      step: 0,
      explains: {
        '0': '정렬 대상인 요소 중, 첫 요소 선택.',
        '1': '선택된 요소보다 더 작으므로 선택.',
        '2': '선택된 요소보다 크므로 무시.',
        '3': '선택된 요소를 정렬대상 앞으로 변경.',
        '4': '정렬 완료!'
      },
      autoTimer: null,
    }
  },
  watch: {
    step (step) {
      if (step < 0) step = 0;
      this.currentStep = this.scenario[`${step}`];
      if (step >= this.scenarioLength - 1) this.clearAutoTimer();
    }
  },
  computed: {
    getList () { return this.currentStep ? this.currentStep.list : []; },
    scenarioLength () { return Object.keys(this.scenario).length; },
    isRunning () { return this.autoTimer ? true : false; }
  },
  methods: {
    setInit () {
      this.scenario = this.makeScenario(this.makeList(15));
      this.step = 0;
      this.currentStep = this.scenario['0'];
    },
    makeList (cnt) { return shuffle(makeArray(cnt)); },
    makeScenario (list) {
      let result = {};
      let sorted = 0;
      let index = 0;
      let selected = 0;
      let focused = 0;

      for (sorted = 0; sorted < list.length; sorted++) {
        selected = sorted;
        focused = sorted;
        result[`${index++}`] = this.setPartialScenario(list, sorted, focused, selected, '0');
        while (focused++ < list.length) {
          if (list[focused] < list[selected]) {
            selected = focused;
            result[`${index++}`] = this.setPartialScenario(list, sorted, focused, selected, '1');
          } else if (list[focused] > list[selected]) {
            result[`${index++}`] = this.setPartialScenario(list, sorted, focused, selected, '2');
          }
        }
        list = changeItem(list, sorted, selected);
        result[`${index++}`] = this.setPartialScenario(list, sorted + 1, focused, selected, '3');
      }
      result[`${index++}`] = this.setPartialScenario(list, list.length, -1, -1, '4');
      return result;
    },
    setPartialScenario (list, sorted, focused, selected, type) { return { list: list.slice(), focused, sorted, selected, type } },
    changeStep (step) {
      if (step > this.scenarioLength) return;
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
    }
  },
  mounted () {
    this.setInit();
  }
}
</script>
<style scoped lang="scss">
.selection-sort {
  .explain {
    text-align: center;
    font-size: 1.25em;
  }
}
</style>
