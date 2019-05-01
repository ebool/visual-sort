<template>
  <div class="merge-sort-cont" v-if="isShow">
    <options-box></options-box>
    <progress-bar></progress-bar>
    <control-box
        :shuffle="setInit"
        :isEnd="currentStep.type === '6'"
    ></control-box>
    <div class="mini-map">
      <list
        :is-sorted="isSorted"
        :list="currentStep.mini"
        border-color="red"></list>
    </div>
    <sort-visualization
      :is-focused="isFocused"
      :is-dismiss="isDismiss"
      :is-left="isLeft"
      :is-right="isRight"
      :is-sorted="isSorted"
    ></sort-visualization>
    <div class="partition">
      <list :list="currentStep.leftSide" :is-selected="isSelected" border-color="#80cbc4"></list>
      <list :list="currentStep.rightSide" :is-selected="isSelected" border-color="#ffcc80"></list>
    </div>
    <explain-box :explains="explains"></explain-box>
  </div>
</template>

<script>
import OptionsBox from 'src/atom/OptionsBox.vue';
import SortVisualization from 'src/atom/SortVisualization.merge.vue';
import List from 'src/atom/list.vue';
import ExplainBox from 'src/atom/ExplainBox.vue';
import ProgressBar from 'src/atom/ProgressBar.vue';
import ControlBox from 'src/atom/ControlBox.vue';

export default {
  components: {
    OptionsBox,
    SortVisualization,
    ExplainBox,
    ProgressBar,
    ControlBox,
    List
  },
  data () {
    return {
      isShow: false,
      explains: {
        '0': '병합정렬',
        '1': '갯수가 1개 이상이면 분리한다.',
        '2': '분리!!!!',
        '3': '선탠된 막대를 비교하여 정렬.',
        '4': '정렬!!!',
        '8': '앞 요소가 뒷 요소보다 큰가? <span style="color:#18FFFF">yes!</span>',
        '5': '앞 요소의 바로 뒤에 삽입',
        '6': '정렬 완료!',
        '7': '앞 요소가 뒷 요소보다 큰가? <span style="color:#FF1744">no!</span>'
      },
      result: {}
    }
  },
  watch: {
    step (step) {
      if (step >= this.scenarioLength - 1) { this.$store.commit('clearTimer'); }
    }
  },
  computed: {
    currentStep () {
      // console.log(this.$store.getters.currentStep);
      return this.$store.getters.currentStep; },
    step () { return this.$store.state.step; },
  },
  methods: {
    setInit () {
      this.$store.dispatch('init');
    },
    makeScenario (list) {
      let result = {};
      result[this.getNextIdx(result)] = this.setPartialScenario({list, type: '0'});

      this.divide(result, list);

      return result;
    },
    divide (result, list) {
      let pivot = Math.ceil(list.length / 2);
      if (list.length < 2) {
        return list;
      }
      let leftSide = list.slice(0, pivot);
      let rightSide = list.slice(pivot, list.length);

      result[this.getNextIdx(result)] = this.setPartialScenario({list, leftSide, rightSide, type: '1'});

      return this.conquer(result, this.divide(result, leftSide), this.divide(result, rightSide));
    },
    conquer (result, a1, a2) {
      let res = [];
      let mini = a1.concat(a2);
      result[this.getNextIdx(result)] = this.setPartialScenario({
        list: [], mini, type: '3', leftSide: a1, rightSide: a2,
        selected: [a1[0], a2[0]]
      });
      while(true) {
        let v1 = a1.slice(0, 1);
        let v2 = a2.slice(0, 1);
        if (!v1.length && !v2.length) break;
        else if (!v1.length) {
          res.push(a2.shift());
        }
        else if (!v2.length) {
          res.push(a1.shift());
        }
        else if (v1[0] < v2[0]) {
          res.push(a1.shift());
        }
        else {
          res.push(a2.shift());
        }
        result[this.getNextIdx(result)] = this.setPartialScenario({
          list: res, type: '3', leftSide: a1, rightSide: a2,
          selected: [a1[0], a2[0]],
          sorted: res,
          mini: res.concat(a1).concat(a2)
        });
      }
      return res;
    },
    isFocused ({idx, item}) {
      for (let i of this.currentStep.target) {
        if (i === item) return true;
      }
    },
    isSelected ({idx, item}) {
      for (let i of this.currentStep.selected) {
        if (i === item) return true;
      }
    },
    isDismiss ({idx, item}) {
      for (let i of this.currentStep.dismissTarget) {
        if (i === item) return true;
      }
    },
    isLeft ({idx, item}) {
      for (let i of this.currentStep.leftSide) {
        if (i === item) return true;
      }
    },
    isRight ({idx, item}) {
      for (let i of this.currentStep.rightSide) {
        if (i === item) return true;
      }
    },
    isSorted ({idx, item}) {
      for (let i of this.currentStep.sorted) {
        if (i === item) return true;
      }
    },
    getNextIdx (result) {
      let keys = Object.keys(result);
      let idx = parseInt(keys[keys.length - 1]);
      return isNaN(idx) ? 0 : idx + 1;
    },
    setPartialScenario ({list, selected, target, dismissTarget, type, leftSide, rightSide, sorted, mini}) {
      return {
        list: this.copyArray(list),
        selected: this.copyArray(selected),
        target: this.copyArray(target),
        leftSide: this.copyArray(leftSide),
        rightSide: this.copyArray(rightSide),
        dismissTarget: this.copyArray(dismissTarget),
        sorted: this.copyArray(sorted),
        mini: this.copyArray(mini),
        type,
      }
    },
    copyArray (list) {
      return Array.isArray(list) ? list.slice() : [];
    }
  },
  mounted () {
    this.$store.commit('setMakeScenario', this.makeScenario);
    this.setInit();
    this.isShow = true;
  }
}
</script>

<style lang="scss" scoped>
.merge-sort-cont {
  .mini-map {
    width: 500px;
    transform: scale(0.5);
    position: absolute;
  }
  .partition {
    display: flex;
    margin-bottom: 20px;
  }
}
</style>
