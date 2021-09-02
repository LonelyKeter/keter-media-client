<template>
  <div class="post-review">
    <textarea class="review-input" />
    <star-rating/>
    <button>Submit</button>
  </div>
</template>

<script>
import StarRating from './StarRating.vue';
export default {
  components: { StarRating },};
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

  height: 100px;
  padding: 7pt;

  resize: none;
}
</style>