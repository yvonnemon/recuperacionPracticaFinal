<template>
  <div class="q-pa-md" >

    <q-list dense bordered padding class="rounded-borders" v-for="post in posts" :key="post['id']"
    >
      <q-item v-ripple>
        <q-item-section v-model="elpost" @click="borrar(post['id'])"> 
        <h6 post.key style="word-break: break-word;">{{ post["title"] }}</h6>
          <p  style="word-break: break-word;">{{ post["translatedContent"] }}</p>
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
      user: "pepe",
      apellido: "popo",
      token: "",
      elpost: ""
    };
  },
  async created() {
    console.log("token");
    let res = await axios.get('http://localhost:3000/api/users/token/' +this.user +"/" + this.apellido);
    let data = res.data.jwt;
    this.token = data;

localStorage.setItem('token', this.token)
    this.listarPosts(this.token);
  },
  methods: {
    borrar: async function(idpost){
        console.log(idpost);
        let token = localStorage.getItem('token')
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
    }
  }
};
</script>
