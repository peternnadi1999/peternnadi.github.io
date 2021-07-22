<template>
    <div>
         <h3>New Employee</h3>
        <div class="row">
            <form @submit.prevent="saveEmployee" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input class="mt-3" type="text" v-model="employee_id" required>
                        <label>Employee ID#</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input class="mt-3" type="text" v-model="name" required>
                        <label>Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input class="mt-3" type="text" v-model="dept" required>
                        <label>Department</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input class="mt-3" type="text" v-model="Position" required>
                        <label>Position</label>
                    </div>
                </div>

                <button type="submit" class="btn">Sumbit</button>
                <router-link to="/" class="btn grey ml-3">Cancel</router-link>
            </form>
        </div>

    </div>
</template>
<script>
import db from './firebaseinit'
export default {
    name: 'New',
     data(){
        return{
            employee_id: null,
            name: null,
            dept: null,
            Position:null
        }
    },
    methods:{
        saveEmployee(){
            db.collection('employees').add({
                employee_id: this.employee_id,
                name:this.name,
                dept:this.dept,
                Position:this.Position
            }).then(docRef =>
                this.$router.push('/')
            ).catch(error =>
                console.log(error)
            )
    }
    }

}
</script>