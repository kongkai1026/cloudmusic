<template>
  <div id="swiperIndex">
    <div class="swiper-container" id="SwiperCom">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, i) in imgs" :key="i">
          <img v-lazy="item.pic" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";
import { getBanner } from "@/api/index";

export default {
  data() {
    return {
      imgs: [{}],
    };
  },
  async mounted() {
    let res = await getBanner(1);
    this.imgs = res.data.banners;
  },
  updated() {
    new Swiper("#SwiperCom", {
      loop: true, // 循环模式选项
      autoplay: true, //启动自动切换
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },
    });
  },
};
</script>


<style lang="less">
#swiperIndex {
  .swiper-container {
    width: 7.1rem;
    height: 2.6rem;
    border-radius: 0.1rem;
  }
  .swiper-slide img {
    width: 100%;
  }
  .swiper-pagination-bullet-active {
    background-color: orangered;
    opacity: 0.7;
  }
}
</style>
