<template>
  <div class="media-details">
    <div class="media-header">
      <h2>{{ mediaInfo.title }}</h2>
      <h4>{{ mediaInfo.author.name }}</h4>
      <h3>{{ mediaInfo.rating }}</h3>
    </div>
    <div class="materials">
      <material-item v-for="info in materials" :key="info.id" :info="info" />
    </div>
    <div>
      <post-review />
      <div class="reviews">
        <review v-for="review in reviews" :key="review.id" :review="review"/>
      </div>
    </div>
  </div>
</template>

<script>
import MaterialItem from "../components/MaterialItem.vue";
import PostReview from "../components/PostReview.vue";
import Review from "../components/Review.vue";

export default {
  components: { MaterialItem, PostReview, Review },
  props: {
    id: Number,
  },
  data() {
    return {
      mediaInfo: {
        id: 1,
        title: "Aaaa",
        kind: "Video",
        author: {
          id: 1,
          name: "Louis",
          country: "UA",
        },
        rating: 8.4,
      },
      materials: [
        {
          id: 4,
          format: ".jpeg",
          quality: "High",
          licenseName: "Free",
          downloadLink: "donwload.com/file1",
        },
        {
          id: 5,
          format: ".png",
          quality: "Very high",
          licenseName: "Free",
          downloadLink: "donwload.com/file2",
        },
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
          text: "Very cool",
        },
      ],
    };
  },
};
</script>

<style>
div.media-details {
  display: flex;
  flex-direction: column;
  margin: auto 2%;

  min-width: fit-content;
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

div.materials {
  display: block;
  margin: 2%;

  border-color: greenyellow;
  border-width: 2px;
  border-style: solid;
  border-radius: 10px;
}

div.reviews {
}
</style>