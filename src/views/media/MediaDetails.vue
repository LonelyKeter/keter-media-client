<template>
  <div class="media-details" v-if="mediaInfo">
    <media-header :mediaInfo="mediaInfo" />
    <table class="materials" v-if="materialsDisplayed">
      <colgroup>
        <col width="auto" />
        <col width="auto" />
        <col width="10%" />
        <col width="10%" />
        <col width="auto" />
        <col width="auto" />
      </colgroup>
      <material-table-header/>
      <material-item v-for="info in materials" :key="info.id" :info="info" />
    </table>
    <div v-else>
        <h3>Author didn't upload any materials yet</h3>
    </div>
    <div v-if="isCurrentUser">
      <add-material :mediaId="mediaInfo.id" @material-uploaded="onMaterialUploaded"/>
      <div>
        <p>Usages</p>
        <table v-if="usages">
          <usage-item
            v-for="item in usages"
            :key="String(item.usage.materialId) + ' ' + String(item.user.id)"
            :usage="item.usage"
            :userInfo="item.user"
          />
        </table>
      </div>
    </div>
    <div class="review-section">
      <div v-if="!alreadyReviewed">
        <post-review :mediaId="mediaInfo?.id" v-if="$store.getters.loggedIn" />
        <p v-else>Login to rate and leave comment</p>
      </div>
      <p>Reviews</p>
      <div class="reviews">
        <review v-for="review in reviews" :key="review.id" :review="review" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  MaterialInfo,
  MaterialKey,
  MediaInfo,
  MediaKey,
  toMediaKey,
  UserReview,
} from "@/model/media";
import { defineComponent } from "@vue/runtime-core";
import { RouteParams } from "vue-router";

import { MaterialItem, AddMaterial, MediaHeader, MaterialTableHeader } from "@/components/media";
import { PostReview, Review } from "@/components/reviews";

import { Media, isApiSuccess } from "@/api";
import { UserUsage } from "@/model/usage";
import UsageItem from "@/components/UsageItem.vue";

interface Data {
  mediaInfo: MediaInfo | null;
  materials: MaterialInfo[] | null;
  reviews: UserReview[] | null;
  usages: UserUsage[] | null;
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
  components: {
    MaterialItem,
    PostReview,
    Review,
    MediaHeader,
    AddMaterial,
    UsageItem,
    MaterialTableHeader,
  },
  data(): Data {
    return {
      mediaInfo: null,
      materials: null,
      reviews: null,
      usages: null,
    };
  },
  methods: {
    async loadMedia(id: MediaKey) {
      const result = await Media.getMedia(id);

      if (isApiSuccess(result)) {
        this.mediaInfo = result;
      }
    },
    async loadMaterials(mediaId: MediaKey) {
      const result = await Media.getMaterials(mediaId, this.$store.state.user.token);

      if (isApiSuccess(result)) {
        this.materials = result;
      }
    },
    async loadReviews(mediaId: MediaKey) {
      const result = await Media.getReviews(mediaId);

      if (isApiSuccess(result)) {
        this.reviews = result;
      }
    },
    async loadUsages(mediaId: MediaKey) {
      const result = await Media.getMediaUsages(mediaId);

      if (isApiSuccess(result)) {
        this.usages = result;
      }
    },
    async onMaterialUploaded({ materialId } : { materialId: MaterialKey }) {
        const token = this.$store.state.user.token;

        const result = await Media.getMaterial(materialId, token);
        if (isApiSuccess(result)) {
            this.materials?.push(result);
        }        
    }    
  },
  computed: {
    loggedIn(): boolean {
      return !!this.$store.state.user.info;
    },
    isCurrentUser(): boolean {
      const info = this.mediaInfo;
      if (info) {
        return this.$store.getters.isCurrentUser(info.author.id);
      } else {
        return false;
      }
    },
    materialsDisplayed(): boolean {
        return (this.materials !== null && this.materials.length > 0);
    },
    alreadyReviewed(): boolean {
        return (!!this.reviews?.find(review => this.$store.getters.isCurrentUser(review.userInfo.id)));
    }
  },
  created() {
    const id = extractId(this.$router.currentRoute.value.params);

    this.loadMedia(id);
    this.loadMaterials(id);
    this.loadUsages(id);
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

  border-collapse: separate;
  border-spacing: 0 5pt;

  min-width: 75%;
}

table.materials > tr.materials-header {
  border-width: 0 0 2px 0;
}

div.review-section {
  min-width: 50%;
}

div.reviews {
  justify-content: left;
}
</style>