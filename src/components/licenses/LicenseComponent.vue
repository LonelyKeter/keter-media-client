<template>
  <div class="license">
      <h3>{{license.title}}</h3>
      <h6>{{license.date}}</h6>
      <p>{{license.text}}</p>
  </div>
</template>

<script lang="ts">
import { License } from "@/model/usage";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    license: {
      type: Object as PropType<License>,
      required: true,
    },
  },  
});
</script>

<style>
.license {
}
</style>