<template>
  <div class="q-pa-md" >
    <div class="q-gutter-sm">
      <q-radio v-model="sexo" val="hombre" label="hombre" />
      <q-radio v-model="sexo" val="mujer" label="mujer" />
      <q-input step="1" min="0" outlined v-model="peso" type="number" label="Peso en kilos" />
      <q-input step="1" min="0" outlined v-model="altura" type="number" label="Altura en cm" />
      <q-input step="1" min="0" outlined v-model="edad" type="number" label="Edad" />
      <q-select standout="bg-teal text-white" v-model="ejercicio" :options="options" label="Ejercicio semanal" />
      <q-btn color="purple" label="Calcular" @click="calcular"/>
      <q-input v-model="calorias" filled type="number" readonly hint="Tus calorias diarias son:"/>

      <q-input readonly outlined v-model="showedfood" type="number" label="Alimentos enseñados" />
      <p>{{label}} || {{confidence}}</p>
      <div>{{video}}</div>
      <q-btn color="primary" label="Get Picture" @click="captureImage" />

    <img :src="imageSrc">
    </div>
  </div>
</template>

<script>

const axios = require('axios');
export default {
  data() {
    return {
      sexo: "",
      peso: 0,
      edad: 0,
      altura: 0,
      calorias: "",
      options: ["Poco ejercicio","Ejercicio Ligero","Ejercicio Moderado","Ejercicio Fuerte","Ejercicio profesional"],
      ejercicio: "",
      showedfood: "",
      label: "",
      confidence: "",
      video: "",
      nombre: "",
      nombreKCal: "",
      imageSrc: ''
    };
  },
  async created() {

  },
  methods: {

      calcular: function(){
          let tmb;
          let ejerc;
        if(this.sexo == ""){
            console.log("no has dicho tu sexo");
            
        } else {
            if(this.sexo == "mujer"){
                tmb = (10 * this.peso) + (6.25 * this.altura) - (5 * this.edad) - 161;
            } else {
                tmb = (10 * this.peso) + (6.25 * this.altura) - (5 * this.edad) + 5;
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
      preload: function(){
            console.log(window.location.href);

    this.video = createCapture(VIDEO, {
        video: {
            width: 280,
            height: 280,
            aspectRatio: 1
        }
    });
    classifier = ml5.imageClassifier('DoodleNet', this.video);

      },
      setup: function(){
            this.classifyVideo();

      },
      classifyVideo: function(){
            classifier.classify(gotResult);
      },
      gotResult: async function(error, results){
    if (error) {
        console.error(error);
    }
    // The results are in an array ordered by confidence.

    let fiabilidad = nf(results[0].confidence, 0, 2);

    if (fiabilidad > 0.5) {
        this.nombre = results[0].label;

        const repetido = await estaRepetido(this.nombre);

        if (!repetido) {
            console.log("inserto");
            let app_id = "3cd7f551";
            let app_key = "b7505d564aa4b8aee146898fc94e1deb";

            let peticion = await fetch("https://api.edamam.com/api/food-database/parser?ingr=" + nombre +
                "&app_id=" + app_id + "&app_key=" + app_key, {
                    method: "GET"
                });
            let peticionJson = await peticion.json();
            let parseado = peticionJson.parsed;

            if (parseado.length < 1) {
                console.log("no es comida o no existe");
                calorias = 0;
            } else {
                let nutrientes = parseado[0].food.nutrients;
                calorias = nutrientes.ENERC_KCAL;

            }

            let tx = db.transaction(["comidas"], "readwrite");
            let store = tx.objectStore("comidas");

            store.put({
                name: this.nombre,
                kcal: 8
            });
            tx.oncomplete = function () {
                console.log("insertado");
                caloriasConsumidas = caloriasConsumidas + calorias;
                document.querySelector("#totalkcal").innerHTML = caloriasConsumidas;

            }
        }

    }
    this.label ='Label: ' + results[0].label;
    this.confidence = 'Confidence: ' + nf(results[0].confidence, 0, 2); // Round the confidence to 0.01
    // Call classifyVideo again
      this.classifyVideo();

      }
  }
};


</script>
<style >
    #div2 {
        background-color: pink;
        width: 200px;
        height: 100px;
    }
</style>
