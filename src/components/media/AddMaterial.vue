<template>
  <button v-if="!inProcess" @click="clickAdd">Add material</button>
  <teleport to="body" v-else>
    <form>
        <select>
            
        </select>
    </form>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

type Data = {
  inProcess: boolean;
  
};

export default defineComponent({
  data() {
    return {
      inProcess: false,
    } as Data;
  },
  methods: {
    async clickAdd() {},
  },
});
</script>

<style>
</style>