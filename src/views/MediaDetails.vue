<template>
  <div class="media-details">
    <div class="media-header">
      <div>
        <h2>{{ mediaInfo.title }}</h2>
        <router-link
          :to="{ name: 'User', params: { id: mediaInfo.author.id } }"
        >
          {{ mediaInfo.author.name }}
        </router-link>
        <h3>{{ mediaInfo.rating }}</h3>
      </div>
    </div>
    <table class="materials">     
      <colgroup>
        <col width = "20%"/>
        <col width = "20%"/>
        <col width = "5%"/>
        <col width = "10%"/>
        <col width = "auto"/>
      </colgroup>   
      <material-item v-for="info in materials" :key="info.id" :info="info" />
    </table>
    <div class="review-section">
      <post-review />
      <p>Reviews</p>
      <div class="reviews">
        <review v-for="review in reviews" :key="review.id" :review="review" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MaterialInfo, MediaInfo } from "@/model/media";
import { defineComponent } from "@vue/runtime-core";
import MaterialItem from "../components/MaterialItem.vue";
import PostReview from "../components/PostReview.vue";
import Review from "../components/Review.vue";

const mediaInfo: MediaInfo = {
  id: BigInt(1),
  title: "Aaaa",
  kind: "Video",
  author: {
    id: BigInt(1),
    name: "Louis",
    country: "UA",
  },
  rating: 8.4,
};

const material1: MaterialInfo = {
  id: BigInt(4),
  format: ".jpeg",
  quality: "High",
  licenseName: "Free",
  size: BigInt(12345),
  downloadLink: "donwload.com/file1",
};
const material2: MaterialInfo = {
  id: BigInt(5),
  format: ".png",
  quality: "Very high",
  size: BigInt(54321),
  licenseName: "Free",
  downloadLink: "donwload.com/filedawdad2",
};

export default defineComponent({
  components: { MaterialItem, PostReview, Review },
  data() {
    return {
      mediaInfo,
      materials: [
          material1,
          material2
      ],
      reviews: [
        {
          id: 5,
          userInfo: {
            id: 10,
            name: "John",
          },
          rating: 5,
          text: "Cool",
        },
        {
          id: 13,
          userInfo: {
            id: 12,
            name: "John",
          },
          rating: 9,
          text: "Very cool фцввввввввввввввввввввввввввввввввв",
        },
      ],
    };
  },
  methods: {
      
  }
});
</script>

<style>
div.media-details {
  min-width: fit-content;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
}

div.media-details > div {
  margin: 2%;
  width: fit-content;
}

.media-header {
  display: block;

  margin: 1% 5%;
  float: left;
  text-align: left;
}

.media-header > h2 {
  margin: 0 0 0 1;
}

.media-header > h4 {
  margin: 0;
  color: grey;
}

table.materials {
  margin: 2%;

  border-color: var(--green1);
  border-width: 2px;
  border-style: solid;
  border-radius: 10px;

  min-width: 75%;
}

div.reviews {
  justify-content: left;
}
</style>