<template>
  <div class="control-box">
    <div class="title">정렬 버튼</div>
    <div class="button-container">
      <button :class="{'disabled' : isRunning}" @click="oneStep">한 단계씩</button>
      <button @click="auto">{{getButtonName}}</button>
      <button :class="{'disabled' : isRunning}" @click="shuffle">뒤섞기</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isRunning'],
  methods: {
    oneStep () {
      if (!this.isRunning) this.$emit('oneStep');
    },
    auto () {
      if (this.isRunning) {
        this.$emit('stopAutoSort');
      } else {
        this.$emit('runAutoSort');
      }
    },
    shuffle () {
      if (!this.isRunning) this.$emit('shuffle');
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
.control-box {
  margin-top: 20px;

  .title {
    font-size: 15px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    padding-top: 10px;

    button {
      width: 80px;
      height: 30px;
      font-size: 12px;
      background-color: rgb(106, 123, 190);
      color: white;
      margin-right: 5px;
      transition-duration: 0.4s;
      box-shadow: 1px 2px rgba(88, 88, 88, 0.27);
    }
    button:hover {
      box-shadow: 3px 4px rgba(88, 88, 88, 0.27);
    }

    .disabled {
      background-color: grey;
      box-shadow: 0px 0px;
    }
    .disabled:hover {
      box-shadow: 0px 0px;
    }
  }
}
</style>
