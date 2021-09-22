<template>
  <form class="post-review" @submit.prevent="submitReview()">
    <label>Leave comment</label>
    <textarea v-model="text" class="review-input" />
    <star-rating @ratingChanged="updateRating" />
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import media from "@/api/media";
import { Review, MediaKey, mediaKeyConstructor } from "@/model/media";
import { defineComponent, PropType } from "vue";
import StarRating from "@/components/reviews/StarRating.vue";

interface Data {
  rating: number;
  text?: string;
}

export default defineComponent({
  components: { StarRating },
  props: {
    mediaId: {
      type: Object as PropType<MediaKey>,
      required: true,
    },
  },
  data() {
    return {
      rating: 0 as number,
      text: undefined,
    } as Data;
  },
  methods: {
    updateRating(newRating: number) {
      this.rating = newRating;
    },

    async submitReview() {
      if (this.rating === 0) {
        alert("Rate product to submit");
        return;
      }

      let review = {
        rating: this.rating,
      } as Review;

      if (this.text != undefined && this.text.length > 0) {
        review.text = this.text;
      }

      const token = this.$store.state.user.token;

      if (!token) {
        alert("No auth token error");
        return;
      } else {
          console.log(review);
          alert(JSON.stringify(review));

        await media.postReview(this.mediaId, review, token);
      }
    },
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