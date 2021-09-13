<template>
  <div>    
    <div id="bar">
      <div>
      </div>
      <div id="nav">
        <router-link to="/media">Media</router-link> |   
      </div>    
      <div id="corner">
        <div v-if="!userInfo">
          <router-link to="/login">Log in</router-link> |
          <router-link to="/register">Sign up</router-link> |
        </div>
        <profile-mini v-else :userInfo="userInfo"/>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'; 
import ProfileMini from './components/ProfileMini.vue'

export default defineComponent({
  components: {
    ProfileMini
  },
  data() {
    return {

    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.info;
    }
  },
  setup() {

  }
});
</script>

<style>
:root {
  --green1: rgb(223, 255, 168);

  --grey1: rgba(190, 188, 188, 0.39);
  --grey2: rgba(128, 128, 128, 0.788);
}

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

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background: var(--green1);
}

#bar a {  
  text-decoration: none;
}

#nav {
  justify-self: flex-start;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  border: 0px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#corner {
  float: right;
  background-color: inherit;
}

input {  
  margin: 2mm;
  padding: 1mm;
  border-width: 1px;
  background: transparent;
}

button {
  margin: 2mm;
  padding: 1mm;

  border-radius: 10px;
  border-width: 0;

  font-size: small;
  background: var(--green1);

  text-align: right;
}
button:hover {
  transform: scale(1.1);
  transition-duration: 0.05s;
}

button:active {
  transform: scale(1.05);
}

table.wide {
    margin: auto;    

    width: 600px;
    min-width: fit-content;
    
    border-collapse: separate;
    
    font-size: small;
}

table.small {
    margin: auto;    

    width: 400px;
    min-width: fit-content;
    
    border-collapse: separate;
    
    font-size: x-small;
}

.dropdown-content {
  position: absolute;
  display: none;

  background-color: inherit;
}

.dropdown-menu:hover > .dropdown-content {
  display: block;
}
</style>
