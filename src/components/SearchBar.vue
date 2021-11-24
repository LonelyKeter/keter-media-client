<template>
  <div class="search-bar">
    <input
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @change="emitUpdateValue"
    />
    <button @click="$emit('submit')">
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
    submit() {
      return true;
    },
  },
  methods: {
    emitUpdateValue(e: Event) {
      this.$emit("update:modelValue", (e.target as HTMLInputElement).value);
    },
  },
});
</script>

<style>
</style>