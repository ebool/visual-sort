<template>
  <div class="control-box">
    <div class="title">정렬 버튼</div>
    <div class="button-container">
      <button @click="oneStep">한 단계씩</button>
      <button @click="auto">자동 정렬</button>
      <button @click="shuffle">뒤섞기</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    oneStep () {
      this.$emit('oneStep');
    },
    auto () {
      this.$emit('auto');
    },
    shuffle () {
      this.$emit('shuffle');
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
  }
}
</style>
