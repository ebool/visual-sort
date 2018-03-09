<template>
  <v-app dark class="v-app">
    <action-bar></action-bar>
    <navigation-drawer></navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
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
