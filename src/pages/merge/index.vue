<template>
  <div class="merge-sort-cont">
    <options-box></options-box>
    <!--<div>start : {{startArray}}</div>-->
    <!--<div>result : {{resultArray}}</div>-->
    <!--<button @click="sort">sort</button>-->
  </div>
</template>

<script>
import OptionsBox from 'src/components/sort/commons/OptionsBox.vue';

export default {
  components: {
    OptionsBox
  },
  data () {
    return {
      startArray: [4, 3, 5, 8, 6, 11, 32, 112, 23, 22, 66, 79, 23, 54, 44, 21, 3, 56, 79, 90, 67, 455, 65],
      resultArray: []
    }
  },
  methods: {
    makeScenario (array) {

    },
    sort () {
      console.log('hello sort')
    },
    divide (array) {
      let center = array.length / 2;
      if (array.length < 2) {
        return array;
      }
      let left = this.divide(array.slice(0, center));
      let right = this.divide(array.slice(center, array.length));
      console.log(left, right);
      let result = this.conquer(left, right);
      console.log('result : ', result);
      return result;
    },
    conquer (a1, a2) {
      let result = [];
      while(true) {
        let v1 = a1.slice(0, 1);
        let v2 = a2.slice(0, 1);
        if (!v1.length && !v2.length) break;
        else if (!v1.length) result.push(a2.shift());
        else if (!v2.length) result.push(a1.shift());
        else if (v1[0] < v2[0]) result.push(a1.shift());
        else result.push(a2.shift());
      }
      return result;
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>
