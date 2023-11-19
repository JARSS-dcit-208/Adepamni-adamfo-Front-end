<template>
  <v-form fast-fail @submit.prevent="signup">
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
          <v-text-field v-model="form.firstname" label="Firstname" ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field v-model="form.lastname" label="Lastname" ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field v-model="form.email" label="Email" ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field v-model="form.phone" label="Phone" ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field type="password" v-model="form.password" label="Password" ></v-text-field>
        </v-col>
      </v-row>

      <v-btn :loading="loading" type="submit"  class="mb-12 custom-primary-button" rounded="xl" size="x-large">
          <div style="min-width: 300px;" class="d-inline-flex justify-space-between align-center">
            <div>Sign up</div>
            <v-icon icon="mdi-arrow-right"></v-icon>
          </div>
      </v-btn>

      <div>
        <a href="/login" class="text-body-2 font-weight-regular">Login</a>
      </div>
  </v-form>
</template>

<script setup>
const { status, data, signUp } = useAuth()
const form = ref({})
const loading = ref(false)
const serverError = ref('')
async function signup() {
  try {
    loading.value = true
    const response = await signUp({user: Object.assign({}, form.value)}, {redirect: false})
    serverError.value = ''
    console.info(response)
    navigateTo('/login')
    // this.$toast.success('Logged In!')
  } catch (error) {
    serverError.value = error.data.status.message
  }finally{
    loading.value = false
  }
}
</script>
