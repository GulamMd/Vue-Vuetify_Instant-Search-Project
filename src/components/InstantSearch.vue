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
                      <font-awesome-icon icon="fas fa-external-link-alt"/>
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
export default {
  name: "HelloWorld",

  data: () => ({
    searchText: "",
    articles: [
      {
        title: "What You Need To Know About CSS Variables",
        url: "https://tutorialzine.com/2016/03/what-you-need-to-know-about-css-variables/",
        image: "https://tutorialzine.com/media/2016/03/css-variables.jpg",
      },
      {
        title: "Freebie: 4 Great Looking Pricing Tables",
        url: "https://tutorialzine.com/2016/02/freebie-4-great-looking-pricing-tables/",
        image:
          "https://tutorialzine.com/media/2016/02/great-looking-pricing-tables.jpg",
      },
      {
        title: "20 Interesting JavaScript and CSS Libraries for February 2016",
        url: "https://tutorialzine.com/2016/02/20-interesting-javascript-and-css-libraries-for-february-2016/",
        image:
          "https://tutorialzine.com/media/2016/02/interesting-resources-february.jpg",
      },
      {
        title: "Quick Tip: The Easiest Way To Make Responsive Headers",
        url: "https://tutorialzine.com/2016/02/quick-tip-easiest-way-to-make-responsive-headers/",
        image:
          "https://tutorialzine.com/media/2016/02/quick-tip-responsive-headers.png",
      },
      {
        title: "Learn SQL In 20 Minutes",
        url: "https://tutorialzine.com/2016/01/learn-sql-in-20-minutes/",
        image:
          "https://tutorialzine.com/media/2016/01/learn-sql-20-minutes.png",
      },
      {
        title: "Creating Your First Desktop App With HTML, JS and Electron",
        url: "https://tutorialzine.com/2015/12/creating-your-first-desktop-app-with-html-js-and-electron/",
        image:
          "https://tutorialzine.com/media/2015/12/creating-your-first-desktop-app-with-electron.png",
      },
    ],
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
