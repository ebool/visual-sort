<template>
  <div class="button-container">
    <router-link to="bubble">거품정렬</router-link>
    <router-link to="selection">선택정렬</router-link>
    <router-link to="insertion">삽입정렬</router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  .box {
    width: 400px;
    height: 200px;
    border: 1px solid red;
    overflow: scroll;

    .inner-box {
      background-color: greenyellow;
      width: 200px;
      height: 900px;
    }
  }

  a {
    margin-top: 10px;
  }
}
</style>
