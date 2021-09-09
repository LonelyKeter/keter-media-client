<template>
  <div>
    <input :value="searchText" placeholder="Type title here..."/>
    <button type="submit">
      Search
    </button>
  </div>
</template>

<script>
export default {
  props: {
    searchText: ""
  }
}
</script>

<style scoped>
  div {
    margin: 10mm 0 0 0;
  }

  input {
    min-width: 50%;
    font-size: larger;
  }
</style>