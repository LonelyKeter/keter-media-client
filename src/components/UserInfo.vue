<template>
  <div class="user-info">
    <p>{{info.name}}</p>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      id: Number,
      name: String
    }
  },
}
</script>

<style>
  div.user-info {
    width: fit-content;
  }
</style>