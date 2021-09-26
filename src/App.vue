<template>
  <div>
    <router-view />
    <play-controller></play-controller>
  </div>
</template>

<script>
import playController from "./components/PlayController.vue";
export default {
  components: {
    playController,
  },
  mounted() {
    if (localStorage.userData) {
      let userData = JSON.parse(localStorage.userData);
      this.$store.commit("setUser", userData);
    }
  },
};
</script>


<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "微软雅黑";
}
.icon {
  width: 0.3rem;
  height: 0.3rem;
}
a {
  color: #333;
  text-decoration: none;
}
</style>
