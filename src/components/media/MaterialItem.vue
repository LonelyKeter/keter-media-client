<template>
  <tr class="material-item">
    <td>{{ info.format }}</td>
    <td>{{ info.quality }}</td>
    <td>{{ info.use_count }} times</td>
    <td>
      <div v-if="info.rating">{{ info.rating }}</div>
      <div v-else>Unrated</div>
    </td>
    <td>
      <router-link
        :to="{ name: 'LicenseDetails', params: { key: info.licenseName } }"
      >
        {{ info.licenseName }}
      </router-link>
    </td>
    <td v-if="info.isUsed !== null">
      <button v-if="info.isUsed" @click="onDownloadClick">Download</button>
      <button v-else @click="onUseClick">Use</button>
    </td>
    <td v-else>
      <p class="warning1">Login to use</p>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

import { MaterialInfo } from "@/model/media";
import { isApiError, isApiSuccess, Media } from "@/api";

interface Data {
  isUsed: null | boolean;
}

export default defineComponent({
  props: {
    info: {
      type: Object as PropType<MaterialInfo>,
      required: true,
    },
    ratingEnabled: Boolean,
  },
  data(): Data {
    return {
      isUsed: false,
    };
  },
  methods: {
    async onDownloadClick() {
      const authToken = this.$store.state.user.token;

      if (!authToken) {
        alert("Unexpected: authentication required");
        return;
      }

      const downloadToken = await Media.getMaterialDownloadToken(
        this.info.id,
        authToken
      );

      if (isApiError(downloadToken)) {
        alert("Couldn't get download token");
        return;
      }

      const downloadUrl = Media.createMaterialDownloadURL(downloadToken);

      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = downloadUrl;
      link.setAttribute("type", "hidden");
      link.setAttribute("download", "true");
      link.click();
      document.body.removeChild(link);
    },
    onUseClick() {
      this.$router.push({
        name: "MaterialDetails",
        params: { id: this.info.id },
      });
    },
  },
});
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