<template>
  <div class="bubble-sort" v-if="isShow">
    <sort-visualization
    :isSorted="(i) => {return i > currentStep.list.length - currentStep.sorted - 1}"
    :isFocused="(i) => {return i === currentStep.focused || i === currentStep.focused + 1}"
    ></sort-visualization>
    <explain-box :explains="explains"></explain-box>
    <progress-bar></progress-bar>
    <control-box
    :shuffle="setInit"
    :isEnd="currentStep.type === '3'"
    ></control-box>
  </div>
</template>

<script>
import {makeArray, shuffle, changeItem} from '@/assets/js/utils.js';
import SortVisualization from './commons/SortVisualization.vue';
import ExplainBox from './commons/ExplainBox.vue';
import ProgressBar from './commons/ProgressBar.vue';
import ControlBox from './commons/ControlBox.vue';
import store from '@/store/sortStore.js';

export default {
  store,
  components: {
    SortVisualization,
    ExplainBox,
    ProgressBar,
    ControlBox
  },
  data () {
    return {
      explains: {
        '0': '선택된 두 요소를 비교.',
        '1': '앞 요소가 뒷 요소보다 크므로 자리 변경.',
        '2': '뒷 요소가 앞 요소보다 크므로 자리 유지.',
        '3': '정렬 완료!'
      },
      isShow: false
    }
  },
  watch: {
    step (step) {
      if (step >= this.scenarioLength - 1) { this.$store.commit('clearTimer'); }
    }
  },
  computed: {
    scenarioLength () { return this.$store.getters.scenarioLength; },
    scenario () { return this.$store.state.scenario; },
    currentStep () { return this.$store.getters.currentStep; },
    step () { return this.$store.state.step; },
  },
  methods: {
    setInit () {
      this.$store.commit('setScenario', this.makeScenario(this.makeList(15)));
      this.$store.commit('setStep', 0);
      this.$store.commit('clearTimer');
    },
    makeList (cnt) { return shuffle(makeArray(cnt)); },
    makeScenario (list) {
      let result = {};
      let sorted = 0;
      let index = 0;
      for (let j = 0; j < list.length; j++) {
        for (let i = 0; i < list.length - 1 - sorted; i++) {
          result[`${index++}`] = this.setPartialScenario(list, i, j, '0')
          if (list[i] > list[i + 1]) {
            list = changeItem(list, i, i + 1);
            result[`${index++}`] = this.setPartialScenario(list, i, j, '1')
          } else result[`${index++}`] = this.setPartialScenario(list, i, j, '2')
        }
        sorted++;
      }
      result[`${index}`] = this.setPartialScenario(list, -2, list.length, '3')
      return result;
    },
    setPartialScenario (list, focused, sorted, type) { return { list: list.slice(), focused, sorted, type } },
  },
  mounted () {
    this.setInit();
    this.isShow = true;
  }
}
</script>

<style lang="scss" scoped>
</style>
