<template>
  <div class="login">
    <div>
      <h3>Email: </h3>
      <input v-model="email">
    </div>
    <div>
      <h3>Password: </h3>
      <input type="password" v-model='password'>
    </div>
    <button v-on:click="submit()">Log in</button>
  </div>
</template>

<script>
import auth from "../model/auth.js";

export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
    }
  },

  setup() {
    
  },

  methods: {
    async submit() {
      try {        
        await auth.login(this.email, this.password);
        this.$router.go(-1);                
      } 
      catch (err) {
        alert(err.data);
      }
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