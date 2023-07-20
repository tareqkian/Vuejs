<template>
  <v-app :theme="theme">
    <v-navigation-drawer
        v-model="drawer"
        location="right"
        temporary
    >
      <v-list lines="two">
        <v-list-item title="Theme" subtitle="Light / Dark">
          <template v-slot:append>
            <v-switch
                v-model="theme"
                color="indigo"
                value="dark"
                false-value="light"
                hide-details
            ></v-switch>
          </template>
        </v-list-item>

        <v-list-item title="Navbar" subtitle="Vertical / Horizontal">
          <template v-slot:append>
            <v-switch
                v-model="navbarMode"
                color="indigo"
                value="horizontal"
                false-value="vertical"
                hide-details
            ></v-switch>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <template v-if="!$isMobile()">
      <template v-if="navbarMode==='vertical'">
        <v-navigation-drawer rail permanent :image="image">
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-vuetify" value="Logo" :active="false"></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <Apps />
          <template v-slot:append>
            <v-list density="compact" nav>
              <v-list-item @click="drawer=!drawer" prepend-icon="mdi-cog-outline"></v-list-item>
            </v-list>
          </template>
        </v-navigation-drawer>
        <v-navigation-drawer
            expand-on-hover
            permanent
            :rail="rail"
            :image="image"
        >
          <v-list>
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                :title="USER.name"
                :subtitle="USER.email"
            ></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <MenuListItems />
          <template v-slot:append>
            <div class="pa-2">
              <v-btn @click="logout" block color="red">
                <span v-if="!rail">Logout</span>
                <v-icon v-else icon="mdi-logout" />
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <v-app-bar :image="image">
          <template v-slot:prepend>
            <v-app-bar-nav-icon @click="rail = !rail"></v-app-bar-nav-icon>
            <v-menu open-on-hover :open-delay="0">
              <template v-slot:activator="{props}">
                <v-btn append-icon="mdi-chevron-right" variant="plain" class="text-subtitle-2" v-bind="props"> {{ _.head(route.matched).name }} </v-btn>
              </template>
              <MenuListItems :icons="false" />
            </v-menu>
            <div class="text-subtitle-2 v-breadcrumbs-item--disabled"> {{ route.meta.pageTitle }} </div>
          </template>
          <template v-slot:append>
            <v-btn v-if="theme!==`dark`" @click="theme=`dark`" icon="mdi-weather-night"></v-btn>
            <v-btn v-else @click="theme=`light`" icon="mdi-white-balance-sunny"></v-btn>
          </template>
        </v-app-bar>
      </template>
      <template v-if="navbarMode==='horizontal'">
        <v-toolbar :image="image" flat>
          <v-container class="d-inline-flex h-100">
            <v-icon icon="mdi-vuetify" class="me-3" />
            <v-toolbar-title>Vuetify</v-toolbar-title>
            <Apps toolbar-items />
            <v-toolbar-items>
              <v-btn @click="drawer=!drawer" icon="mdi-cog-outline" variant="plain"></v-btn>
              <v-avatar image="https://randomuser.me/api/portraits/women/85.jpg"></v-avatar>
            </v-toolbar-items>
          </v-container>
        </v-toolbar>
        <v-toolbar :image="image" flat>
          <v-container class="d-flex h-100">
            <MenuListItems toolbar-items />
          </v-container>
        </v-toolbar>
      </template>
    </template>


    <template v-if="$isMobile()">
      <v-toolbar :image="image" flat>
        <v-container class="d-inline-flex h-100">
          <v-icon icon="mdi-vuetify" class="me-3" />
          <v-toolbar-title>Vuetify</v-toolbar-title>
          <Apps is-mobile />
          <v-toolbar-items>
            <v-btn @click="drawer=!drawer" icon="mdi-cog-outline" variant="plain"></v-btn>
            <v-avatar image="https://randomuser.me/api/portraits/women/85.jpg"></v-avatar>
          </v-toolbar-items>
        </v-container>
      </v-toolbar>
    </template>


    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-bottom-navigation v-if="$isMobile()" grow>
      <v-btn value="recent">
        <v-icon>mdi-history</v-icon>
        Recent
      </v-btn>
      <v-btn value="favorites">
        <v-icon>mdi-heart</v-icon>
        Favorites
      </v-btn>
      <v-btn value="nearby">
        <v-icon>mdi-map-marker</v-icon>
        Nearby
      </v-btn>
    </v-bottom-navigation>

  </v-app>
</template>

<script setup>
import Apps from "../apps/Apps.vue"
import MenuListItems from "../apps/MenuListItems.vue";
import {computed, ref} from "vue";
import {useAuthStore} from "../../Store/Auth.mjs";
import { useRouter, useRoute } from "vue-router";
import _ from "lodash"
import {useAppsStore} from "../../Store/Apps.mjs";

const route = useRoute()
const { push } = useRouter()

const theme = ref("dark")
const navbarMode = ref("vertical")
const image = ref()
const rail = ref(false)
const drawer = ref(false)

const appsStore = useAppsStore()
const activeAppMenuItems = computed(()=>appsStore.activeAppMenuItems)

const AuthStore = useAuthStore()
const USER = computed(()=>AuthStore.USER)
const logout = async ()=>{
  try {
    await AuthStore.logout()
    await push({ name: 'Login' })
  } catch (e) {
    console.log(e)
  }
}
</script>
