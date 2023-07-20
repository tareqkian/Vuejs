import {defineStore} from "pinia";
import {ref} from "vue";
import _ from "lodash";

export const useAuthStore = defineStore('AuthStore',()=>{
    const users = ref([
        {
            id: 1,
            name: 'Admin',
            userName: 'Administrator',
            email: 'admin@admin.com',
            password: 'admin123'
        },
        {
            id: 2,
            name: 'User',
            userName: 'Normal_User',
            email: 'user@user.com',
            password: 'user123'
        }
    ])

    const TOKEN = ref(localStorage.getItem('TOKEN'))
    const USER = ref({
        ..._.find(users.value, ['id', +localStorage.getItem('userId')])
    })


    const login = async (payload)=>{
        try {
            /* your Login Api here */
            const foundUser = _.find(users.value,o=>(o.email === payload.userName || o.userName === payload.userName) && o.password === payload.password)
            TOKEN.value = 196516861
            USER.value = _.find(users.value,['id',+foundUser.id])
            localStorage.setItem('TOKEN',196516861)
            localStorage.setItem('userId',foundUser.id)
        } catch (e) {
            /*throw e.response.data.errors*/
            throw [ "Wrong User Name Or Password" ]
        }
    }


    const logout = async ()=>{
        try {
            /* your Logout Api here */
            localStorage.removeItem('TOKEN')
            localStorage.removeItem('userId')
            TOKEN.value = USER.value = null
        } catch (e) {
            /*throw e.response.data.errors*/
            throw [ "Error While Logout" ]
        }
    }

    return {
        TOKEN,
        USER,
        login,
        logout
    }
})