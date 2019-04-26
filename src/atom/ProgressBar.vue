<template>
  <div class="progress-container">
    <v-slider
    :value="step"
    @input="chageStep"
    :max="max"
    color="white"
    ></v-slider>
  </div>
</template>

<script>
export default {
  methods: {
    chageStep (step) {
      if (step > this.scenarioLength) return;
      this.$store.commit('setStep', step);
    }
  },
  computed: {
    step () {
      return this.$store.state.step;
    },
    max () {
      return this.scenarioLength - 1;
    },
    scenarioLength () {
      return this.$store.getters.scenarioLength;
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-container {
  margin: 0px auto;
  max-width: 500px;
  padding: 0px 20px;
  box-sizing: border-box;
}
</style>
