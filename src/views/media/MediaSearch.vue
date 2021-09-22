<template>
  <div>
    <media-search-bar />
    <colgroup>
      <col width="auto" />
      <col width="auto" />
      <col width="5%" />
      <col width="10%" />
      <col width="10%" />
    </colgroup>
    <table class="wide">
      <media-item
        v-for="info in mediaInfos"
        :key="Number(info.id)"
        :info="info"
      />
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { MediaItem, MediaSearchBar} from "@/components/media";

import Media from "@/api/media";

import { MediaInfo } from "@/model/media";

export default defineComponent({
  components: {
    MediaSearchBar,
    MediaItem,
  },
  data() {
    return {
      mediaInfos: [] as MediaInfo[],
    };
  },
  methods: {
    async loadMedia() {
      try {
        this.mediaInfos = await Media.getMedia();
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    this.loadMedia();
  },
});
</script>

<style>
</style>