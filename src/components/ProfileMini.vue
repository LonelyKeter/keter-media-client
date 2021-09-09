<template>
  <div class="profile-mini">
    <div class="dropdown-menu">
      <router-link :to="{ name: 'Profile' }">{{ userInfo.name }}</router-link>
      <div class="dropdown-content">Logout</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileMini",
  props: {
    userInfo: Object,
  },
};
</script>

<style>
  .profile-mini .dropdown-menu {
    background-color: var(--green1);
  }
</style>