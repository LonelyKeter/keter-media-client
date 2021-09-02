<template>
  <div>
    <div id="bar">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/media">Media</router-link> |
        <router-link to="/authors">Authors</router-link> |    
      </div>    
      <div id="corner">
        <profile-mini v-if="loggedIn"/>
        <div v-else>
          <router-link to="/login">Log in</router-link> |
          <router-link to="/register">Sign up</router-link> |
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import ProfileMini from '@/components/ProfileMini.vue'

export default {
  components: {
    ProfileMini
  },
  data() {
    return {
      loggedIn: false
    }
  },
  setup() {

  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#bar {
  padding: 10px 20px;
  background: rgb(223, 255, 168);
}

#nav {
  display: inline; 
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  border: 0;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#corner {
  float: right;
  display: inline;  
}

input {  
  margin: 2mm;
  padding: 1mm;
  border-width: 1px;
  font-size: large;
  background: transparent;
}

button {
  margin: 2mm;
  padding: 1mm;

  border-width: 0;
  border-color: rgba(128, 128, 128, 0.788);

  font-size: large;
  background: transparent;

  text-align: right;
}
button:hover {
  font-weight: bold;
  font-size: larger;
  text-decoration: underline;
  text-decoration-thickness: 2pt;
}

button:active {
  font-weight: bolder;
  font-size: large;
}
</style>
