<template>
  <v-layout class="my-3" justify-center>
    <v-btn :disabled="isRunning" @click="next()">한 단계씩</v-btn>
    <v-btn @click="auto()">{{getButtonName}}</v-btn>
    <v-btn :disabled="isRunning" @click="shuffle()">뒤섞기</v-btn>
  </v-layout>
</template>

<script>
export default {
  props: {
    isRunning: {
      type: Boolean
    },
    next: {
      type: Function
    },
    auto: {
      type: Function
    },
    shuffle: {
      type: Function
    }
  },
  computed: {
    getButtonName () {
      return this.isRunning ? '멈추기' : '자동정렬';
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
