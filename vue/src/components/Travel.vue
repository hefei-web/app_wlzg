<template>
  <div>
    <best></best>
    <landmark></landmark>
    <food></food>
  </div>
</template>
<script>
import best from "./best";
import landmark from "./landmark";
import food from "./food";
export default {
  data() {
    return {};
  },
  components: {
    best,
    landmark,
    food
  }
};
</script>
<style scoped>
body{
    overflow: hidden;
}
</style>
