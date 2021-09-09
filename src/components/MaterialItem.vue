<template>
  <tr class="material-item">
    <td>{{info.format}}</td>
    <td>{{info.quality}}</td>
    <td>{{info.size}}</td>
    <td>{{info.licenseName}}</td>
    <td>{{info.downloadLink}}</td>
  </tr>
</template>

<script>
export default {
  props: {
    info : {
      id: Number,
      format: String,
      quality: String,
      size: Number,
      liсenseName: String,
      downloadLink: String
    }
  }
}
</script>

<style>
  tr.material-item {    
    margin: 2px 10px;
    padding: auto 5px;

    gap: 1em;

    min-width: fit-content;
    font-size: smaller;
  }
</style>