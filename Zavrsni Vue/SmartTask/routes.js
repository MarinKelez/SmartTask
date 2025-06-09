import Home from './src/components/Home/Home.vue'
import Login from './src/components/LoginPage/Login.vue'
import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: Login},
        {path: "/home/:id/:name", component: Home}
    ]
})

export default router;