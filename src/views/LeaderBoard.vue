<template>
  <div class="leaderBorad">
    <div class="TopListNav">
      <div class="back" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-left"></use>
        </svg>
      </div>
      <div class="right">排行榜</div>
    </div>
    <official-list
      :officialList="officialList"
      @click="dedao"
      v-if="isReady"
    ></official-list>
    <top-list title="推荐榜" :data="recommendList" v-if="isReady"></top-list>
    <top-list
      title="全球榜"
      :data="internationalList"
      v-if="isReady"
    ></top-list>
    <top-list title="更多榜单" :data="moreList" v-if="isReady">
      <div class="buttom">到底了！</div>
    </top-list>
  </div>
</template>

<script>
import { getTopList } from "../api/index.js";
import OfficialList from "../components/LeaderBorad/OfficialList.vue";
import topList from "../components/LeaderBorad/TopList.vue";

export default {
  data() {
    return {
      isReady: false,
      list: [],
      officialList: [],
      recommendList: [],
      internationalList: [],
      moreList: [],
    };
  },
  components: {
    OfficialList,
    topList,
  },
  async mounted() {
    let result = await getTopList();
    this.list = result.data.list;
    this.officialList = this.list.slice(0, 4);
    this.recommendList = this.list.slice(4, 10);
    this.internationalList = this.list.slice(10, 16);
    this.moreList = this.list.slice(16);
    this.isReady = true;
  },
  methods: {
    dedao() {
      console.log(this.officialList);
    },
  },
};
// setup() {
//   let list = reactive({
//     allList: [],
//     officialList: [],
//     recommendList: [],
//     internationalList: [],
//     moreList: [],
//   });
//   onMounted(async () => {
//     let res = await getTopList();
//     list.allList = res.data.list;
//     list.officialList = list.allList.slice(0, 4);
//     list.recommendList = list.allList.slice(4, 10);
//     list.internationalList = list.allList.slice(10, 16);
//     list.moreList = list.allList.slice(16);
//   });
//   return {
//     list,
//   };
// },
// components: {
//   OfficialList,
//   topList,
// },
</script>

<style lang="less" scoped>
.leaderBorad {
  .TopListNav {
    display: flex;
    width: 100%;
    height: 0.9rem;
    align-items: center;
    background-color: red;
    padding-left: 0.3rem;
    color: #fff;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      fill: #fff;
    }
    .right {
      flex: 1;
      font-size: 0.4rem;
      padding-left: 0.5rem;
    }
  }
}
.buttom {
  height: 1.2rem;
}
</style>