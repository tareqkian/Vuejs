<template>
  <template v-if="!toolbarItems">
    <div v-if="activeAppMenuItems.loading" class="d-flex justify-center pa-10">
      <v-progress-circular
          indeterminate
          size="64"
          color="primary"
      />
    </div>
    <v-list v-else density="compact" nav>
      <v-list-item
        v-for="{id, icon, title, path} in activeAppMenuItems.data" :key="id"
        :prepend-icon="icons ? icon : ''"
        :title="title"
        :to="{name: path}"
      />
    </v-list>
  </template>
  <template v-if="toolbarItems">
    <v-toolbar-items v-for="{id, icon, title, path} in activeAppMenuItems.data" :key="id">
      <v-btn
        :prepend-icon="icons ? icon : ''"
        :title="title"
        :to="{name: path}"
        :value="title"
        variant="text"
        rounded="lg"
        class="ms-1"
      > {{ title }} </v-btn>
    </v-toolbar-items>
  </template>
</template>

<script setup>
import {useAppsStore} from "../../Store/Apps.mjs";
import {computed} from "vue";

defineProps({
  "icons": {
    type: Boolean,
    default: true,
    required: false
  },
  "toolbarItems": {
    type: Boolean,
    default: false,
    required: false
  }
})
const appsStore = useAppsStore()
const activeAppMenuItems = computed(()=>appsStore.activeAppMenuItems)

</script>

