<template>
  <form class="post-review" @submit.prevent="submitReview()">
    <label>Leave comment</label>
    <textarea v-model="text" class="review-input"/>
    <p>{{text}}</p>
    <star-rating @ratingChanged="updateRating" />
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StarRating from "./StarRating.vue";

interface Data {
  rating: number;
  text?: string;
}

export default defineComponent({
  components: { StarRating },
  data() {
    return {
      rating: 0 as number,
      text: ''
    } as Data;
  },
  methods: {
    updateRating(newRating: number) {
      this.rating = newRating;
    },
    async submitReview() {
        console.log("Submitted");
        console.log(this.text);
    }   
  },
});
</script>

<style>
form.post-review {
  width: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.post-review > * {
  float: right;
}

.post-review > button {
  margin: 0;
  width: fit-content;
}

textarea.review-input {
  width: 60%;
  min-width: 300px;
  max-width: 500px;
  padding: 7pt;

  resize: none;
}
</style>