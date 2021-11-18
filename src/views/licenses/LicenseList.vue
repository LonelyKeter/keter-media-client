<template>
  <div v-if="licenses" class="license-list-wrapper">
    <div class="license-wrapper" v-for="license in licenses" :key="license.id">
      <license-component :license="license" />
    </div>
  </div>
  <error v-else>
    {{ error }}
  </error>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import LicenseComponent from "@/components/licenses/LicenseComponent.vue";
import Error from "@/components/Error.vue";

import { License } from "@/model/usage";

import { isApiSuccess, Licenses } from "@/api";

interface Data {
  licenses: License[] | null;
  error: string | null;
}

export default defineComponent({
  components: { LicenseComponent, Error },
  data(): Data {
    return {
      licenses: null,
      error: null,
    };
  },
  created() {
    this.onCreated();
  },
  methods: {
    async onCreated() {
      await this.loadLicenses();
    },
    async loadLicenses() {
      const result = await Licenses.getLicenses();

      if (isApiSuccess(result)) {
        this.licenses = result;
      } else {
        this.error = result?.errorKind ?? "Unknown error occured in process";
      }
    },
  },
});
</script>

<style>
.license-list-wrapper {
    margin: 0;
    flex-direction: column;
    justify-items: center;
}

.license-wrapper {
    border-style: solid;
  border-width: 2px;
  border-color: black;
  border-radius: 10px;

  margin: 2em auto;
  max-width: 60%;
}
</style>