<template>
  <div>
    <label for="value">{{ header }}</label>
    <select ref="value" @input="emitUpdateValue" :value="modelValue">
      <option disabled value="">{{ defaultItem }}</option>
      <option
        v-for="option in optionsInner"
        :key="option.name"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

interface Data {
  optionsInner: OptionItem[];
}

interface OptionItem {
  name: string;
  value: string | number | string[];
}

export default defineComponent({
  props: {
    modelValue: [Number, String] as PropType<number | string>,
    options: { type: Array, required: true },
    header: { type: String, default: "Select: " },
    defaultItem: { type: String },
  },
  data() {
    return {
      optionsInner: this.options as OptionItem[],
    } as Data;
  },
  emits: ["update:modelValue"],
  methods: {
    emitUpdateValue(e: Event) {
      this.$emit("update:modelValue", (e.target as HTMLSelectElement).value);
      console.log((e.target as HTMLSelectElement).value);
    },
  },
});
</script>

<style>
</style>