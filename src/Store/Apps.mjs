import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import _ from "lodash";
import {useRoute} from "vue-router";

export const useAppsStore = defineStore("AppsStore",()=>{
    const route = useRoute()
    const apps = reactive({
        loading: false,
        data: [
            {id: 1, icon: "mdi-view-dashboard", color: 'blue', title: "Dashboards"},
            {id: 2, icon: "mdi-account-multiple", color: 'green', title: "Clients App"},
            {id: 3, icon: "mdi-security", color: 'orange', title: "Admins"},
        ]
    })
    const activeApp = ref(1)

    const appMenuItems = ref([
        {id: 1, appId: 1, icon: "mdi-monitor-dashboard", title: "Analytical", path: "analytical"},
        {id: 2, appId: 1, icon: "mdi-monitor-dashboard", title: "Dashboards Two", path: "DashboardTwo"},
        {id: 3, appId: 1, icon: "mdi-monitor-dashboard", title: "Dashboards Three", path: "DashboardThree"},

        {id: 4, appId: 2, icon: "mdi-account-plus", title: "New Client", path: "new-client"},
        {id: 5, appId: 2, icon: "mdi-account", title: "Clients", path: "Clients"},
        {id: 6, appId: 2, icon: "mdi-account", title: "Clients Three", path: "ClientThree"},

        {id: 7, appId: 3, icon: "mdi-security-network", title: "Admins One", path: "Admin"},
        {id: 8, appId: 3, icon: "mdi-security-network", title: "Admins Two", path: "AdminTwo"},
        {id: 9, appId: 3, icon: "mdi-security-network", title: "Admins Three", path: "AdminThree"},
    ])
    const activeAppMenuItems = reactive({
        loading: false,
        data: []
    })

    const initMenuItems = async ()=>{
        try {
            activeAppMenuItems.loading = true
            _.delay(()=>{
                activeApp.value = _.find(appMenuItems.value,['path',route.name]).appId
                activeAppMenuItems.data = [..._.filter(appMenuItems.value,['appId',activeApp.value])]
                activeAppMenuItems.loading = false
            },500)
        } catch (e) {
            /*throw e.response.data.errors*/
            throw ['Menu Items Error']
        }
    }

    return {
        apps,
        activeApp,
        appMenuItems,
        activeAppMenuItems,
        initMenuItems
    }
})