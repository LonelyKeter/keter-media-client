<template>
  <div>
    <router-link :to="{name: 'MediaDetails', params: {id: info.id}}" class="media-title" >
      {{info.title}}
    </router-link>
    <router-link class="media-author" :to="{name: 'AuthorSearch', params: {id: info.author.id}}">
      {{info.author.name}}
    </router-link>
    <p class="media-kind">{{info.kind}}</p>
    <p class="media-rating">{{info.rating}}</p>
  </div>
</template>

<script>
export default {
  name: 'Media',

  props: {    
    info: Object
  },

  data() {
    return {
    }
  },

  setup() {
    
  },
}
</script>

<style scoped>
  div {
    display: grid;
    grid-template-columns: 40% 40% 10% 10%;
    
    margin: 1%;
    padding: auto;
    max-width: 95%; 
    vertical-align: middle;
    
    font-size:larger;
  }
  
  div.media-item {

  }

  a {
    margin: 5%;
    text-decoration-line: none;
    color: inherit;
  }

  .media-title {
    color: rgb(41, 32, 32);
  }

  .media-author {
    color: rgb(3, 29, 143);
  }

  .media-kind {
    color: orange;
  }
</style>