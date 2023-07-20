import { createRouter, createWebHistory } from "vue-router";
import {useAuthStore} from "../Store/Auth.mjs";
import routes from "./routes.mjs";



const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    if ( to.meta.reqAuth && !authStore.TOKEN ) next({name: 'Login'})
    else if ( authStore.TOKEN && to.meta.isGuest ) next({name: 'Dashboard'})
    else next()
})

export default router