<template>
  <div class="topList">
    <section class="top-list-box">
      <h2 class="top-list-item-title">{{ title }}</h2>
      <ul class="top-list">
        <li v-for="(item, index) in data" :key="index" class="top-list-unit">
          <router-link :to="{ path: '/listview', query: { id: item.id } }">
            <div class="img-wrap">
              <img v-lazy="item.coverImgUrl" alt class="coverImg" />
            </div>
            <h3 class="top-list-title">{{ item.name }}</h3>
          </router-link>
        </li>
      </ul>
    </section>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["data", "title"],
};
</script>

<style scoped lang='less'>
.topList {
  width: 7.5rem;
  padding: 0 0.4rem;
  .top-list-box {
    padding-top: 0.2rem;
    .top-list-item-title {
      font-size: 0.4rem;
    }

    .top-list {
      padding-top: 0.2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .top-list-unit {
        width: 32%;
        margin-bottom: 0.3rem;
        .img-wrap {
          overflow: hidden;
          .coverImg {
            width: 100%;
            border-radius: 0.2rem;
          }
        }
        .top-list-title {
          color: gray;
          font-weight: 400;
          font-size: 0.12rem;
        }
      }
    }
  }
}
</style>