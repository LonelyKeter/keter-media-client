<template>
  <tr class="material-item">
    <td>{{ info.format }}</td>
    <td>{{ info.quality }}</td>
    <td>
      <router-link
        :to="{ name: 'LicenseDetails', params: { key: info.licenseName } }"
      >
        {{ info.licenseName }}
      </router-link>
    </td>
    <td>
      <button
        @click="
          $router.push({ name: 'DownloadMaterials', params: { id: info.id } })
        "
      >
        Download
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { MaterialInfo } from "@/model/media";

export default defineComponent({
  props: {
    info: {
      type: Object as PropType<MaterialInfo>,
      required: true,
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