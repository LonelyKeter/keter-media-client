<template>
  <tr class="row-1">
    <td v-if="userInfo">
      <router-link :to="{ name: 'User', params: { id: userInfo.id } }">
        {{ userInfo.name }}
      </router-link>
    </td>
    <td>
      <router-link
        :to="{ name: 'MaterialDetails', params: { id: usage.materialId } }"
      >
        {{ usage.materialId }}
      </router-link>
    </td>
    <td>
      <div>
        {{ dateString }}
      </div>
    </td>
    <td>
      <router-link
        :to="{ name: 'LicenseDetails', params: { key: usage.license.id } }"
      >
        {{ usage.license.title }}
      </router-link>
    </td>
    <td v-if="ratingEnabled">
        Your rating: 
        <input type="number" v-model="rating" min="0" max="10">
    </td>
    <td v-if="downloadEnabled">
      <button @click="download()">Download</button>
    </td>
  </tr>
</template>

<script lang="ts">
import { Usage } from "@/model/usage";
import { UserInfo } from "@/model/userinfo";
import { defineComponent, PropType } from "@vue/runtime-core";
import vue3StarRatings from "vue3-star-ratings";
import media from "@/api/media";
import { isApiError } from "@/api";

interface Data {
  dateString: string;
  ratingValue: number;
}

export default defineComponent({
  components: {
    vue3StarRatings,
  },
  props: {
    userInfo: {
      type: Object as PropType<UserInfo>,
      required: false,
    },
    usage: {
      type: Object as PropType<Usage>,
      required: true,
    },
    ratingEnabled: {
      type: Boolean,
      default: false,
    },
    downloadEnabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props): Data {
    const dateString = new Date(props.usage.date).toLocaleDateString(
      undefined,
      {
        weekday: "narrow",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

    return {
      dateString,
      ratingValue: props.usage.rating ?? 0,
    };
  },
  computed: {
    rating: {
      get(): number {
        return this.ratingValue;
      },
      set(newVal: number) {
        this.updateRating(Number(newVal));
      },
    },
  },
  methods: {
    async download() {
      //TODO: Absract download in mix-ins
      const authToken = this.$store.state.user.token;

      if (!authToken) {
        alert("Unexpected: authentication required");
        return;
      }

      const downloadToken = await media.getMaterialDownloadToken(
        this.usage.materialId,
        authToken
      );

      if (isApiError(downloadToken)) {
        alert("Couldn't get download token");
        return;
      }

      const downloadUrl = media.createMaterialDownloadURL(downloadToken);

      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = downloadUrl;
      link.setAttribute("type", "hidden");
      link.setAttribute("download", "true");
      link.click();
      document.body.removeChild(link);
    },
    async updateRating(rating: number) {
      if (rating === 0) {
        return;
      }

      const token = this.$store.state.user.token;

      if (!token) {
        alert("Unauthenticated. Please log in to rate material.");
        return;
      }

      const result = await media.putMeterialRating(
        this.usage.materialId,
        {
          rating,
        },
        token
      );

      if (isApiError(result)) {
        alert("Error occured while updating rating");
        this.ratingValue = this.ratingValue;
      } else {
        this.ratingValue = rating;
      }
    },
  },
});
</script>

<style>
</style>