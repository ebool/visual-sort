<template>
  <div class="options-box">
    <v-slider
    class="cnt-controller"
    :value="$store.state.elementCnt"
    label="개수"
    @input="changeCnt"
    :max="15"
    :min="3"
    thumb-label
    thumb-color="red"
    color="white"
    ></v-slider>
    <v-slider
    class="speed-controller"
    :value="$store.state.speed"
    @input="changeSpeed"
    label="속도"
    step="100"
    thumb-color="red"
    :max="1000"
    :min="300"
    color="white"
    ></v-slider>
  </div>
</template>

<script>
export default {
  methods: {
    changeCnt (cnt) {
      this.$store.commit('setElementCnt', cnt);
      this.$store.dispatch('init');
    },
    changeSpeed (speed) {
      this.$store.commit('setSpeed', speed);
      if (this.$store.state.timer) this.$store.dispatch('setAutoTimer');
    }
  }
}
</script>
<style lang="scss" scoped>
.options-box {
  display: flex;
  max-width: 600px;
  margin: 0px auto;
  .cnt-controller, .speed-controller {
    padding-left: 16px;
  }
}
</style>
