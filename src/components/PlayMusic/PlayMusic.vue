<template>
  <div class="playmusic">
    <!-- 背景图 -->
    <div
      class="bg"
      :style="{ backgroundImage: `url(${playDetail.al.picUrl})` }"
    ></div>
    <!-- 头部歌名等 -->
    <div class="playtop">
      <div class="back" @click="$emit('back')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-left"></use>
        </svg>
      </div>
      <div class="center">
        <div class="title">
          <marquee behavior="scroll" direction="left">
            {{ playDetail.name }}
          </marquee>
        </div>
      </div>
      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-a-fenxiang"></use>
        </svg>
      </div>
    </div>
    <!-- 中间的播放效果图 -->
    <div class="playContent" v-show="!isLyric">
      <img
        class="needle"
        :class="{ active: !paused }"
        src="@/assets/img/needle-ab.png"
      />
      <img class="diepian" src="@/assets/img/diepian.png" alt="" />
      <img
        :class="{ rotate: !paused }"
        class="playImg"
        v-lazy="playDetail.al.picUrl"
        alt=""
      />
    </div>
    <!-- 歌词部分 -->
    <!-- <div class="playLyric" v-show="isLyric" @click="isLyric = !isLyric">
      <p
        :class="{
          active:
            currentTime * 1000 >= item.pre && currentTime * 1000 < item.time,
        }"
        v-for="(item, i) in $store.getters.lyricList"
        :key="i"
        ref="playLyric"
      >
        {{ item.lyric }}
      </p>
    </div>
    <div class="progress"></div> -->

    <!-- 底部播放栏 -->
    <div class="playFooter">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>

      <svg v-if="paused" class="icon play" aria-hidden="true" @click="play">
        <use xlink:href="#icon-Group"></use>
      </svg>
      <svg v-else class="icon play" aria-hidden="true" @click="suspend">
        <use xlink:href="#icon-zantingtingzhi2"></use>
      </svg>

      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["playDetail", "play", "suspend"],
  data() {
    return {
      isLyric: false,
    };
  },
  computed: {
    ...mapState([
      "lyric",
      "currentTime",
      "playlist",
      "playCurrentIndex",
      "paused",
    ]),
  },
  watch: {
    // currentTime(newValue) {
    //   let p = document.querySelector("p.active");
    //   this.$refs.playLyric.scrollTop = p.offsetTop;
    // },
  },
  methods: {
    goPlay(num) {
      let index = this.playCurrentIndex + num;
      if (index < 0) {
        index = this.playlist.length - 1;
      } else if (index == this.playlist.length) {
        index = 0;
      }
      this.$store.commit("setPlayIndex", index);
      // this.paused = false;
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes infiniteRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotate {
  animation: infiniteRotate 10s infinite linear;
}

.playmusic {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-size: auto 100%;
    background-position: center;
    filter: blur(60px);
  }
  .playtop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 7.5rem;
    height: 1.2rem;
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    padding: 0 0.4rem;
    .icon {
      fill: #fff;
      width: 0.4rem;
      height: 0.4rem;
    }
    marquee {
      width: 5rem;
    }
  }
  .playContent {
    position: relative;
    width: 7.5rem;
    height: 7.5rem;
    left: 0;
    top: 1.5rem;
    .needle {
      width: 2rem;
      height: auto;
      position: absolute;
      left: 3.4rem;
      z-index: 10;
      transform-origin: 0.3rem 0;
      transform: rotate(-15deg);
      transition: all 1s;
    }
    .needle.active {
      transform: rotate(5deg);
    }

    .diepian {
      width: 5.5rem;
      height: auto;
      position: absolute;
      left: calc(50% - 2.75rem);
      top: 2.2rem;
    }

    .playImg {
      width: 3.4rem;
      height: 3.4rem;
      border-radius: 1.7rem;
      position: absolute;
      left: calc(50% - 1.7rem);
      top: 3.28rem;
    }
  }
  .playFooter {
    width: 7.5rem;
    height: 1.2rem;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.4rem;
    margin-bottom: 0.2rem;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      fill: #fff;
    }
    .play {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
  .playLyric {
    position: relative;
    width: 7.5rem;
    height: 8rem;
    left: 0;
    top: calc(50% - 4rem);
    overflow: scroll;
    text-align: center;
    color: #fff;
    padding: 0.2rem 0;
    .active {
      color: red;
    }
  }
}
</style>