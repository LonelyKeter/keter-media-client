<template>
  <button @click="clickAdd" :disabled="inProcess">Add material</button>
  <teleport to="body" v-if="inProcess">
    <form class="add-material-form" @submit.prevent="addMaterial">
      <input type="file" ref="file" />
      <select-list
        :header="'Quality: '"
        :options="qualityOptions"
        :default-item="'Select quality'"
        v-model="quality"
      />
      <select-list
        :header="'License'"
        :options="licenseOptions"
        :default-item="'Select license'"
        v-model="license"
      />
      <div>
        <button type="submit">Add</button>
        <button @click="inProcess = false">Cancel</button>
      </div>
    </form>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import SelectList from "@/components/SelectList.vue";

import { UploadMaterial } from "@/api/media";
import { Media, Licenses, isApiSuccess } from "@/api";

import { mediaKeyConstructor, Quality } from "@/model/media";
import { LicenseKey } from "@/model/usage";

interface Data {
  inProcess: boolean;
  quality: Quality;
  qualityOptions: { name: string; value: Quality }[];
  license: number;
  licenseOptions: { name: string; value: LicenseKey }[];
}

export default defineComponent({
  components: { SelectList },
  props: {
    mediaId: {
      type: mediaKeyConstructor,
      required: true,
    },
  },
  data(): Data {
    return {
      inProcess: false,
      quality: "Medium",
      qualityOptions: [
        { name: "Very Low", value: "Very Low" as Quality },
        { name: "Low", value: "Low" as Quality },
        { name: "Medium", value: "Medium" as Quality },
        { name: "High", value: "High" as Quality },
        { name: "Very high", value: "Very high" as Quality },
      ],
      license: 1,
      licenseOptions: [],
    } as Data;
  },
  methods: {
    async clickAdd() {
      this.inProcess = true;
    },
    previewFile() {
      this.$refs;
    },
    async loadLicenses() {
      const result = await Licenses.getLicenses();

      if (isApiSuccess(result)) {
        this.licenseOptions = result.map((license) => ({
          name: license.title,
          value: license.id,
        }));
      }
    },
    async addMaterial() {
      const uploadMaterial: UploadMaterial = {
        quality: this.quality as Quality,
        format: ".jpeg",
        license_id: 1,
        file: this.file,
      };

      const token = this.$store.state.user.token;
      if (token) {
          const result = await Media.postMaterial(
          this.mediaId,
          uploadMaterial,
          token
        );

        if (isApiSuccess(result)) {
          this.inProcess = false;
        } else {            
          alert("Upload failed");
        }
      }
    },
  },
  created() {
    this.loadLicenses();
  },
  computed: {
    file(): File {
      return ((this.$refs.file as HTMLInputElement).files as FileList)[0];
    },
  },
});
</script>

<style>
.add-material-form {
  position: absolute;
  top: 30%;
  left: 50%;
  width: 60%;

  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;

  border: var(--green1) 1px solid;
  border-radius: 10px;
  background-color: white;
}

.add-material-form * {
  width: fit-content;
  margin: 10px;
}
</style>