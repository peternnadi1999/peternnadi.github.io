<template>
    <div id="edit-employee">
        <h3>Edit Employee</h3>
        <div class="row">
            <form @submit.prevent="updateEmployee" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" disabled v-model="employee_id" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="dept" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="Position" required>
                    </div>
                </div>

                <button type="submit" class="btn">Update</button>
                <router-link to="/" class="btn grey ml-3">Cancel</router-link>
            </form>
        </div>


    </div>
</template>

<script>
import db from './firebaseinit'
export default {
    name: 'edit-employee',
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
        updateEmployee(){
             db.collection('employees').where('employee_id', '==',this.$route.params.employee_id)
            .get().then(
                querySnapshot =>{
                    querySnapshot.forEach(doc =>{
                        doc.ref.update({
                            employee_id: this.employee_id,
                            name: this.name,
                            dept: this.dept,
                            Position: this.Position
                        })
                        .then(() =>{
                            this.$router.push({name: 'viewemployee', params:{employee_id: this.employee_id  }})
                        })
                    })
                }
            )
        }
    }
}
</script>