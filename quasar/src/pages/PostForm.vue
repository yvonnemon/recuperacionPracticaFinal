<template>
  <q-page class="flex flex-center">
        <q-input v-model="text" label="E-mail" />
        <q-input v-model="password" type="password" label="password" />
        <q-btn color="primary" label="send" @click="send"/>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data(){
      return{
          email:'',
          password:''
      }
  },
  methods:{
    async send(){//user admin pass 1234, y deberia ser con post
    //url antigua: 'http://server247.cfgs.esliceu.net/t4/login.php?user='+this.email+'&password='+this.password
      let usuarios = await this.$axios.get("http://localhost:8080/login",{
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    user:this.email,
                    pass: this.password
                })

            });

      console.log( await usuarios.text());
      
    }
  }
};

</script>