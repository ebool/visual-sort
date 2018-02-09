<template>
  <div class="button-container">
    <router-link to="bubble">거품정렬</router-link>
    <router-link to="selection">선택정렬</router-link>
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

  a {
    margin-top: 10px;
  }
}
</style>
