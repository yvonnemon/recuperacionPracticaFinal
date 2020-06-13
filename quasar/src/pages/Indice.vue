<template>
  <div class="q-pa-md" >
    <q-input rounded outlined v-model="filtro" class="separacion" label="Buscar" @keyup="filtrar()"/>

    <q-list dense bordered padding class="rounded-borders separacion" v-for="post in postsFiltro" :key="post['id']">
      <q-item v-ripple>
        <q-item-section v-model="elpost">
        <h6 post.key style="word-break: break-word;">{{ post["title"] }}</h6>
          <p  style="word-break: break-word;">{{ post["translatedContent"] }}</p>
          <div>
            <q-btn color="black" @click="borrar(post['id'])" label="Delete" /> 
            <q-btn color="secondary" @click="update(post)" label="Update" />
        </div>
        </q-item-section>
      </q-item>
    </q-list>

  </div>
</template>

<script>
const axios = require('axios');
export default {
  data() {
    return {
      posts: [],
      postsFiltro: [],
      filtro: "",
      user: "pepe",
      apellido: "popo",
      token: "",
      elpost: ""
    };
  },
  async created() {
    if(sessionStorage.getItem("token") == null){
      this.$router.push("/")
    }
    
    sessionStorage.removeItem('postUpdate')

    this.listarPosts(this.token);
  },
  methods: {
    filtrar: function(){
      if ( this.filtro !== '') {
        this.postsFiltro = this.posts.filter( x => x['title'].includes(this.filtro));      
      } else {
        this.postsFiltro = this.posts;
      }
    },
    update: function(post){
      sessionStorage.setItem('postUpdate', JSON.stringify(post))
      this.$router.push("/form") 
      console.log(post);
    },
    borrar: async function(idpost){
        console.log(idpost);
        let token = sessionStorage.getItem('token')
        let seguro = confirm("seguro de borrar el post?");
        const data = {
            id:idpost
        }

        if(seguro){
            let borrado = await axios.delete('http://localhost:8080/delete',{
              headers: {
                Authorization: "Bearer " + token,
              "Content-Type": "application/json"
              },
		          data: {
                id: idpost
              }
            })
            location.reload(true);
        } 

    },
    listarPosts: async function(token) {
      let listarPosts = await axios.get("http://localhost:8080/posts", {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/x-www-form-urencoded"
        })
      });
      let posts = listarPosts.data;
      this.posts = posts;
      this.postsFiltro = posts;
    }
  }
};
</script>
<style>
  .separacion {
  margin-bottom: 10px;
}

</style>