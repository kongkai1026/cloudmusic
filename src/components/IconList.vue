<template>
  <div class="iconlist">
    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-faxian_meirituijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-faxian_sirenFM1"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-faxian_gedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconitem" @click="this.$router.push('/leaderboard')">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-faxian_paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>


<style lang="less" scoped>
.iconlist {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  .iconitem {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 1.8rem;
      height: 1.8rem;
    }
    span {
      font-size: 0.26rem;
    }
  }
}
</style>