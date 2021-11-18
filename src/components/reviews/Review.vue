<template>
  <div class="review">
    <div>
      <h4>{{ review.userInfo.name }}</h4>
    </div>
    <div class="review-text">
      <p>{{ review.text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserReview } from "@/model/media";

export default defineComponent({
  props: {
    review: {
      type: Object as PropType<UserReview>,
      required: true,
    },
  },
});
</script>

<style>
div.review {
  margin: 10px;
  padding: 5px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  font-size: x-small;
}

div.review > div {
  display: flex;
  flex-direction: row;
}

div.review p {
  margin: auto 10pt;
}

div.review p.rating {
  color: orange;
}

div.review-text {
  padding: 10px 0;

  border: 1px solid rgba(128, 128, 128, 0.158);
  border-radius: 10px;

  width: 100%;
}
</style>