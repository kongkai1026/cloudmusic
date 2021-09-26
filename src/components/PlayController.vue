<template>
  <div class="playController">
    <div class="left" @click="show = !show">
      <img v-lazy="playlist[playCurrentIndex].al.picUrl" />
      <div class="content">
        <div class="title">
          {{ playlist[playCurrentIndex].name }}
        </div>
        <div class="tips">横滑可以切换上下首哦</div>
      </div>
    </div>
    <div class="right">
      <svg v-if="paused" class="icon" aria-hidden="true" @click="play">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg v-else class="icon" aria-hidden="true" @click="suspend">
        <use xlink:href="#icon-zantingtingzhi-copy"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>

    <play-music
      @back="show = !show"
      v-show="show"
      :play="play"
      :suspend="suspend"
      :playDetail="playlist[playCurrentIndex]"
    ></play-music>

    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"
    ></audio>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PlayMusic from "../components/PlayMusic/PlayMusic.vue";

export default {
  components: { PlayMusic },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapState(["playlist", "playCurrentIndex", "paused"]),
  },
  mounted() {},
  updated() {
    if (this.paused) {
      this.$refs.audio.pause();
    } else {
      this.$refs.audio.play();
    }
  },
  methods: {
    play() {
      this.$store.commit("setPaused", false);
    },
    suspend() {
      this.$store.commit("setPaused", true);
    },
  },
};
</script>

<style lang="less" scoped>
.playController {
  width: 7.5rem;
  height: 1.2rem;
  position: fixed;
  z-index: 9999;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #ccc;
  .left {
    display: flex;
    padding: 0 0.4rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    .content {
      padding: 0 0.2rem;
      .title {
        width: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tips {
        font-size: 0.2rem;
        color: #999;
        padding-top: 0.05rem;
      }
    }
  }
  .right {
    .icon {
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 0.2rem;
    }
  }
}
</style>