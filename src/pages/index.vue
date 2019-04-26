<template>
  <v-app dark class="v-app">
    <navigation-drawer></navigation-drawer>
    <v-content class="mt16">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from 'src/atom/NavigationDrawer.vue';

export default {
  components: {
    NavigationDrawer
  }
}
</script>

<style lang="scss" scoped>
</style>
