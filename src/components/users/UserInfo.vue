<template>
  <div class="user-info">
    <p>{{info.name}}</p>
  </div>
</template>

<script lang="ts">
import { UserInfo } from "@/model/userinfo";
import { defineComponent, PropType } from "@vue/runtime-core"

export default defineComponent({
  props: {
    info: {
        type: Object as PropType<UserInfo>,
        required: true
    }
  },
});
</script>

<style>
  div.user-info {
    width: fit-content;
  }
</style>