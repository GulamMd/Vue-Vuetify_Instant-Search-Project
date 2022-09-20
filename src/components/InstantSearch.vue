<template>
  <v-container class="container-body">
    <v-text-field
      v-model="searchText"
      solo
      single-line
      prepend-inner-icon="mdi-magnify"
      placeholder="Enter your search terms"
      @keyup="searchInternal()"
      clear-icon="mdi-close-circle"
      clearable
      @click:clear="
        () => {
          searchText = '';
          updateSearchTxtFun();
        }
      "
    ></v-text-field>
    <v-list two-line>
      <template v-for="item in tempArr">
        <v-hover :key="'A' + item.title">
          <template v-slot:default="{ hover }">
            <div
              :class="`elevation-${hover ? 24 : 6}`"
              class="mx-auto pa-1 transition-swing"
            >
              <v-list-item :key="item.title" :href="item.url">
                <v-list-item-avatar>
                  <v-img :src="item.image"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <div class="itemsTitle">
                    <v-list-item-title>
                      <span>{{ item.title }}</span>
                    </v-list-item-title>
                    <v-btn icon target="_blank" :href="item.url">
                      <font-awesome-icon icon="fas fa-external-link-alt" />
                    </v-btn>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </div>
          </template>
        </v-hover>
        <v-divider :key="item.url" v-if="tempArr.length > 0"></v-divider>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",

  data: () => ({
    searchText: "",
    articles: [],
    tempArr: [],
  }),
  watch: {
    articles: {
      handler(n) {
        this.tempArr = [];
        this.tempArr.push(...n);
      },
      immediate: true,
    },
  },
  async mounted() {
    this.getApi();
  },
  methods: {
    searchInternal() {
      let searchTxt = this.searchText.trim().toLowerCase();
      if (searchTxt === "") {
        this.tempArr = [];
        this.tempArr.push(...this.articles);
        return;
      }
      let filterArr = this.tempArr.filter((item) => {
        return searchTxt
          .split(" ")
          .every((v) => item.title?.toLowerCase().includes(v));
      });
      this.tempArr = [];
      this.tempArr.push(...filterArr);
    },
    updateSearchTxtFun() {
      this.tempArr = this.articles;
    },
    async getApi() {
      let apiData = await axios.get("http://localhost:3000/articles");
      this.articles = apiData.data;
    },
  },
};
</script>
<style scoped>
.container-body {
  width: 50vw;
}
.itemsTitle {
  display: inline-flex;
}
.iconStyle {
  display: inline-block;
}
</style>
