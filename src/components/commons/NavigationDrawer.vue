<template>
  <div class="nav-cont">
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title @click="goTo('/')" class="title">Visual Sort</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer
    clipped
    fixed
    app
    :mobile-break-point="960"
    v-model="drawer">
      <v-list>
        <v-list-tile
        v-for="(item, i) in list" :key="i"
        @click="goTo(item.path)">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      drawer: false,
      list : [
        {name: '버블 정렬', path: 'bubble'},
        {name: '선택 정렬', path: 'selection'},
        {name: '삽입 정렬', path: 'insertion'},
        {name: '병합 정렬', path: 'merge'}
      ]
    }
  },
  methods: {
    goTo (path) {
      this.$router.push({ path })
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-cont {
  .title {
    cursor: pointer;
  }
}
</style>
