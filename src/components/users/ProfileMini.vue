<template>
  <div class="profile-mini">
    <div class="dropdown-menu">
      <div class="dropdown-header">
        <router-link :to="{ name: 'User', params: { id: userInfo.id } }">{{
          userInfo.name
        }}</router-link>
      </div>
      <div class="dropdown-content">
        <a @click="logOut()"> Log out </a>
      </div>
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
      required: true,
    },
  },
  methods: {
    logOut() {
      this.$store.commit(UserMutationTypes.RESET_USER);
    },
  },
});
</script>

<style>
.profile-mini a {
}

.profile-mini .dropdown-menu {
  background-color: var(--green1);
}

.profile-mini .dropdown-content {
  background: rgba(0, 128, 0, 0.281);
}

.profile-mini .dropdown-content > *:hover {
    font-weight: bolder;
}

.dropdown-header > a {
  color: rgb(172, 0, 172);
  font-weight: bold;
}
</style>