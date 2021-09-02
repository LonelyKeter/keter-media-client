<template>
  <div>
    <div>{{info.format}}</div>
    <div>{{info.quality}}</div>
    <div>{{info.licenseName}}</div>
    <div>{{info.downloadLink}}</div>
  </div>
</template>

<script>
export default {
  props: {
    info : {
      id: Number,
      format: String,
      quality: String,
      liсenseName: String,
      downloadLink: String
    }
  }
}
</script>

<style scoped>
  div {
    display: grid;
    grid-template-columns: 10% 10% 10% 10%;
    
    margin: 2px 10px;
    padding: 3px;

    min-width: fit-content;
    font-size: smaller;
  }
</style>