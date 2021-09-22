<template>
  <div class="media-details" v-if="mediaInfo">
    <media-header :mediaInfo="mediaInfo" />
    <table class="materials">
      <colgroup>
        <col width="20%" />
        <col width="20%" />
        <col width="5%" />
        <col width="10%" />
        <col width="auto" />
      </colgroup>
      <material-item v-for="info in materials" :key="info.id" :info="info" />
    </table>
    <add-material />
    <div class="review-section">
      <post-review :mediaId="mediaInfo?.id" v-if="$store.getters.loggedIn" />
      <p v-else>Login to rate and leave comment</p>
      <p>Reviews</p>
      <div class="reviews">
        <review
          v-for="review in reviews"
          :key="Number(review.id)"
          :review="review"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  MaterialInfo,
  MediaInfo,
  MediaKey,
  toMediaKey,
  UserReview,
} from "@/model/media";
import { defineComponent } from "@vue/runtime-core";
import { RouteParams } from "vue-router";

import { MaterialItem, AddMaterial, MediaHeader } from "@/components/media";
import { PostReview, Review } from "@/components/reviews";

import media from "@/api/media";

interface Data {
  mediaInfo: MediaInfo | null;
  materials: MaterialInfo[] | null;
  reviews: UserReview[] | null;
}

function extractId(params: RouteParams): MediaKey {
  const id = params.id;

  if (typeof id === "string") {
    return toMediaKey(id);
  } else {
    return toMediaKey(id[0]);
  }
}

export default defineComponent({
  components: { MaterialItem, PostReview, Review, MediaHeader, AddMaterial },
  data() {
    return {
      mediaInfo: null,
      materials: null,
      reviews: null,
    } as Data;
  },
  methods: {
    async loadMedia(id: MediaKey) {
      this.mediaInfo = await media.getMedia(id);
    },
    async loadMaterials(mediaId: MediaKey) {
      this.materials = await media.getMaterials(mediaId);
    },
    async loadReviews(mediaId: MediaKey) {
      this.reviews = await media.getReviews(mediaId);
    },
  },
  computed: {
    loggedIn() {
      !!this.$store.state.user.info;
    },
  },
  created() {
    const id = extractId(this.$router.currentRoute.value.params);

    this.loadMedia(id);
    this.loadMaterials(id);
    this.loadReviews(id);
  },
});
</script>

<style>
div.media-details {
  min-width: fit-content;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
}

div.media-details > div {
  margin: 2%;
  width: fit-content;
}

table.materials {
  margin: 2%;

  border-color: var(--green1);
  border-width: 2px;
  border-style: solid;
  border-radius: 10px;

  min-width: 75%;
}

div.reviews {
  justify-content: left;
}
</style>