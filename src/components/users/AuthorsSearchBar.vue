<template>
  <div>
    <div class="horizontal-flex">
      <search-bar
        :placeholder="'Enter name...'"
        v-model="name"
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
        v-model:ordering="rating_ordering"
      />

      <div>
        <input ref="video" type="checkbox" @change="togleKind('Video')" />
        <label for="video">Video</label>
        <input ref="audio" type="checkbox" @change="togleKind('Audio')" />
        <label for="audio">Audio</label>
        <input ref="image" type="checkbox" @change="togleKind('Image')" />
        <label for="image">Image</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MediaKind } from "@/model/media";
import { defineComponent } from "@vue/runtime-core";
import SearchBar from "../SearchBar.vue";

import { FilterOrdering, Limits } from "@/model";
import FilterOrder from "../FilterOrder.vue";
import { AuthorsOptions } from "@/api/users";

interface Data {
  filtersEnabled: boolean;
  kinds: MediaKind[];
  nameValue: string | null;
  rating: Limits;
  rating_ordering: FilterOrdering | null;
}

export default defineComponent({
  components: { SearchBar, FilterOrder },
  data(): Data {
    return {
      filtersEnabled: false,

      nameValue: null,
      kinds: [],

      rating: {
        min: null,
        max: null,
      },
      rating_ordering: null,
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
        const options: AuthorsOptions = {
            name: this.nameValue ?? undefined
        };

        if (this.filtersEnabled) {
            options.kinds = this.kinds;

            options.min_rating = this.rating.min ?? undefined;
            options.max_rating = this.rating.max ?? undefined;
            options.rating_ordering = this.rating_ordering ?? undefined;
        }

        console.log(options);
        this.$emit('submit', { options });
    },
  },
  emits: {
    submit(payload: { options: AuthorsOptions }) {
      return !!payload;
    },
  },
  computed: {
      name: {
          get(): string {
              return this.nameValue ?? "";
          },
          set(newVal: string) {
              this.nameValue = newVal !== "" ? newVal : null;
          }
      }
  },
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