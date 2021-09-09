<template>
  <div class="post-review">
    <label>Leave comment</label>
    <textarea class="review-input" />
    <star-rating @ratingChanged="updateRating"/>
    <button type="submit">Submit</button>
  </div>
</template>

<script>
import StarRating from './StarRating.vue';

export default {
  components: { StarRating },
  data() {
    return {
      rating: 0
    }
  },
  methods: {
    updateRating(newRating) {
      this.rating = newRating;
    }
  }
  };
</script>

<style>
div.post-review {
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