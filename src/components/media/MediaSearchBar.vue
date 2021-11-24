<template>
  <div>
    <div class="horizontal-flex">
      <search-bar
        :placeholder="'Enter title...'"
        v-model="title"
        @submit="submit()"
      />
      <button class="secondary1" @click="filtersEnabled = !filtersEnabled">
        Filters
      </button>
    </div>
    <div v-if="filtersEnabled" class="small horizontal-flex background-grey1">
      <filter-order
        class="vertical-flex"
        :min-bound="1"
        :max-bound="10"
        :header="'Rating: '"
        v-model:min="rating.min"
        v-model:max="rating.max"
      />

      <div>
        <input ref="video" type="checkbox" @change="togleKind('Video')" />
        <label for="video">Video</label>
        <input ref="audio" type="checkbox" @change="togleKind('Audio')" />
        <label for="audio">Audio</label>
        <input ref="image" type="checkbox" @change="togleKind('Image')" />
        <label for="image">Image</label>
      </div>

      <filter-order
        class="vertical-flex"
        :min-bound="0"
        :header="'Times used: '"
        v-model:min="timesUsed.min"
        v-model:max="timesUsed.max"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { MediaFilterOptions, MediaKind } from "@/model/media";
import { defineComponent } from "@vue/runtime-core";
import SearchBar from "../SearchBar.vue";

import { FilterOrdering, Limits } from "@/model";
import FilterOrder from "../FilterOrder.vue";

interface Data {
  filtersEnabled: boolean;
  kinds: MediaKind[];
  title: string;
  rating: Limits;
  timesUsed: Limits;
}

export default defineComponent({
  components: { SearchBar, FilterOrder },
  data(): Data {
    return {
      filtersEnabled: false,

      title: "",
      kinds: [],

      rating: {
        min: null,
        max: null,
      },
      timesUsed: {
        min: null,
        max: null,
      },
    };
  },
  methods: {
    togleKind(kind: MediaKind) {
      if (this.kinds?.includes(kind)) {
        this.kinds = this.kinds?.filter((val) => val !== kind);
      } else {
        this.kinds?.push(kind);
      }

      console.log(this.kinds);
    },
    submit() {
    },
  },
  emits: {
    submit(payload: { options: MediaFilterOptions }) {
      return !!payload;
    },
  },
  computed: {},
});
</script>

<style scoped>
div {
  margin: auto;
  padding: 5px;
}

input[type="text"] {
  min-width: 75%;
  font-size: large;
}
</style>