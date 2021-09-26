<template>
  <div class="musiclist">
    <div class="musiclist-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="mlist">
      <div class="swiper-container" id="musicSwiper">
        <div class="swiper-wrapper">
          <router-link
            :to="{ path: '/listview', query: { id: item.id } }"
            class="swiper-slide"
            v-for="(item, i) in state.musicList"
            :key="i"
          >
            <img v-lazy="item.picUrl" :alt="item.name" />
            <div class="name">{{ item.name }}</div>
            <div class="count">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang1"></use>
              </svg>
              <span>{{ changeValue(item.playCount) }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";
import { getMusicList } from "@/api/index.js";

import { reactive, onMounted, onUpdated } from "vue";

//vue3写法
export default {
  setup() {
    let state = reactive({ musicList: [] });

    function changeValue(num) {
      let res = 0;
      if (num >= 100000000) {
        res = num / 100000000;
        res = res.toFixed(2) + "亿";
      } else if (num > 10000) {
        res = num / 10000;
        res = res.toFixed(2) + "万";
      }
      return res;
    }

    onMounted(async () => {
      let res = await getMusicList();
      state.musicList = res.data.result;
    });

    onUpdated(() => {
      new Swiper("#musicSwiper", {
        slidesPerView: 3,
        spaceBetween: 10,
      });
    });
    return {
      state,
      changeValue,
    };
  },
};

//vue2写法

// export default {
//   data() {
//     return {
//       musicList: [],
//     };
//   },
//   methods: {
//     changeValue(num) {
//       let res = 0;
//       if (num >= 100000000) {
//         res = num / 100000000;
//         res = res.toFixed(2) + "亿";
//       } else if (num > 10000) {
//         res = num / 10000;
//         res = res.toFixed(2) + "万";
//       }
//       return res;
//     },
//   },

//   async mounted() {
//     let res = await getMusicList();
//     this.musicList = res.data.result;
//     console.log(res);
//   },
//   updated() {
//     new Swiper("#musicSwiper", {
//       slidesPerView: 3,
//       spaceBetween: 10,
//     });
//   },
// };
</script>

<style lang="less" scoped>
.musiclist {
  width: 7.5rem;
  padding: 0 0.4rem;
  .musiclist-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      border-radius: 0.2rem;
      font-size: 0.24rem;
      width: 1.2rem;
      height: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
    }
  }
  .mlist {
    .swiper-container {
      width: 100%;
      height: 3rem;
      .swiper-slide {
        display: flex;
        flex-direction: column;
        position: relative;
        img {
          width: 100%;
          height: auto;
          border-radius: 0.1rem;
        }
        .name {
          height: 0.6rem;
          width: 100%;
          font-size: 0.24rem;
          line-height: 0.4rem;
        }
        .count {
          position: absolute;
          right: 0.1rem;
          top: 0.1rem;
          font-size: 0.24rem;
          color: #ccc;
          display: flex;
          align-items: center;
          .icon {
            fill: #ccc;
          }
        }
      }
    }
  }
}
</style>