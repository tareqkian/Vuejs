<template>
  <v-sheet class="login-bg">
    <v-sheet
        class="d-flex pa-5 login-form"
        elevation="12"
        width="30%"
        height="100vh"
    >
      <v-sheet
          class="ma-2 pa-2 align-self-center pa-5"
          width="100%"
      >
        <v-sheet class="pa-5">
          <div class="text-h4 font-weight-bold"> Sign in to your account </div>
          <small class="text-grey"> Or <a href="#" class="text-decoration-none">Create new account</a> </small>
          <v-divider />
          <div class="py-2"></div>
          <div class="text-subtitle-2 text-grey"> Sign in with </div>
          <v-sheet class="w-100 d-flex justify-space-between">
            <v-btn class="w-25"> <v-icon icon="mdi-facebook"></v-icon> </v-btn>
            <v-btn class="w-25"> <v-icon icon="mdi-twitter"></v-icon> </v-btn>
            <v-btn class="w-25"> <v-icon icon="mdi-google"></v-icon> </v-btn>
          </v-sheet>
        </v-sheet>

        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="validate"
        >
          <v-card
            class="mx-auto pa-10 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
          >

            <v-list v-if="errors.length" lines="one">
              <v-alert prominent type="error" variant="outlined">
                <v-list-item
                    v-for="(error,index) in errors"
                    :key="index"
                    :title="error"
                ></v-list-item>
              </v-alert>
            </v-list>

            <v-text-field
              v-model="login.userName"
              :rules="rules.userName"
              label="User Name | Email"
              prepend-inner-icon="mdi-email-outline"
              variant="underlined"
              required
            />
            <v-text-field
              v-model="login.password"
              :rules="rules.password"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="visible = !visible"
              prepend-inner-icon="mdi-lock-outline"
              label="Password"
              variant="underlined"
              :type="visible ? 'text' : 'password'"
              required
            />
            <v-card-text class="text-end">
              <a href="#" class="text-decoration-none">forget password</a>
            </v-card-text>

            <v-btn
              type="submit"
              color="success" class="mt-4"
              block :loading="loading"
            > Sign in </v-btn>
          </v-card>
        </v-form>

      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script setup>

import {reactive, ref} from "vue";
import {useAuthStore} from "../Store/Auth.mjs";
import { useRouter } from "vue-router"
import _ from "lodash";

const { push } = useRouter()

const form = ref()
const visible = ref(false)
const valid = ref(true)
const login = reactive({
  userName: 'admin@admin.com',
  password: 'admin123'
})
const rules = reactive({
  userName: [ v => !!v || 'User Name | Email is Required' ],
  password: [
      v => !!v || 'Password is Required',
      v => v.length >= 8 || 'Password Length Must be at least 8'
  ],
})

const AuthStore = useAuthStore()
const loading = ref(false)
const errors = ref([])
const validate = async () => {
  try {
    errors.value = []
    const { valid } = await form.value.validate()
    if ( valid ) {
      loading.value = true
      await AuthStore.login(login)
      _.delay(()=>{
        push({name: 'analytical'})
      },500)
    }
  } catch (e) {
    loading.value = false
    errors.value = e
  }
}

</script>

<style scoped>
.login-bg {
  background-image: url("/login.jpg");
}
</style>