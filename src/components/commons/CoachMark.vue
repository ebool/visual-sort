<template>
  <div class="coach-container">
    <slot name="target"></slot>
    <div class="coach" v-if="isShow" :style="getRepeatCnt"></div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      default: false,
      type: Boolean
    },
    repeat: {
      default: '9',
      type: String
    }
  },
  computed: {
    getRepeatCnt () {
      return {
        animationIterationCount: this.repeat
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/color.scss";

.coach-container {
  position: relative;

  .coach {
    cursor: pointer;
    background-color: rgba(24,255,255,.4);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    opacity: 0;
    animation-name: wave;
    animation-duration: 1s;
    animation-delay: .1s;
    animation-timing-function: ease-in-out;
  }

  @keyframes wave {
    from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    to { transform: translate(-50%, -50%) scale(3); opacity: 0; }
  }
}
</style>
