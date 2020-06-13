<template>
  <div class="q-pa-md" >
    
    <q-input filled v-model="user" label="Usuario" stack-label class="separacion"/>
    <q-input filled v-model="password" label="Contraseña" stack-label class="separacion" type="password" />
    <q-btn color="deep-orange" glossy label="Login" @click="login"/>
    <a :href="google"><q-btn color="deep-orange" glossy label="Google" /></a>
    

  </div>
</template>

<script>
const axios = require('axios');
export default {
  data() {
    return {
        user: "",
        password: "",
        token: "",
        google: "http://localhost:3000/auth/google"
    };
  },
  async created() {
      sessionStorage.removeItem('token');
      let separar;
      if(window.location.href.includes('?')){
      separar = window.location.href.split("?");

      }

      if(separar != undefined){
        let datos = separar[1];
        console.log(datos);
        
        let datos2 = datos.split('&');
        console.log(datos2);

        let usergoogle = datos2[1];
        let tokengoogle = datos2[0]
        this.token = tokengoogle;
        sessionStorage.setItem('token', this.token);
        sessionStorage.setItem('user', usergoogle.replace("%40",'@'));
        this.$router.push("/posts");
      }
      
  },
  methods: {
      login: async function(){
          console.log("hola");
        const data = {
          user: this.user,
          pass: this.password,
        };
        let url = "http://localhost:3000/auth/login";
        const axiospost = await axios.post(url, data, {
          headers: {
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json"
          }
        });
        this.token = axiospost.data.jwt;
        console.log(axiospost.data);
        sessionStorage.setItem('token', this.token)
        sessionStorage.setItem('userid', axiospost.data.userId)
        this.$router.push("/posts");
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