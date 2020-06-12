<template>
  <div class="q-pa-md" >
    
    <q-input filled v-model="text" label="Usuario" stack-label class="separacion"/>
    <q-input filled v-model="password" label="Contraseña" stack-label class="separacion" type="password" />
    <q-btn color="deep-orange" glossy label="Login" @click="login"/>
  
  </div>
</template>

<script>
const axios = require('axios');
export default {
  data() {
    return {
        text: "",
        password: ""
    };
  },
  async created() {
  },
  methods: {
      login: async function(){
          console.log("hola");
          
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