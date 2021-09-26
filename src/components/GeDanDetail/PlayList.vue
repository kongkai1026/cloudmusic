<template>
  <div class="playList">
    <div class="playlist-top">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Group"></use>
        </svg>
        <div class="text">
          <div class="title">播放全部</div>
          <div class="num">(共{{ playlist.tracks.length }}首)</div>
        </div>
      </div>
      <div class="btn">
        + 收藏 ({{ changeValue(playlist.subscribedCount) }})
      </div>
    </div>
    <div class="list">
      <div
        class="playItem"
        v-for="(item, i) in playlist.tracks"
        :key="i"
        @click="setPlay(i)"
      >
        <div class="left">
          <div class="index">{{ i + 1 }}</div>
          <div class="content">
            <div class="title">{{ item.name }}</div>
            <div class="anthor">
              <span class="tag">SQ</span>
              <span>{{ getSinger(item) }}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-4-121"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sangedian"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="bottom">到底了！！</div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: ["playlist"],
  methods: {
    ...mapMutations(["setPlayIndex"]),
    changeValue(num) {
      let res = 0;
      if (num >= 100000000) {
        res = num / 100000000;
        res = res.toFixed(2) + "亿";
      } else if (num > 10000) {
        res = num / 10000;
        res = res.toFixed(2) + "万";
      }
      return res;
    },
    setPlay(i) {
      this.$store.commit("setPlayIndex", i);
      this.$store.commit("setPaused", false);
    },

    getSinger(item) {
      let singers = item.ar
        .map((obj) => {
          return obj.name;
        })
        .join("/");
      //   console.log(singers);
      return singers;
    },
  },
};
</script>


<style lang="less" scoped>
.playList {
  width: 7.5rem;
  padding: 0 0.4rem;
  background-color: #fff;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  margin-top: 0.4rem;
  .playlist-top {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 0.4rem;
        height: 0.4rem;
      }
      .title {
        font-size: 0.34rem;
        font-weight: 700;
      }
      .num {
        font-size: 0.24rem;
        color: #666;
      }
      .text {
        display: flex;
        align-items: center;
        margin-left: 0.2rem;
      }
    }
    .btn {
      font-size: 0.24rem;
      color: #fff;
      background-color: orangered;
      //   height: 0.6rem;
      line-height: 0.6rem;
      padding: 0.1rem;
      border-radius: 0.4rem;
    }
  }
  .list {
    .playItem {
      display: flex;
      justify-content: space-between;
      height: 1rem;
      align-items: center;
      margin: 0.2rem 0;
      .left {
        display: flex;
        align-items: center;
        color: #666;
        .index {
          width: 0.3rem;
        }
        .content {
          margin-left: 0.4rem;
          width: 4rem;
          //   overflow: hidden;
          //   text-overflow: ellipsis;
        }
        .title {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.32rem;
          font-weight: 900;
          color: #000;
          margin-bottom: 0.1rem;
        }
        .tag {
          display: inline-block;
          width: 0.4rem;
          text-align: center;
          font-size: 0.1rem;
          color: orangered;
          border: 1px solid orangered;
          border-radius: 0.1rem;
          margin: 0 0.05rem;
        }
        .anthor {
          width: 4rem;
          color: #666;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .right {
        .icon {
          margin: 0 0.2rem;
        }
      }
    }
  }
  .bottom {
    height: 1.2rem;
  }
}
</style>