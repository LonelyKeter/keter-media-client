<template>
  <div class="license-view">
    <license-component v-if="license" :license="license" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteParams } from "vue-router";

import { LicenseComponent } from "@/components/licenses";

import { License } from "@/model/usage";
import { isApiSuccess, Licenses } from "@/api";

function extractKey(params: RouteParams): string {
  const key = params["key"];

  if (typeof key === "string") {
    return key;
  } else {
    return key[0];
  }
}

interface Data {
  license: License | null;
}

export default defineComponent({
  components: { LicenseComponent },
  data() {
    return {
      license: null,
    } as Data;
  },
  methods: {
    async loadLicenses(key: string) {
      const result = await Licenses.getLicense(key);

      if (isApiSuccess(result)) {
        this.license = result;
      }
    },
  },

  created() {
    const key = extractKey(this.$router.currentRoute.value.params);

    this.loadLicenses(key);
  },
});
</script>

<style>
</style>