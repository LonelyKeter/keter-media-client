<template>
  <div class="material-details">
    <media-header v-if="media" :mediaInfo="media" />
    <p v-else>Couldn't load Media info</p>
    <div class="material-info" v-if="material">
      <p><label>Format:</label>{{ material.format }}</p>
      <p><label>Quality:</label>{{ material.quality }}</p>
      <p><label>Size:</label>{{ material.size }}</p>
    </div>
    <div class="license-details-wrapper">
      <license-component v-if="license" :license="license" />
    </div>
    <div v-if="alreadyUsed">
      <div>
        <input name="agreed" type="checkbox" v-model="agreed" />
        <label for="agreed">
          I agree to follow this material distribution policy
        </label>
      </div>
      <div>
        <button :disabled="!hasAgreed" @click="aquire">Aquire</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteParams } from "vue-router";

import usage from "@/api/usage";
import media from "@/api/media";

import { MaterialInfo, MaterialKey, MediaInfo, MediaKey } from "@/model/media";
import { License } from "@/model/usage";
import { UserKey } from "@/model/userinfo";

import { LicenseComponent } from "@/components/licenses";
import { MediaHeader } from "@/components/media";

function extractId(params: RouteParams): string {
  const param = params["id"];

  if (typeof param === "string") {
    return param;
  } else {
    return param[0];
  }
}

interface Data {
  material: MaterialInfo | null;
  media: MediaInfo | null;
  license: License | null;
  agreed: boolean;
  alreadyUsed: boolean | null;
}

export default defineComponent({
  components: { LicenseComponent, MediaHeader },
  data() {
    return {
      material: null,
      media: null,
      license: null,
      agreed: false,
      alreadyUsed: null,
    } as Data;
  },
  created() {
    this.onCreated();
  },
  methods: {
    async onCreated() {
      const id = Number(extractId(this.$route.params));

      await this.load_material(id);
      this.load_license(this.material?.licenseName as string);
      this.load_media(this.material?.mediaId as MediaKey);
      this.loadIsUsed(id);
    },
    async load_material(id: MaterialKey) {
      this.material = await media.getMaterial(id);
    },
    async load_license(name: string) {
      this.license = await usage.getLicense(name);
    },
    async load_media(id: MediaKey) {
      this.media = await media.getMedia(id);
    },
    async loadIsUsed(id: MediaKey) {
      const token = this.$store.state.user.token;

      if (token) {
        this.alreadyUsed = await media.isMaterialUsed(id, token);
      } else {
        throw {};
      }
    },
    async aquire() {},
  },
  computed: {
    hasAgreed(): boolean {
      return this.agreed;
    },
  },
});
</script>

<style>
.material-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.material-details > div {
  width: fit-content;
  margin: auto;
}

.license-details-wrapper {
  width: fit-content;
  padding: 5pt;

  border-width: 1px;
  border-style: solid;
}
</style>