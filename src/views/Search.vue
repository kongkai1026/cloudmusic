<template>
  <div class="searchPage">
    <search-top @searchKeyWord="getKeyword"></search-top>
    <song-list :searchSongs="searchSongs"></song-list>
  </div>
</template>


<script>
import SearchTop from "../components/SearchView/SearchTop.vue";
import SongList from "../components/SearchView/SongList.vue";
import { searchMusic } from "@/api/index.js";

export default {
  data() {
    return {
      searchKeyword: "",
      searchSongs: [],
    };
  },
  components: {
    SearchTop,
    SongList,
  },
  methods: {
    getKeyword(data) {
      this.searchKeyword = data;
    },
  },
  watch: {
    async searchKeyword() {
      let result = await searchMusic(this.searchKeyword);
      this.searchSongs = result.data.result.songs;
      // console.log(result.data.result.songs);
    },
  },
};
</script>