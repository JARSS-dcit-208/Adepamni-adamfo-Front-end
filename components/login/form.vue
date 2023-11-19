<template>
  <v-form fast-fail @submit.prevent="login">
      <v-alert
        v-if="serverError"
        type="error"
        title="Login failed"
        :text="serverError"
      ></v-alert>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field  v-model="username" label="Email"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field type="password" v-model="password" label="password"></v-text-field>
        </v-col>
      </v-row>
      <v-btn :loading="loading" type="submit"  class="mb-12 custom-primary-button" rounded="xl" size="x-large">
          <div style="min-width: 300px;" class="d-inline-flex justify-space-between align-center">
            <div>Sign in</div>
            <v-icon icon="mdi-arrow-right"></v-icon>
          </div>
      </v-btn>

      <div>
        <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>
      </div>
  </v-form>
</template>

<script setup>
const { status, data, signIn } = useAuth()
const username = ref('')
const password = ref('')
const loading = ref(false)
const serverError = ref('')
async function login() {
  try {
    loading.value = true
    const response = await signIn({user: { 
      email: username.value,
      password: password.value,
    }}, {redirect: false})
    serverError.value = ''
    navigateTo('/customers')
    // this.$toast.success('Logged In!')
  } catch (error) {
    console.info(error)
    serverError.value = error.response.data
  }finally{
    loading.value = false
  }
}
</script>
