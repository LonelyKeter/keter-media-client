<template>
  <div class="media-header">
      <div>
        <h2>{{ mediaInfo.title }}</h2>
        <router-link
          :to="{ name: 'User', params: { id: mediaInfo.author.id } }"
        >
          {{ mediaInfo.author.name }}
        </router-link>
        <h3>Rating: {{ roundedRating }}<br/>Used: {{ mediaInfo.use_count }}</h3>
      </div>
    </div>
</template>

<script lang="ts">import { MediaInfo } from "@/model/media";
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
    props: {
        mediaInfo: {
            type: Object as PropType<MediaInfo>,
            required: true
        }
    },
    computed: {
        roundedRating(): string {
            return this.mediaInfo.rating?.toPrecision(4) ?? ""
        }
    }
});
</script>

<style>
.media-header {
  display: block;

  margin: 1% 5%;
  float: left;
  text-align: left;
}

.media-header > h2 {
  margin: 0 0 0 1;
}

.media-header > h4 {
  margin: 0;
  color: grey;
}
</style>