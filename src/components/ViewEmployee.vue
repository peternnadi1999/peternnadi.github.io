<template>
    <div id="ViewEmployee">
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>{{name}}</h4>
            </li>
            <li class="collection-item">Employee ID#: {{employee_id}}</li>
            <li class="collection-item">Department: {{dept}}</li>
            <li class="collection-item">Position: {{Position}}</li>
        </ul>

        <router-link to="/" class="btn grey">Back</router-link>

        <button @click="deleteEmployee" class="btn red ml-4">Delete</button>

        <div class="fixed-action-btn">
        <router-link v-bind:to="{name:'edit-employee', params:{employee_id: employee_id}}" class="btn-floating btn-large bg-danger">
        <i class="fa fa-pen"></i>
        </router-link>
    </div>
    </div>
</template>

<script>
import db from './firebaseinit'
export default {
    name:"ViewEmployee",
    data(){
        return{
            employee_id: null,
            name: null,
            dept: null,
            Position:null
        }
    },
    beforeRouteEnter(to, from, next){
        db.collection('employees').where(
        'employee_id', '==', to.params.employee_id).get()
        .then(
            querySnapshot =>{
                querySnapshot.forEach(doc =>{
                    next(vm =>{
                        vm.employee_id = doc.data().employee_id,
                        vm.name = doc.data().name,
                        vm.dept = doc.data().dept,
                        vm.Position = doc.data().Position
                    })
                })
            }

        )
    },
    watch:{
        '$route': 'fetchData'
    },
    methods:{
        fetchData(){
            db.collection('employees').where('employee_id', '==',this.$route.params.employee_id)
            .get().then(
                querySnapshot =>{
                    querySnapshot.forEach(doc =>{
                        this.employee_id =doc.data().employee_id,
                        this.name = doc.data().name,
                        this.dept = doc.data().dept,
                        this.Position = doc.data().Position
                    })
                }
            )
        },
        deleteEmployee(){
            if (confirm('Are you sure')) {
                  db.collection('employees').where('employee_id', '==',this.$route.params.employee_id)
            .get().then(
                querySnapshot =>{
                    querySnapshot.forEach(doc =>{
                        doc.ref.delete()
                        this.$router.push('/')
                    })
                }
            )
                
            }
        }
    }

}
</script>