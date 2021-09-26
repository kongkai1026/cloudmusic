<template>
  <div class="searchTop">
    <div class="searchTopNav">
      <div class="back" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-left"></use>
        </svg>
      </div>
      <div class="right">
        <input
          type="text"
          v-model="searchKeyWord"
          :placeholder="placeholder"
          @keydown.enter="saveKeyWord"
        />
      </div>
    </div>
    <div class="history">
      <div class="historyLeft">历史</div>
      <div class="historyRight">
        <div
          @click="historySearch(item)"
          class="keywordItem"
          v-for="(item, i) in keywordList"
          :key="i"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placeholder: "陈奕迅",
      keywordList: [],
      searchKeyWord: "",
    };
  },
  beforeMount() {
    this.keywordList = localStorage.keywordList
      ? JSON.parse(localStorage.keywordList)
      : [];
  },
  methods: {
    async saveKeyWord() {
      if (this.searchKeyWord != "") {
        this.keywordList.push(this.searchKeyWord);
      }
      this.keywordList = Array.from(new Set(this.keywordList));
      if (this.keywordList.length > 10) {
        this.keywordList = this.keywordList.slice(
          this.keywordList.length - 10,
          this.keywordList.length
        );
      }
      localStorage.keywordList = JSON.stringify(this.keywordList);
      this.$emit("searchKeyWord", this.searchKeyWord);
    },
    historySearch(keyword) {
      this.$emit("searchKeyWord", keyword);
      this.searchKeyWord = keyword;
    },
  },
};
</script>


<style lang="less" scoped>
.searchTop {
  width: 7.5rem;
  padding: 0 0.4rem;
  .searchTopNav {
    display: flex;
    width: 100%;
    height: 1.2rem;
    align-items: center;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
    .right {
      padding: 0 0 0 0.4rem;
      flex: 1;
      input {
        border: none;
        outline: none;
        border-bottom: 1px solid #666;
        width: 100%;
        height: 0.5rem;
      }
    }
  }
  .history {
    display: flex;
    .historyLeft {
      width: 1.2rem;
      height: 0.6rem;
      font-weight: 900;
      line-height: 0.6rem;
      margin: 0.2rem 0;
    }
    .historyRight {
      color: #666;
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      .keywordItem {
        background-color: #eee;
        height: 0.6rem;
        padding: 0 0.2rem;
        border-radius: 0.4rem;
        line-height: 0.6rem;
        margin: 0.2rem 0.1rem;
      }
    }
  }
}
</style>