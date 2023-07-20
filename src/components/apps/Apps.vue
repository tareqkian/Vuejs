<template>
  <template v-if="!toolbarItems && !isMobile">
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-apps" value="apps" @click="overlay=!overlay" :active="false"></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item
          v-for="({id, icon, title},index) in apps.data"
          :key="index"
          :prepend-icon="icon"
          :value="title"
          :to="{name: title}"
          @click="activeApp=id"
      ></v-list-item>
    </v-list>
  </template>
  <template v-if="toolbarItems">
    <v-toolbar-items
      v-for="({id, icon, title},index) in apps.data"
      :key="index"
    >
      <v-btn
        :prepend-icon="icon"
        variant="text"
        rounded="lg"
        :to="{name: title}"
        @click="activeApp=id"
        :value="title"
        class="ms-1"
      > {{ title }} </v-btn>
    </v-toolbar-items>
  </template>

  <template v-if="isMobile">
    <v-btn icon="mdi-apps" value="apps" @click="overlay=!overlay" :active="false" variant="plain"></v-btn>
  </template>

  <v-overlay v-model="overlay" class="align-center justify-center" :close-on-content-click="true">
    <v-progress-circular
        v-if="apps.loading"
        indeterminate
        size="64"
        color="primary"
    ></v-progress-circular>
    <v-container v-else>
      <v-row>
        <v-col
            v-for="({id, icon, color, title},index) in apps.data"
            :key="index"
            class="d-flex flex-column align-center"
        >
          <v-btn
              class="ma-5"
              size="large"
              :icon="icon"
              :color="color"
              :variant="id===activeApp ? 'outlined' : 'elevated'"
              :to="{name: title}"
              @click="activeApp=id"
          ></v-btn>
          <span>{{ title }}</span>
        </v-col>
      </v-row>
    </v-container>
  </v-overlay>

</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useAppsStore} from "../../Store/Apps.mjs";

defineProps({
  "toolbarItems": {
    type: Boolean,
    default: false,
    required: false
  },
  "isMobile": {
    type: Boolean,
    default: false,
    required: false
  }
})

const overlay = ref(false)

const appsStore = useAppsStore()
const apps = computed(()=>appsStore.apps)
let activeApp = computed({
  get: () => appsStore.activeApp,
  set: val => appsStore.activeApp = val
})
onMounted(()=>appsStore.initMenuItems())
watch(
    ()=>activeApp.value,
    (val)=>{
      appsStore.initMenuItems()
    }
)
</script>