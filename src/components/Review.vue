<template>
  <div class="review">
    <div>
      <h4>{{ review.userInfo.name }}</h4>
      <p class="rating">{{ review.rating }}</p>
    </div>
    <div class="review-text">
      <p>{{ review.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: {
      id: Number,
      userInfo: {
        id: Number,
        name: String,
      },
      rating: Number,
      text: String,
    },
  },
};
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
  border-radius:10px;  

  width: 100%;
}
</style>