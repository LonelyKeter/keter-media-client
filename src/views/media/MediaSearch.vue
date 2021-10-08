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

import { MediaItem, MediaSearchBar } from "@/components/media";

import { Media, isApiSuccess } from "@/api";

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
      const result = await Media.getMedia();

      if (isApiSuccess(result)) {
        this.mediaInfos = result;
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