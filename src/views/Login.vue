<template>
  <div class="login">
    <div>
      <h3>Email:</h3>
      <input v-model="email" />
    </div>
    <div>
      <h3>Password:</h3>
      <input type="password" v-model="password" />
    </div>
    <button v-on:click="submit()">Log in</button>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import auth from "@/api/auth";

export default class Login extends Vue {
  email = "";
  password = "";

  setup() {}

  async submit() {
    try {
      await auth.login(this.email, this.password);

      const info = await auth.getInfo();
      const privelegies = await auth.getPrivelegies();

      this.$store.commit("setUserInfo", info);
      this.$store.commit("setUserPrivelegies", privelegies);

      alert(this.$store.state.user.info);

      this.$router.go(-1);
    } catch (err) {
        const name = (err as Error).name;
        const message = (err as Error).message;
      alert(name + "\n" + message);
    }
  }
}
</script>

<style scoped>
div {
  margin: 2mm 2mm;
  vertical-align: middle;
}
</style>