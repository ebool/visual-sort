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
  props: ['max', 'step'],
  methods: {
    chageStep (value) {
      this.$emit('input', value);
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
