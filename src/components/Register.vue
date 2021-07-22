<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="login card-panel gray lighten-4 black-text center">
                        <h3>Register</h3>
                        <form>
                        <div class="input-field">
                            <i class="material-icons prefix">email</i>
                            <input type="email" id="email" v-model="email">
                            <label for="email">Email</label>
                        </div>
                         <div class="input-field">
                            <i class="material-icons prefix">lock</i>
                            <input type="password" id="password" v-model="password">
                            <label for="password">Password</label>
                        </div>
                        <button @click="register" type="submit" class="btn btn-large grey lighten-4 black-text">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase';
export default {
    name:'Register',
    data(){
        return{
            email: '',
            password:'',
        }
    },
    methods:{
        register: function(e){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(user =>{
                alert(`Account Created for ${user.email}`);
                this.$router.go({path: this.$router.path})
            },
            err=>{
                alert(err.message);
            })
            e.preventDefault();
        }
    }
}
</script>