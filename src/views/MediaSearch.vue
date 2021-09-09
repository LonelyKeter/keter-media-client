<template>
  <div>
    <media-search-bar /> 
      <colgroup>
        <col width = "auto"/>
        <col width = "auto"/>
        <col width = "5%"/>
        <col width = "10%"/>
        <col width = "10%"/>
      </colgroup>  
    <table class="wide">
      <media-item v-for="info in mediaInfos" :key="info.id" :info="info" />
    </table>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import MediaItem from "../components/MediaItem.vue";
import MediaSearchBar from "../components/MediaSearchBar.vue";

import Media from "../api/media";

export default defineComponent({
  components: {
    MediaSearchBar,
    MediaItem,
  },
  data() {
    return {
      mediaInfos: [
        {
          id: 1,
          title: "Aadawdawdawdawdaa",
          kind: "Video",
          author: {
            id: 1,
            name: "Louis",
            country: "UA",
          },
          rating: 8.4,
        },
        {
          id: 2,
          title: "Aaaa",
          kind: "Video",
          author: {
            id: 1,
            name: "Louis",
            country: "UA",
          },
          rating: 8.4,
        },
      ],
    };
  },
  methods: {
    async getMedia() {
      try {
        this.mediaInfos = await Media.getMedia();
      } catch(e) {
        console.log(e);
      }
    }
  },
  created() {
    this.getMedia()
  }
});
</script>

<style>
</style>