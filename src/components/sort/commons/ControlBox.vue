<template>
  <v-layout class="my-3" justify-center>
    <v-btn flat icon color="white" :disabled="isRunning" @click="back()"><v-icon>fast_rewind</v-icon></v-btn>
    <v-btn flat icon color="white" @click="stop()" v-if="isRunning"><v-icon>pause</v-icon></v-btn>
    <v-btn flat icon color="white" @click="run()" v-else><v-icon>play_arrow</v-icon></v-btn>
    <v-btn flat icon color="white" :disabled="isRunning" @click="next()"><v-icon>fast_forward</v-icon></v-btn>
    <coach-mark :isShow="isEnd" repeat="infinite" :func="shuffle">
      <v-btn flat icon color="white" :disabled="isRunning" slot="target" @click="shuffle"><v-icon>shuffle</v-icon></v-btn>
    </coach-mark>
  </v-layout>
</template>

<script>
import CoachMark from 'commons/CoachMark.vue'

export default {
  props: {
    shuffle: {
      default: () => { return; }
    },
    isEnd: {}
  },
  components: {
    CoachMark
  },
  computed: {
    step () {
      return this.$store.state.step;
    },
    isRunning () {
      return this.$store.state.timer ? true : false;
    }
  },
  methods: {
    stop () {
      this.$store.commit('clearTimer');
    },
    run () {
      this.$store.dispatch('setAutoTimer');
    },
    next () {
      this.$store.commit('setStep', this.step + 1)
    },
    back () {
      this.$store.commit('setStep', this.step - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
