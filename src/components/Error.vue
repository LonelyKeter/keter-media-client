<template>
  <div class="error-wraper">
    <h1>{{message}}</h1>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  }
}
</script>

<style>
  div.error-wrapper {
    margin: auto;    
    padding: auto;
  }
</style>