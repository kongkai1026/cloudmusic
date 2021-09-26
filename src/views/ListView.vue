<template>
  <div class="listview">
    <listviewtop :playlist="state.playlist"></listviewtop>
    <playlist :playlist="state.playlist"></playlist>
  </div>
</template>


<script>
import listviewtop from "../components/GeDanDetail/ListviewTop.vue";
import playlist from "../components/GeDanDetail/PlayList.vue";

import { getPlaylistDetail } from "@/api/index";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import store from "@/store/index.js";
export default {
  setup() {
    const route = useRoute();
    let state = reactive({
      list: [],
      playlist: {
        creator: {},
        tracks: [],
      },
    });
    onMounted(async () => {
      let id = route.query.id;
      let result = await getPlaylistDetail(id);
      state.playlist = result.data.playlist;
      console.log(result.data.playlist);
      store.commit("setPlaylist", state.playlist.tracks);
    });
    return {
      state,
    };
  },
  components: {
    listviewtop,
    playlist,
  },
};
</script>