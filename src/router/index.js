import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import ViewEmployee from '@/components/ViewEmployee.vue'
import New from '@/components/New.vue'
import Edit from '@/components/Edit.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest:true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresGuest:true
    }
  },
  {
    path: '/new',
    name: 'new',
    component: New,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/edit/:employee_id',
    name: 'edit-employee',
    component: Edit,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/:employee_id',
    name: 'viewemployee',
    component: ViewEmployee,
    meta: {
      requiresAuth:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
// av guard

router.beforeEach((to, from, next)=>{
// check for arequireAuth guard
if(to.matched.some(record=> record.meta.requiresAuth)){
//check if not loggedin
  if(!firebase.auth().currentUser){
    // go to login
    next({
      path: '/login',
      redirect: to.fullPath
    })
  }else{
    //proceed to route
    next();
  }
}else if(to.matched.some(record=> record.meta.requiresGuest)){
  //check if is loggedin
  if(firebase.auth().currentUser){
    // go to login
    next({
      path: '/',
      redirect: to.fullPath
    })
  }else{
    //proceed to route
    next();
  }

}else{
  //proceed to route
  next();
}
})