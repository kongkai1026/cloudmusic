<template>
  <div class="officialList">
    <section class="official-list-box">
      <h2 class="official-list-title">官方榜</h2>
      <ul class="official-list">
        <li
          v-for="(item, index) in officialList"
          :key="index"
          class="offical-list-unit"
        >
          <router-link :to="{ path: '/listview', query: { id: item.id } }">
            <div class="img-wrap">
              <img v-lazy="item.coverImgUrl" alt class="coverImg" />
            </div>
            <div class="tracks-box">
              <p
                v-for="(track, indexOfTrack) in item.tracks"
                :key="indexOfTrack"
                class="track-title"
              >
                {{ indexOfTrack + 1 }}.{{ track.first }} - {{ track.second }}
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  props: ["officialList"],
};
</script>

<style scoped lang='less'>
a {
  display: flex;
  align-items: center;
}
.officialList {
  width: 7.5rem;
  padding: 0 0.4rem;
  .official-list-box {
    padding-top: 0.3rem;
    .official-list-title {
      font-size: 0.4rem;
    }
    .official-list {
      padding-top: 0.2rem;
      .offical-list-unit {
        height: 2.2rem;
        .img-wrap {
          width: 30%;
          overflow: hidden;
          .coverImg {
            width: 100%;
            border-radius: 0.2rem;
          }
        }
        .tracks-box {
          width: 66%;
          .track-title {
            margin: 0.2rem 0.2rem;
            color: gray;
            font-size: 0.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>