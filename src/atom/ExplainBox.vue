<template>
  <div class="explain-box">
    <div class="explain" v-html="explains[`${currentStep.type}`]"/>
  </div>
</template>

<script>
export default {
  props: ['explains'],
  computed: {
    currentStep () { return this.$store.getters.currentStep; }
  }
}
</script>

<style lang="scss" scoped>
.explain-box {
  .explain {
    text-align: center;
    font-size: 1.25em;
  }
}
</style>
