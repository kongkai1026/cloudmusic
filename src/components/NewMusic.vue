<template>
  <div class="newMusic">
    <div class="musiclist-top">
      <div class="title">最新音乐</div>
      <div class="more">查看更多</div>
    </div>
    <div class="list">
      <div
        class="playItem"
        v-for="(item, i) in newMusicList"
        :key="i"
        @click="setPlay(item)"
      >
        <div class="left">
          <div class="index">
            <img v-lazy="item.picUrl" alt="" />
          </div>

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
        </div>
      </div>
    </div>
    <div class="bottom">到底了！！</div>
  </div>
</template>

<script>
import { getNewMusic } from "@/api/index.js";

export default {
  data() {
    return {
      newMusicList: [],
    };
  },
  async mounted() {
    let result = await getNewMusic();
    this.newMusicList = result.data.result;
    // console.log(result.data.result);
  },
  methods: {
    getSinger(item) {
      let singers = item.song.artists
        .map((obj) => {
          return obj.name;
        })
        .join("/");
      //   console.log(singers);
      return singers;
    },
    setPlay(item) {
      item.al = item.song.album;
      item.al.picUrl = item.picUrl;
      this.$store.commit("pushPlaylist", item);
      this.$store.commit("setPlayIndex", this.$store.state.playlist.length - 1);
      this.$store.commit("setPaused", false);
    },
  },
};
</script>

<style lang="less" scoped>
.newMusic {
  width: 7.5rem;
  padding: 0 0.4rem;
  //   margin-top: 0.1rem;
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
  .list {
    .playItem {
      display: flex;
      justify-content: space-between;
      height: 1rem;
      align-items: center;
      margin: 0.4rem 0;
      .left {
        display: flex;
        align-items: center;
        color: #666;
        .index {
          width: 1rem;
          display: flex;
          align-items: center;
          img {
            width: 100%;
            height: 100%;
            border-radius: 0.2rem;
          }
        }
        .content {
          margin-left: 0.3rem;
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
          width: 0.5rem;
          height: 0.5rem;
        }
      }
    }
  }
  .bottom {
    height: 1.2rem;
  }
}
</style>