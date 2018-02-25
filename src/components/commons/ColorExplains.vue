<template>
  <div class="color-explains">
    <div class="focused" v-if="focused">
      <div class="color"></div>
      <div>현재 포커스된 블럭</div>
    </div>
    <div class="sorted" v-if="sorted">
      <div class="color"></div>
      <div>정렬된 블럭</div>
    </div>
    <div class="selected" v-if="selected">
      <div class="color"></div>
      <div>선택된 블럭</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['focused', 'sorted', 'selected']
}
</script>
<style lang="scss" scoped>
@import 'src/assets/css/color.scss';

.color-explains {
  display: flex;
  justify-content: flex-end;

  .arrange {
    display: flex;
    align-items: center;
    margin-left: 15px;
    font-size: 13px;

    .color {
      margin-right: 5px;
      width: 15px;
      height: 15px;
    }
  }

  .focused {
    @extend .arrange;
    .color {
      background-color: $focused;
    }
  }
  .sorted {
    @extend .arrange;
    .color {
      background-color: $sorted;
    }
  }
  .selected {
    @extend .arrange;
    .color {
      border: 2px solid $selected;
    }
  }
}
</style>
