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
      <q-input v-model="calorias" filled type="textarea" readonly hint="Tus calorias diarias son:"/>
    
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
      ejercicio: ""
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
