<template>

  <q-page class="column">
    <q-input v-model="originalTitle" label="titulo" class="separacion"/>
    <q-input v-model="originalContent" filled type="textarea" label="contenido" class="separacion" />
    
    <label for>idioma original</label>
    <q-select filled v-model="idiomaOriginal" :options="idiomas" option-label="name" option-value="code" class="separacion"/>
    <label for>idioma a traducir</label>
    <q-select filled v-model="idiomaTraducir" :options="idiomas" option-label="name" option-value="code" class="separacion"/>
    <q-input v-model="translatedContent" filled type="textarea" label="texto traducido" class="separacion" />

    <q-btn color="primary" label="traducir" @click="traducir" class="separacion"/>
    <q-btn color="primary" label="send" @click="send" class="separacion"/>

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
      originalLanguage: "",
      translatedLanguage: "",
      translatedTitle: "no",
      translatedContent: "",
      token: localStorage.getItem("token"),

      idiomaTraducir: "",
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
      let url = 'http://localhost:8080/insert';
      const axiospost = await axios.post(url,data,{
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json"
        }
      })
      console.log(axiospost.data);
      
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
      
    },
    async traducir(){
        this.originalLanguage = this.idiomaOriginal.name;
        this.translatedLanguage = this.idiomaTraducir.name;

        let idiomaentrada = this.idiomaOriginal.code;
        let idiomasalida = this.idiomaTraducir.code;
        let texto = this.originalContent;
        let parametros = {
          'source': idiomaentrada,
          'target': idiomasalida,
          'text': texto
        }
        const data = {
          MethodName: 'translate',
          params: parametros
        }
        let traducirPeticion = await axios.post("http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php",data)
        this.translatedContent = await traducirPeticion.data
    }
  }
};
</script>
<style >
    .separacion {
        margin-bottom: 10px;
    }
</style>