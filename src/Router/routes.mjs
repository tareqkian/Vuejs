import Login from "../Views/Login.vue";
import Layout from "../components/layouts/Layout.vue";
import Dashboard from "../Views/Dashboard.vue";
import Analytical from "../Views/Analytical.vue"
import NewClient from "../Views/NewClient.vue"

const routes = [
    { path: '/login', name: 'Login', component: Login, meta: {isGuest: true} },
    {
        path: '/',
        redirect: '/analytical',
        name: "Dashboards",
        component: Layout,
        meta: {reqAuth: true},
        children: [
            {path: '/analytical', name: "analytical", component: Analytical, meta: {pageTitle: "Analytical"}},
            {path: '/dashboardTwo', name: "DashboardTwo", component: Dashboard, meta: {pageTitle: "Dashboard Two"}},
            {path: '/dashboardThree', name: "DashboardThree", component: Dashboard, meta: {pageTitle: "Dashboard Three"}},
        ]
    },
    {
        path: '/clients-app',
        redirect: '/clients',
        name: "Clients App",
        component: Layout,
        meta: {reqAuth: true},
        children: [
            {path: '/new-client', name: "new-client", component: NewClient, meta: {pageTitle: "New Client"}},
            {path: '/clients', name: "Clients", component: Dashboard, meta: {pageTitle: "Clients"}},
            {path: '/clientThree', name: "ClientThree", component: Dashboard, meta: {pageTitle: "Client Three"}},
        ]
    },
    {
        path: '/admins',
        redirect: '/admin',
        name: "Admins",
        component: Layout,
        meta: {reqAuth: true},
        children: [
            {path: '/admin', name: "Admin", component: Dashboard, meta: {pageTitle: "Admin"}},
            {path: '/adminTwo', name: "AdminTwo", component: Dashboard, meta: {pageTitle: "Admin Two"}},
            {path: '/adminThree', name: "AdminThree", component: Dashboard, meta: {pageTitle: "Admin Three"}},
        ]
    },
];

export default routes