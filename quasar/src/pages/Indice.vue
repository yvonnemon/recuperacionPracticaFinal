<template>
  <div class="q-pa-md" >
    <q-list
      dense
      bordered
      padding
      class="rounded-borders"
      v-for="post in posts"
      :key="post['id']"
    >
      <q-item v-ripple>
        <q-item-section>
        <h6 style="word-break: break-word;">{{ post["title"] }}</h6>
          <p style="word-break: break-word;">{{ post["translatedContent"] }}</p>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      user: "pepe",
      apellido: "popo",
      token: ""
    };
  },
  async created() {
    console.log("token");
    const peticionToken = await fetch(
      "http://localhost:3000/api/users/token/" +
        this.user +
        "/" +
        this.apellido
    );
    const token = await peticionToken.json();
    this.token = token.jwt;
    console.log(this.token);

    this.listarPosts(this.token);
  },
  methods: {
    listarPosts: async function(token) {
      console.log("caca");
      const buscarFetch = await fetch("http://localhost:8080/posts", {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urencoded"
        })
      });
      const posts = await buscarFetch.json();
      this.posts = posts;
      console.log(this.posts);
    }
  }
};
</script>
