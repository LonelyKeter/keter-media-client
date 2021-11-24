<template>
  <div>
    <div id="bar">
      <div id="nav">
        <router-link to="/media">Media</router-link> |
        <router-link to="/licenses">Licenses</router-link>
      </div>
      <div id="corner">
        <div v-if="!userInfo">
          <router-link to="/login">Log in</router-link> |
          <router-link to="/register">Sign up</router-link>
        </div>
        <profile-mini v-else :userInfo="userInfo" />
      </div>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProfileMini from "@/components/users/ProfileMini.vue";

export default defineComponent({
  components: {
    ProfileMini,
  },
  data() {
    return {};
  },
  computed: {
    userInfo() {
      return this.$store.state.user.info;
    },
  },
  setup() {},
});
</script>

<style>
:root {
  --green1: rgb(223, 255, 168);
  --green2: rgb(60, 95, 0);

  --grey1: rgba(190, 188, 188, 0.39);
  --grey2: rgba(128, 128, 128, 0.788);
}

body {
  background: rgba(255, 255, 92, 0.089);
  min-width: fit-content;
  margin: auto
}

form {
    max-width: fit-content;
}

.small {
    font-size: small;
}

.horizontal-flex {
    display: flex;
    flex-direction: row;
}

.vertical-flex {
    display: flex;
    flex-direction: column;
}

.background-green2 {
    background: var(--green2);
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
  align-content: center;

  background: var(--green1);
}

#bar a {
  text-decoration: none;
  justify-content: space-between;
}

#bar a:hover {
  transform: scale(1, 1);
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
  justify-self: right;
}

input {
  margin: 2mm;
  padding: 1mm;
  border-width: 1px;
  background: transparent;
}

button {
  margin: 2mm;
  padding: 2mm;

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

button.secondary1 {
    background: var(--grey1);

    border-radius: 0px;
    font-size: x-small;
}

table.wide {
  margin: auto;

  width: 600px;
  min-width: fit-content;

  border-spacing: 0 5pt;

  font-size: small;
}

table.small {
  margin: auto;

  width: 400px;
  min-width: fit-content;

  border-spacing: 0 3pt;

  font-size: x-small;
}

tr.row-1 {
  background: var(--grey1);

  border-width: 2px;
  border-style: solid;
  border-radius: 10px;

  border-spacing: 0 5pt;
}

.background-grey1 {
    background: var(--grey1);
}

.dropdown-content {
  position: absolute;
  display: none;

  background-color: inherit;
}

.dropdown-menu:hover > .dropdown-content {
  display: block;
}

.warning1 {
  color: green;
}

</style>
