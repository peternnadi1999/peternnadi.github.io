<template>
<nav>
    <div class="nav-wrapper green">
        <div class="container">
            <router-link to="/" class="brand-logo text-center" style="color:white; font-weight:bold">Employee Manager</router-link>
            <ul class="right">
                <li v-if="isLoggedin"><span class="email black-text pr-5">{{CurrentUser}}</span></li>
                <li v-if="isLoggedin"><router-link to="/">Dashboard</router-link></li>
                <li v-if="!isLoggedin"><router-link to="/login">Login</router-link></li>
                <li v-if="!isLoggedin"><router-link to="/register">Register</router-link></li>
                <li v-if="isLoggedin"><button @click="logout" class="btn black">Logout</button></li>
            </ul>
        </div>
    </div>
</nav>

</template>

<script>
import firebase from 'firebase'
export default {
    name:'Navbar',
    data(){
        return{
            isLoggedin:false,
            CurrentUser: false
        }
    },
    created(){
        if(firebase.auth().currentUser){
            this.isLoggedin = true,
            this.CurrentUser =firebase.auth().currentUser.email
        }
    },
    methods:{
        logout: function(){
            firebase.auth().signOut().then(
                ()=>{
                    this.$router.go({path: this.$router.path});
                }
            )
        }
    }

}
</script>