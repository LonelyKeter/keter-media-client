<template>
  <form class="register-user" @submit.prevent="submit">
    <div>
      <h3>User name:</h3>
      <input v-model="userName" />
      <h3>Email:</h3>
      <input v-model="email" />
      <h3>Password:</h3>
      <input v-model="password" />
      <h3>Repeat password:</h3>
      <input v-model="password" />
    </div>
    <button type="submit">Register</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Register",

  data() {
    return {
      userName: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async submit() {},
  },
  setup() {},
});
</script>

<style>
.register-user {
  margin: 2mm 2mm;
  vertical-align: middle;
}
</style>