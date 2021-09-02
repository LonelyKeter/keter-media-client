<template>
  <div class="register">
    <div>
      <h3>User name: </h3>
      <input v-model="userName">
    </div>
    <div>
      <h3>Email: </h3>
      <input v-model="email">
    </div>
    <div>
      <h3>Password: </h3>
      <input v-model="password">
    </div>
    <input type="button" v-on:click="submitRegisterData()">
  </div>
</template>

<script>
export default {
  name: 'Register',
  
  data() {
    return {
      userName: '',
      email: '',
      password: ''
    }
  },

  setup() {

  }
}
</script>

<style>
  div {
    margin: 2mm 2mm;    
    vertical-align: middle;    
  }
</style>