<template>

  <q-page class="column">
    <q-input v-model="originalTitle" label="titulo" />
    <br />
    <q-input v-model="originalContent" filled type="textarea" label="contenido" />
    <q-btn color="primary" label="send" @click="send" />
    
    <label for>idioma original</label>
    <q-select filled v-model="idiomaOriginal" :options="idiomas" option-label="name" option-value="code"/>
    <p>{{idiomaOriginal}}</p>
        <q-btn color="primary" label="asdasd" @click="asd" />

  </q-page>
</template>

<script>
const axios = require("axios");

export default {
  name: "PageIndex",
  data() {
    return {
      originalTitle: "",
      originalContent: "",
      originalLanguage: "no",
      translatedLanguage: "no",
      translatedTitle: "no",
      translatedContent: "no",
      token: localStorage.getItem("token"),
      idiomaOriginal: "",
      idiomas: []
    };
  },
  async created() {
    this.listaridiomas();
  },
  methods: {
      asd(){
          console.log(this.idiomaOriginal.code);
          
      },
    async send() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;

      console.log(this.token);

      const peticionToken = await fetch("http://localhost:8080/insert", {
        method: "POST",
        credentials: "include",
        headers: new Headers({
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          title: this.originalTitle,
          content: this.originalContent,
          language: this.translatedLanguage,
          originalLanguage: this.originalLanguage,
          translatedTitle: this.translatedTitle,
          translatedContent: this.translatedContent,
          datePost: today,
          userId: 1
        })
      });
      let asd = await peticionToken.text();
      console.log(asd);
      /* const headers = {
          'Authorization': "Bearer " + this.token,
          "Content-Type": "application/json"
      };
      const data = {
          title: this.originalTitle,
          content: this.originalContent,
          language: this.translatedLanguage,
          originalLanguage: this.originalLanguage,
          translatedTitle: this.translatedTitle,
          translatedContent: this.translatedContent,
          datePost: today,
          userId: 1
      };
      let usuarios = await axios.post("http://localhost:8080/insert", {
          method: 'POST',
        credentials: "include",
        data,
        headers: headers,
        /*headers: new Headers({
          'Authorization': "Bearer " + this.token,
          "Content-Type": "application/json"
        }),
        /*params: JSON.stringify({
          title: this.originalTitle,
          content: this.originalContent,
          language: this.translatedLanguage,
          originalLanguage: this.originalLanguage,
          translatedTitle: this.translatedTitle,
          translatedContent: this.translatedContent,
          datePost: today,
          userId: 1
        })
      });*/

      //console.log(await usuarios.text());
    },
    async listaridiomas() {
      console.log("traducir");
      let idiomas = await fetch(
        "http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php",
        {
          method: "POST",
          body: JSON.stringify({
            MethodName: "languages",
            params: ""
          })
        }
      );
      let listaidiomas = await idiomas.json();
      let idiomanombre = [];
      let idiomaid = [];

      this.idiomas = listaidiomas;
      console.log(this.idiomas);
      
    }
  }
};
</script>