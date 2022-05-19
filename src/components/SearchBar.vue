<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchText"
      :placeholder="placeholder"
    />
    <button @click="$emit('submit', searchText)">
      Search
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    modelValue: {
        type: String,
        required: true 
    },
    placeholder: String,
  },
  emits: {
    "update:modelValue"(payload: string) {
      return true;
    },
    submit(searchText: string) {
      return true;
    },
  },
  computed: {
      searchText: {
          get(): string {
              return this.modelValue;
          },
          set(newVal: string) {
            this.$emit("update:modelValue", newVal);              
          }
      }
  }
});
</script>

<style>
</style>