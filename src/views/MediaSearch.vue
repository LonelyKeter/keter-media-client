<template>
  <div>
    <media-search-bar/>
    <media-item v-for="info in mediaInfos" :key="info.id" :info="info"/>
  </div>
</template>

<script>
import MediaItem from '../components/MediaItem.vue';
import MediaSearchBar from '../components/MediaSearchBar.vue';

export default {
  components: {
    MediaSearchBar,
    MediaItem
  },
  data() {
    return {
      mediaInfos: [{
        id: 1,
        title: "Aaaa",
        kind: "Video",
        author: {
          id: 1,
          name: "Louis",
          country: "UA"
        },
        rating: 8.4
      },
      {
        id: 2,
        title: "Aaaa",
        kind: "Video",
        author: {
          id: 1,
          name: "Louis",
          country: "UA"
        },
        rating: 8.4
      }]
    }
  },
  setup() {

  }
}
</script>

<style>

</style>