<template>
  <tr>
    <router-link
      class="media-author"
      :to="{ name: 'User', params: { id: info.id } }"
    >
      {{ info.name }}
    </router-link>
    <td>
      {{ info.contacts.email }}
    </td>
    <td>
      {{ roundedRating }}
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { AuthorInfo } from "@/model/userinfo";

export default defineComponent({
  props: {
    info: {
      type: Object as PropType<AuthorInfo>,
      required: true,
    },
  },
  computed: {
    roundedRating(): string {
      return this.info.rating?.toPrecision(4) ?? "n/a";
    },
  },
});
</script>

<style>
</style>