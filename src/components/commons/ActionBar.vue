<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon class="hidden-md-and-up" @click="$store.commit('setDrawer')"></v-toolbar-side-icon>
    <v-toolbar-title @click="goHome" class="title">Visual Sort</v-toolbar-title>
    <!-- hidden-{breakpoint}-{condition} -->
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    goHome () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  cursor: pointer;
}
</style>
