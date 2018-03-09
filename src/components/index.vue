<template>
<<<<<<< HEAD
  <div class="button-container">
    <router-link to="bubble">거품정렬</router-link>
    <router-link to="selection">선택정렬</router-link>
    <router-link to="insertion">삽입정렬</router-link>
  </div>
</template>

<script>
export default {
=======
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
>>>>>>> adapt-vutify
}
</script>

<style lang="scss" scoped>
<<<<<<< HEAD
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
=======
@import '~node/vuetify/dist/vuetify.min.css';
>>>>>>> adapt-vutify
</style>
