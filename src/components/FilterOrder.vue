<template>
  <div>
    <div v-if="header">
      {{ header }}
    </div>
    <div>
      <label>Minimum: </label>
      <input
        type="number"
        :value="minBinding"
        :max="pickMaxBound"
        :min="minBound"
        @input="updateMin($event)"
      />
    </div>
    <div>
      <label>Maximum: </label>
      <input
        type="number"
        :value="maxBinding"
        :max="maxBound"
        :min="pickMinBound"
        @input="updateMax($event)"
      />
    </div>
    <select>
      <option value="desc">Descending</option>
      <option value="asc">Ascending</option>
    </select>
  </div>
</template>

<script lang="ts">
import { FilterOrdering } from "@/model";
import { defineComponent, PropType } from "@vue/runtime-core";

interface Data {
  minRaw: string;
  maxRaw: string;
}

const minUndefined = (a?: number, b?: number) =>
  !a ? b : !b ? a : Math.min(a, b);
const maxUndefined = (a?: number, b?: number) =>
  !a ? b : !b ? a : Math.max(a, b);

export default defineComponent({
  props: {
    minBound: {
      type: Number,
      required: false,
    },
    maxBound: {
      type: Number,
      required: false,
    },
    min: {
      type: Number as PropType<Number | null>,
      required: false,
      default: null,
    },
    max: {
      type: Number as PropType<Number | null>,
      required: false,
      default: null,
    },
    header: {
      type: String,
      required: false,
    },
  },
  emits: {
    "update:min"(payload: number | null) {
      return true;
    },
    "update:max"(payload: number | null) {
      return true;
    },
  },
  data(props): Data {
    return {
      minRaw: String(props.min ?? ""),
      maxRaw: String(props.max ?? ""),
    };
  },
  computed: {
    minBinding(): number | undefined {
      return !!this.min ? Number(this.min) : undefined;
    },
    maxBinding(): number | undefined {
      return !!this.max ? Number(this.max) : undefined;
    },

    pickMinBound(): number | undefined {
      const min = this.minRaw === "" ? undefined : Number(this.minRaw);
      return maxUndefined(min, this.minBound);
    },
    pickMaxBound(): number | undefined {
      const max = this.maxRaw === "" ? undefined : Number(this.maxRaw);
      return minUndefined(max, this.maxBound);
    },
  },
  methods: {
    updateMin(e: Event) {
      const min: string = (e.target as HTMLInputElement).value;
      this.minRaw = min;
      const update = min === "" ? null : Number(min);
      this.$emit("update:min", update);
    },
    updateMax(e: Event) {
      const max: string = (e.target as HTMLInputElement).value;
      this.maxRaw = max;
      const update = max === "" ? null : Number(max);
      this.$emit("update:max", update);
    },
  },
});
</script>

<style>
</style>