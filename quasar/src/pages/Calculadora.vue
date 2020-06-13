<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm">
      <q-radio v-model="sexo" val="hombre" label="hombre" />
      <q-radio v-model="sexo" val="mujer" label="mujer" />
      <q-input class="separacion" step="1" min="0" outlined v-model="peso" type="number" label="Peso en kilos" />
      <q-input class="separacion" step="1" min="0" outlined v-model="altura" type="number" label="Altura en cm" />
      <q-input class="separacion" step="1" min="0" outlined v-model="edad" type="number" label="Edad" />
      <q-select standout="bg-teal text-white" v-model="ejercicio" :options="options" label="Ejercicio semanal" />
      
      <q-btn color="purple" label="Calcular" @click="calcular" />
      <q-input v-model="calorias" filled type="number" readonly hint="Tus calorias diarias son:" />
      <q-input v-model="caloriasConsumidas" filled type="number" readonly hint="Calorias consumidas:" />

      <div id="video"></div>
      <q-input
        v-model="comida"
        label="inserte el alimento comsumido para contar las calorias"
        class="separacion"
      />

      <q-btn color="purple" label="Añadir alimento" @click="peticion" />
      <q-toggle v-model="cam" color="red" />
      <video id="camara" width="100%" height="200" autoplay></video>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      sexo: "",
      peso: 0,
      edad: 0,
      altura: 0,
      calorias: "",
      caloriasConsumidas: 0,
      options: [
        "Poco ejercicio",
        "Ejercicio Ligero",
        "Ejercicio Moderado",
        "Ejercicio Fuerte",
        "Ejercicio profesional"
      ],
      ejercicio: "",
      label: "",
      confidence: "",
      video: "",
      stream: null,
      comida: "",
      databaseName: "comidas",
      databaseTable: "comidas",
      db: null,
      cam: false
    };
  },
  async created() {
    this.db = indexedDB.open(this.databaseName, 1);

    this.db.onupgradeneeded = async function(upgradeDB) {
      const database = upgradeDB.target.result;
      const tabla = database.createObjectStore(this.databaseName, {
        keyPath: "name"
      });
    }.bind(this);

    this.db.onsuccess = function(ev) {
      ev.target.result;
    }.bind(this);

  },
  methods: {
    calcular: function() {
      let tmb;
      let ejerc;
      if (this.sexo == "") {
        console.log("no has dicho tu sexo");
      } else {
        if (this.sexo == "mujer") {
          tmb = 10 * this.peso + 6.25 * this.altura - 5 * this.edad - 161;
        } else {
          tmb = 10 * this.peso + 6.25 * this.altura - 5 * this.edad + 5;
        }

        if (this.ejercicio == "Poco ejercicio") {
          console.log("poco");
          ejerc = 1.2;
        } else if (this.ejercicio == "Ejercicio Ligero") {
          console.log("2");
          ejerc = 1.375;
        } else if (this.ejercicio == "Ejercicio Moderado") {
          console.log("3");
          ejerc = 1.55;
        } else if (this.ejercicio == "Ejercicio Fuerte") {
          console.log("4");
          ejerc = 1.725;
        } else if (this.ejercicio == "Ejercicio profesional") {
          console.log("5");
          ejerc = 1.9;
        } else {
          console.log("no pusiste tu ejercicio, el default sera el medio");
          ejerc = 1.55;
        }

        this.calorias = tmb * ejerc;
      }
    },
    preload: async function() {
      const video = document.querySelector("#camara");
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      });
      video.srcObject = this.stream;
      this.video = video;
      console.log("aqui");
      console.log("aquidos");
      //this.classifier = clasifier;
      let x = 0;
      this.peticion();
    }, //no hay forma de que funcione el classifier.classify
    peticion: async function() {
      if (this.cam) {
        
          const video = document.querySelector("#camara");
          this.stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
          });
          video.srcObject = this.stream;
          this.video = video;

          //this.classifier = clasifier;
          let x = 0;
          //this.peticion();

          let clasifier = await ml5.imageClassifier("MobileNet", video);
          //let clas = this.classifier;
          clasifier.classify().then(results => {
            this.label = results[0].label;
            this.confidence = results[0].confidence.toFixed(2);
            console.log(this.confidence);
          });

          if (this.confidence >= 0.5) {
            console.log("conf > 0.5");

            let app_id = "32d2feb5";
            let app_key = "508377f6784f3295c05c8297f5c0eeda";
            let peticion = await fetch(
              "https://api.edamam.com/api/food-database/parser?ingr=" +
                this.label +
                "&app_id=" +
                app_id +
                "&app_key=" +
                app_key,
              {
                method: "GET"
              }
            );
            let peticionJson = await peticion.json();
            let parseado = peticionJson.parsed;
            console.log(peticionJson);

            if (parseado.length < 1) {
              console.log("no es comida o no existe");
              console.log("para probar que se suman, pondre 8 ");
              
              this.caloriasConsumidas = this.caloriasConsumidas + 8;
            } else {
              let nutrientes = parseado[0].food.nutrients;
              this.caloriasConsumidas = nutrientes.ENERC_KCAL;
            }
            const tx = this.db.result.transaction(["comidas"], "readwrite");
            const store = tx.objectStore("comidas");
            console.log(this.label);

            store.put({
              name: this.label,
              kcal: 27
            });
            tx.oncomplete = function() {
              console.log("insertado");
            };
          }
        
      } else {
        console.log('camara apagada');
        
      }
      //this.peticion()
    },
    insertar: async function() {
      let app_id = "32d2feb5";
      let app_key = "508377f6784f3295c05c8297f5c0eeda";
      let peticion = await fetch(
        "https://api.edamam.com/api/food-database/parser?ingr=" +
          this.comida +
          "&app_id=" +
          app_id +
          "&app_key=" +
          app_key,
        {
          method: "GET"
        }
      );
      let peticionJson = await peticion.json();
      let parseado = peticionJson.parsed;
      console.log(peticionJson);

      if (parseado.length < 1) {
        console.log("no es comida o no existe");
        calorias = 0;
      } else {
        let nutrientes = parseado[0].food.nutrients;
        this.calorias = nutrientes.ENERC_KCAL;
      }
      const tx = this.db.result.transaction(["comidas"], "readwrite");
      const store = tx.objectStore("comidas");
      console.log(this.comida);

      store.put({
        name: this.comida,
        kcal: this.calorias
      });
      tx.oncomplete = function() {
        console.log("insertado");
      };
    }
  }
};
</script>
<style >
.separacion {
  margin-bottom: 10px;
}
#originalContent {
  visibility: hidden;
}
</style>