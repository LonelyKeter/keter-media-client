<template>
  <div class="review">
    <div>
    <p>{{review.userInfo.name}}</p>
    <p>{{review.rating}}</p>
    </div>
    <p>{{review.text}}</p>
  </div>
</template>

<script>
export default {
  props: {
    review: {
      id: Number,
      userInfo: {
        id: Number,
        name: String
      },
      rating: Number,
      text: String
    }
  }
}
</script>

<style>
  div.review {
    margin: 10px;
    padding: 5px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    border-style: solid;
    border-width: 1px;
    border-color: rgba(128, 128, 128, 0.158);
    border-radius: 10px;
  }

  
  div.review > * {
    font-size: small;
  }
</style>