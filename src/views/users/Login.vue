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
import { UserMutationTypes } from "@/store";
import { isApiSuccess, Auth, Users } from "@/api";
import { defineComponent } from "@vue/runtime-core";

interface Data {
  email: string;
  password: string;
}

export default defineComponent({
  data(): Data {
    return {
      email: "",
      password: "",
    };
  },
  setup() {},
  methods: {
    async submit() {
      const token = await Auth.login(this.email, this.password);

      if (isApiSuccess(token)) {
        this.$store.commit(UserMutationTypes.SET_AUTH_TOKEN, token);
        //TODO: await all
        const info = await Users.loadSelf(token);
        const privelegies = await Users.loadSelfPrivelegies(token);

        if (isApiSuccess(info)) {
          this.$store.commit(UserMutationTypes.SET_USER_INFO, info);
        }

        if (isApiSuccess(privelegies)) {
          this.$store.commit(
            UserMutationTypes.SET_USER_PRIVELEGES,
            privelegies
          );
        }

        this.$router.go(-1);
      } else {
        alert("Login error");
      }
    },
  },
});
</script>

<style>
.login {
  margin: 2mm 2mm;
  vertical-align: middle;
}
</style>