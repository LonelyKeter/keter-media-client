<template>
  <div class="license">
    <h3>{{ license.title }}</h3>
    <h6>{{ dateString }}</h6>
    <p>{{ license.text }}</p>
  </div>
</template>

<script lang="ts">
import { License } from "@/model/usage";
import { defineComponent, PropType } from "vue";

interface Data {
  dateString: string;
}

export default defineComponent({
  props: {
    license: {
      type: Object as PropType<License>,
      required: true,
    },
  },
  setup(props): Data {
    const dateString = new Date(props.license.date).toLocaleDateString(
      undefined,
      {
        weekday: "narrow",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

    return {
      dateString,
    };
  },
});
</script>

<style>
</style>