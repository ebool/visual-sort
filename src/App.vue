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
  name: 'App',
  components: {
    NavigationDrawer
  }
}
</script>

<style lang="scss">
@import "src/assets/css/reset.scss";
@import "src/assets/css/utils.scss";
@import '~node/vuetify/dist/vuetify.min.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
