<template>
  <div class="material-details" v-if="material">
    <media-header v-if="media" :mediaInfo="media" />
    <p v-else>Couldn't load Media info</p>
    <div class="material-info" v-if="material">
      <p><span>Format:</span> {{ material.format }}</p>
      <p><span>Quality:</span> {{ material.quality }}</p>
    </div>
    <div class="license-details-wrapper">
      <license-component v-if="license" :license="license" />
    </div>
    <div>
      <div v-if="!usage">
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
      <div v-else>
        <table>
          <usage-item :usage="usage" :downloadEnabled="true" />
        </table>
      </div>
    </div>
  </div>
  <error v-else :message="'Couldn\'t load material info'"> </error>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteParams } from "vue-router";

import { Licenses, Media, isApiSuccess } from "@/api";

import {
  MaterialInfo,
  MaterialKey,
  MediaInfo,
  MediaKey,
  MediaKeyConstructor,
} from "@/model/media";
import { License, Usage } from "@/model/usage";

import Error from "@/components/Error.vue";
import { LicenseComponent } from "@/components/licenses";
import { MediaHeader } from "@/components/media";
import UsageItem from "@/components/UsageItem.vue";

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
  usage: Usage | null;
}

export default defineComponent({
  components: { LicenseComponent, MediaHeader, Error, UsageItem },
  data() {
    return {
      material: null,
      media: null,
      license: null,
      agreed: false,
      usage: null,
    } as Data;
  },
  created() {
    this.onCreated();
  },
  methods: {
    async onCreated() {
      const id = Number(extractId(this.$route.params));

      await this.loadMaterial(id);
      this.loadLicense(this.material?.licenseName as string);
      this.loadMedia(this.material?.mediaId as MediaKey);
      this.loadIsUsed(id);
    },
    async loadMaterial(id: MaterialKey) {
      const result = await Media.getMaterial(id);

      if (isApiSuccess(result)) {
        this.material = result;
      }
    },
    async loadLicense(name: string) {
      const result = await Licenses.getLicense(name);

      if (isApiSuccess(result)) {
        this.license = result;
      }
    },
    async loadMedia(id: MediaKey) {
      const result = await Media.getMedia(id);

      if (isApiSuccess(result)) {
        this.media = result;
      }
    },
    async loadIsUsed(id: MediaKey) {
      const userId = this.$store.state.user.info?.id;

      if (userId) {
        const result = await Media.getMaterialUsageUserId(id, userId);

        if (isApiSuccess(result)) {
          this.usage = result;
        }
      } else {
        this.usage = null;
      }
    },
    async aquire() {
      const token = this.$store.state.user.token;

      if (token) {
        const result = await Media.useMaterial(
          this.material?.id as number,
          token
        );

        if (isApiSuccess(result)) {
          alert("Material aquired successfully");
          this.$router.go(-1);
        } else {
          alert("Error occured while obtaining material");
        }
      } else {
        this.$router.push({ name: "Login" });
      }
    },
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

.material-details span {
  font-weight: bold;
}

.license-details-wrapper {
  width: fit-content;
  padding: 5pt;

  border-width: 1px;
  border-style: solid;
}
</style>