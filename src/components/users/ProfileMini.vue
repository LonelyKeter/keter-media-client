<template>
  <div class="profile-mini">
    <div class="dropdown-menu">
      <router-link :to="{ name: 'User', params: { id: userInfo.id } }">{{
        userInfo.name
      }}</router-link>
      <div class="dropdown-content" @click="logOut()">Log out</div>
    </div>
  </div>
</template>

<script lang="ts">
import { UserInfo } from "@/model/userinfo";
import { UserMutationTypes } from "@/store";
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "ProfileMini",
  props: {
    userInfo: { 
        type: Object as PropType<UserInfo>,
        required: true
    }
  },
  methods: {
    logOut() {
      this.$store.commit(UserMutationTypes.RESET_USER);
    },
  },
});
</script>

<style>
.profile-mini .dropdown-menu {
  background-color: var(--green1);
}
</style>