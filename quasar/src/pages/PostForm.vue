<template>
  <q-page class="column">
    <q-input v-model="originalTitle" label="titulo" class="separacion" />
    <q-input v-model="originalContent" filled type="textarea" label="contenido" class="separacion" />
    <input type="text" v-model="originalContent" id="originalContent" />
    <label for>idioma original</label>
    <q-select
      filled
      v-model="idiomaOriginal"
      :options="idiomas"
      option-label="name"
      option-value="code"
      class="separacion"
    />
    <label for>idioma a traducir</label>
    <q-select
      filled
      v-model="idiomaTraducir"
      :options="idiomas"
      option-label="name"
      option-value="code"
      class="separacion"
    />
    <q-input
      v-model="translatedContent"
      readonly
      filled
      type="textarea"
      label="texto traducido"
      class="separacion"
    />

    <q-btn color="primary" label="traducir" @click="traducir" class="separacion" />
    <q-btn color="primary" label="send" @click="send" class="separacion" />
    <q-btn color="primary" label="grabar" id="grabar" class="separacion" />
    <q-btn color="primary" label="parar" id="parar" class="separacion" />
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
      token: sessionStorage.getItem("token"),

      idiomaTraducir: "",
      idiomaOriginal: "",
      idiomas: [],
      x: "",
      id: "",
      userid: sessionStorage.getItem('userid')
    };
  },
  async created() {
    if(sessionStorage.getItem("token") == null){
      this.$router.push("/")
    }
    this.listaridiomas();
    if (sessionStorage.getItem("postUpdate")) {
      let post = JSON.parse(sessionStorage.getItem("postUpdate"));
      console.log(post.title);

      this.originalTitle = post.title;
      this.originalContent = post.content;
      this.idiomaOriginal = post.originalLanguage;

      this.idiomaTraducir = post.language;
      this.translatedContent = post.translatedContent;
      this.translatedTitle = post.translatedTitle;

      this.id = post.id;
    }
  },
  methods: {
    async update() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();
      console.log(this.idiomaTraducir.code);

      today = yyyy + "-" + mm + "-" + dd;

      const data = {
        id: this.id,
        title: this.originalTitle,
        content: this.originalContent,
        language: this.idiomaTraducir.name,
        originalLanguage: this.idiomaOriginal.name,
        translatedTitle: this.translatedTitle,
        translatedContent: this.translatedContent,
        datePost: today,
        user: {
          id: this.userid
          }
      };
      let url = "http://localhost:8080/update";
      const axiospost = await axios.put(url, data, {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json"
        }
      });
      this.$router.push("/posts");
    },
    async send() {
      if (this.id > 0) {
        console.log("update");

        this.update();
      } else {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();
        console.log(this.idiomaTraducir.code);

        today = yyyy + "-" + mm + "-" + dd;

        console.log(this.token);
        let asd = {
          id: this.userid,
          email: sessionStorage.getItem('user')
        }
        console.log(asd);
        
        const data = {
          title: this.originalTitle,
          content: this.originalContent,
          language: this.idiomaTraducir.name,
          originalLanguage: this.idiomaOriginal.name,
          translatedTitle: this.translatedTitle,
          translatedContent: this.translatedContent,
          datePost: today,
          user: asd
          
        };
        let url = "http://localhost:8080/insert";
        const axiospost = await axios.post(url, data, {
          headers: {
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json"
          }
        });
        this.$router.push("/posts") 

      }
    },
    async listaridiomas() {
      const data = {
            MethodName: "languages",
            params: ""
      }
      console.log("traducir");
      let idiomas = await axios.post(
        "http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php", data
        
      );
      let listaidiomas = await idiomas.data;

      this.idiomas = listaidiomas;
    },
    async traducir() {
      this.originalLanguage = this.idiomaOriginal.name;
      this.translatedLanguage = this.idiomaTraducir.name;

      let idiomaentrada = this.idiomaOriginal.code;
      let idiomasalida = this.idiomaTraducir.code;
      let texto = this.originalContent;
      let parametros = {
        source: idiomaentrada,
        target: idiomasalida,
        text: texto
      };
      const data = {
        MethodName: "translate",
        params: parametros
      };
      let traducirPeticion = await axios.post(
        "http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php",
        data
      );
      this.translatedContent = await traducirPeticion.data;
    }
  }
};

const constraints = { audio: true };

let errorElement = document.querySelector("#errorMsg");
let chunks = [];

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(function(stream) {
    let mediaRecorder = new MediaRecorder(stream);
    document.querySelector("#grabar").onclick = function() {
      mediaRecorder.start();
      console.log("grabando audio");
    };

    document.querySelector("#parar").onclick = function() {
      mediaRecorder.stop();
    };
    mediaRecorder.onstop = async function(e) {
      const blob = new Blob(chunks, {
        type: "audio/ogg; codecs=opus"
      });

      chunks = [];
      const formData = new FormData();

      formData.append("arxiu", blob);
      formData.append("MethodName", "transcribe_sync");
      formData.append("params", "{}");

      let grabacion = await fetch(
        "http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php",
        {
          method: "POST",
          body: formData
        }
      );

      let devolucion = await grabacion.json();
      console.log(devolucion);

      let texto = devolucion[0].transcripcio;
      console.log("grabado y enviado");
      if (devolucion[0].confianca > 0.7) {
        console.log("confianza mayor a 0,7");
        document.getElementById("originalContent").value = texto;
        let event = new Event("input", {
          bubbles: true,
          cancelable: true
        });

        document.getElementById("originalContent").dispatchEvent(event);
      } else {
        console.log("audio por debajo del minimo de confianza: " + texto);
      }
    };

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    };
  })
  .catch(function(error) {
    if (error.name === "ConstraintNotSatisfiedError") {
      errorMsg(
        "The resolution " +
          constraints.video.width.exact +
          "x" +
          constraints.video.width.exact +
          " px is not supported by your device."
      );
    } else if (error.name === "PermissionDeniedError") {
      errorMsg(
        "Permissions have not been granted to use your camera and " +
          "microphone, you need to allow the page access to your devices in " +
          "order for the demo to work."
      );
    }
    errorMsg("getUserMedia error: " + error.name, error);
  });

function errorMsg(msg, error) {
  if (typeof error !== "undefined") {
    console.log(error);
  }
}
</script>
<style>
  #originalContent {
    display: none;
  }
  .separacion {
  margin-bottom: 10px;
}

</style>
