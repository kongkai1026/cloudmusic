<template>
  <div class="home">
    <top-nav></top-nav>
    <swiper-com></swiper-com>
    <iconlist></iconlist>
    <musiclist></musiclist>
    <new-music></new-music>
  </div>
</template>

<script>
import topNav from "@/components/TopNav.vue";
import swiperCom from "../components/SwiperCom.vue";
import iconlist from "../components/IconList.vue";
import musiclist from "../components/MusicList.vue";
import newMusic from "../components/NewMusic.vue";

export default {
  name: "Home",
  components: {
    topNav,
    swiperCom,
    iconlist,
    musiclist,
    newMusic,
  },
};
</script>

<style lang="less" scoped>
</style>