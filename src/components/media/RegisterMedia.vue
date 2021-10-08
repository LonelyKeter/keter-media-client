<template>
  <div class="register-media">
    <button v-if="!$store.state.user.privelegies?.author" @click="becomeAuthor">
      Become author
    </button>
    <div v-else>
      <button v-if="!registering" @click="registering = true">
        Register media
      </button>
      <form v-else class="register-media-input" @submit.prevent="register">
        <div>
          <label for="title">Title: </label>
          <input type="text" ref="title" v-model="title" />
        </div>
        <p v-if="errors.title">{{ errors.title }}</p>
        <select-list
          :header="'Kind: '"
          :options="options"
          :default-item="'Select media kind'"
          v-model="kind"
        />
        <p v-if="errors.kind">{{ errors.kind }}</p>
        <div>
          <button type="submit">Register</button>
          <button @click="registering = false">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  checkKind,
  checkTitle,
  KindError,
  MediaKind,
  RegisterMedia,
  TitleError,
} from "@/model/media";

import { defineComponent } from "@vue/runtime-core";
import SelectList from "@/components/SelectList.vue";

interface Data {
  registering: boolean;
  title: string;
  kind: "" | MediaKind;
  tags: string[];
  defaultLicense?: string;
  options: { name: string; value: MediaKind }[];
  errors: {
    title?: string;
    kind?: string;
  };
}

export default defineComponent({
  components: { SelectList },
  data() {
    return {
      registering: false,
      title: "",
      kind: "",
      options: [
        { name: "Video", value: "Video" as MediaKind },
        { name: "Audio", value: "Audio" as MediaKind },
        { name: "Image", value: "Image" as MediaKind },
      ],
      errors: {},
      tags: [],
    } as Data;
  },
  methods: {
    checkInput() {
      let correct = true;

      const titleError = checkTitle(this.title);
      if (titleError != TitleError.Ok) {
        this.errors.title = titleError;
        correct = false;
      } else {
        this.errors.title = undefined;
      }

      const kindError = checkKind(this.kind);
      if (kindError != KindError.Ok) {
        this.errors.kind = kindError;
        correct = false;
      } else {
        this.errors.kind = undefined;
      }

      console.log(this.errors);

      return correct;
    },
    becomeAuthor() {},
    register() {
      if (!this.checkInput()) {
        return;
      }
    },
  },
});
</script>

<style>
.register-media {
  width: fit-content;
}

.register-media div {
  width: fit-content;
}

.register-media-input {
  padding: 5pt;

  display: flex;
  flex-direction: column;
  justify-content: left;

  border: solid 1px grey;
  border-radius: 10px;
}

.register-media-input > div {
  margin: 5pt 0 0 0;

  display: flex;
  flex-direction: row;
  align-content: baseline;
}

.register-media-input label {
  margin: auto;
}

.register-media-input > p {
  margin: 0;

  font-size: small;
  text-align: left;

  color: red;
}
</style>