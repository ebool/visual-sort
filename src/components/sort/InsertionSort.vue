<template>
  <div class="bubble-sort" v-if="isShow">
    <options-box></options-box>
    <sort-visualization
    :isSorted=" i => i < currentStep.sorted"
    :isSelected="i => i === currentStep.selected"
    :isFocused="i => i === currentStep.focused"
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
import {changeItem} from '@/assets/js/utils.js';
import OptionsBox from './commons/OptionsBox.vue';
import SortVisualization from './commons/SortVisualization.insertion.vue';
import ExplainBox from './commons/ExplainBox.vue';
import ProgressBar from './commons/ProgressBar.vue';
import ControlBox from './commons/ControlBox.vue';

export default {
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
        '0': '기준이 되는 요소 선택',
        '1': '비교대상 선택',
        '2': '앞 요소가 뒷 요소보다 큰가? <span style="color:#18FFFF">yes!</span>',
        '3': '다음 요소 선택',
        '4': '가장 앞에 삽입',
        '5': '앞 요소의 바로 뒤에 삽입',
        '6': '정렬 완료!',
        '7': '앞 요소가 뒷 요소보다 큰가? <span style="color:#FF1744">no!</span>'
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
      this.$store.dispatch('init');
    },
    makeScenario (list) {
      let result = {}
      let sorted = 0;
      let index = 0;
      let focused = 0;
      let selected = 0;
      for (let j = 1; j < list.length; j++) {
        focused = j;
        sorted = j;
        selected = j - 1;
        result[`${index++}`] = this.setPartialScenario(list, focused, -1, sorted, '0');
        do {
            result[`${index++}`] = this.setPartialScenario(list, focused, selected, sorted, '1');
          if (list[selected] > list[focused]) {
            result[`${index++}`] = this.setPartialScenario(list, focused, selected, sorted, '2');
            if (selected === 0) {
              list = this.insertItem(list, selected, focused)
              result[`${index++}`] = this.setPartialScenario(list, 0, selected + 1, sorted + 1, '4');
              break;
            }
            continue;
          } else {
            result[`${index++}`] = this.setPartialScenario(list, focused, selected, sorted, '7');
            list = this.insertItem(list, selected + 1, focused)
            result[`${index++}`] = this.setPartialScenario(list, selected + 1, selected, sorted + 1, '5');
            break;
          }
        } while (selected--)
      }
      result[`${index++}`] = this.setPartialScenario(list, -1, -1, list.length, '6');
      return result;
    },
    setPartialScenario (list, focused, selected, sorted, type) { return { list: list.slice(), focused, selected, sorted, type } },
    insertItem (a, pos, target) {
      let list = a.slice();
      let item = list.splice(target, 1);
      list.splice(pos, 0, item[0]);
      return list;
    }
  },
  mounted () {
    this.$store.commit('setMakeScenario', this.makeScenario);
    this.setInit()
    this.isShow = true;
    console.log('scenario', this.$store.state.scenario);
  }
}
</script>

<style lang="scss" scoped>
</style>
