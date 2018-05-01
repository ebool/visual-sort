<template>
  <v-app dark class="v-app">
    <action-bar></action-bar>
    <navigation-drawer></navigation-drawer>
    <v-content class="mt16">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import ActionBar from 'commons/ActionBar.vue';
import NavigationDrawer from 'commons/NavigationDrawer.vue';

export default {
  components: {
    ActionBar,
    NavigationDrawer
  }
}
</script>

<style lang="scss" scoped>
@import '~node/vuetify/dist/vuetify.min.css';
</style>
