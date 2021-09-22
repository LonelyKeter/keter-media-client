<template>
  <form class="login" @submit.prevent="submit()">
    <div>
      <h3>Email:</h3>
      <input v-model="email" />
    </div>
    <div>
      <h3>Password:</h3>
      <input type="password" v-model="password" />
    </div>
    <button type="submit">Log in</button>
  </form>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import auth from "@/api/auth";
import { UserMutationTypes } from "@/store";

export default class Login extends Vue {
  email = "";
  password = "";

  setup() {}

  async submit() {
    try {
      const token = await auth.login(this.email, this.password);
      const info = await auth.getInfo(token);
      const privelegies = await auth.getPrivelegies(token);

      this.$store.commit(UserMutationTypes.SET_AUTH_TOKEN, token);
      this.$store.commit(UserMutationTypes.SET_USER_INFO, info);
      this.$store.commit(UserMutationTypes.SET_USER_PRIVELEGES, privelegies);

      this.$router.go(-1);
    } catch (err) {
      const name = (err as Error).name;
      const message = (err as Error).message;
      alert(name + "\n" + message);
    }
  }
}
</script>

<style>
.login {
  margin: 2mm 2mm;
  vertical-align: middle;
}
</style>