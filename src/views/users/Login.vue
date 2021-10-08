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
import { UserMutationTypes } from "@/store";
import { isApiSuccess, Auth, Users  } from "@/api";

export default class Login extends Vue {
  email = "";
  password = "";

  setup() {}

  async submit() {
    const token = await Auth.login(this.email, this.password);

    if (isApiSuccess(token)) {
      this.$store.commit(UserMutationTypes.SET_AUTH_TOKEN, token);
      //TODO: await all
      const info = await Users.getSelf(token);
      const privelegies = await Users.getSelfPrivelegies(token);

      if (isApiSuccess(info)) {
        this.$store.commit(UserMutationTypes.SET_USER_INFO, info);
      }

      if (isApiSuccess(privelegies)) {
        this.$store.commit(UserMutationTypes.SET_USER_PRIVELEGES, privelegies);
      }
    } else {
      alert("Login error");
    }

    this.$router.go(-1);
  }
}
</script>

<style>
.login {
  margin: 2mm 2mm;
  vertical-align: middle;
}
</style>