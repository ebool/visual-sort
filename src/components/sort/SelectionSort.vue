<template>
  <div class="selection-sort" v-if="isShow">
    <options-box></options-box>
    <sort-visualization
    :isSorted="(i) => {return i < currentStep.sorted}"
    :isSelected="(i) => {return i === currentStep.selected}"
    :isFocused="(i) => {return i === currentStep.focused}"
    ></sort-visualization>
    <explain-box :explains="explains"></explain-box>
    <progress-bar></progress-bar>
    <control-box
    :shuffle="setInit"
    :isEnd="currentStep.type === '4'"
    ></control-box>
  </div>
</template>

<script>
import {changeItem} from '@/assets/js/utils.js';
import OptionsBox from './commons/OptionsBox.vue';
import SortVisualization from './commons/SortVisualization.vue';
import ExplainBox from './commons/ExplainBox.vue';
import ProgressBar from './commons/ProgressBar.vue';
import ControlBox from './commons/ControlBox.vue';
import store from '@/store/sortStore.js';

export default {
  store,
  components: {
    OptionsBox,
    SortVisualization,
    ExplainBox,
    ProgressBar,
    ControlBox
  },
  data () {
    return {
      explains: {
        '0': '정렬 대상인 요소 중, 첫 요소 선택.',
        '1': '선택된 요소보다 더 작으므로 선택.',
        '2': '선택된 요소보다 크므로 무시.',
        '3': '선택된 요소를 정렬대상 앞으로 변경.',
        '4': '정렬 완료!'
      },
      isShow: false
    }
  },
  watch: {
    step (step) {
      if (step >= this.scenarioLength - 1) this.$store.commit('clearTimer');
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
      this.$store.dispatch('init');
    },
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
  },
  mounted () {
    this.$store.commit('setMakeScenario', this.makeScenario);
    this.setInit();
    this.isShow = true;
  }
}
</script>
<style scoped lang="scss">
</style>
