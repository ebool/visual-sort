<template>
  <v-navigation-drawer
  clipped
  fixed
  app
  :mobile-break-point="960"
  v-model="$store.state.drawer">
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
</template>
<script>
export default {
  data () {
    return {
      list : [
        {name: '버블 정렬', path: 'bubble'},
        {name: '선택 정렬', path: 'selection'},
        {name: '삽입 정렬', path: 'insertion'}
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
<style>

</style>
