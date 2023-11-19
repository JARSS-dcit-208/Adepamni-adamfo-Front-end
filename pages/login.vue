<template>
  <nuxt-layout name="auth">
    <div class="login-page">
      <div class="signup-banner pt-12 pb-8 px-4">
        <div class="text-h4 pb-8">Login to <span class="font-italic">Account</span></div>
        <div class="pb-4">Don't have an account yet?</div>
        <div>
          <v-btn to="/signup"  class="mb-12 signup-btn" rounded="xl" size="x-large">
            <div style="min-width: 300px;" class="d-inline-flex justify-space-between align-center">
              <div class="font-italic font-weight-bold">Sign up</div>
              <v-icon icon="mdi-arrow-right"></v-icon>
            </div>
          </v-btn>
        </div>
      </div>
      <div class="login-form pt-12 pb-8 px-4">
        <login-form/>
      </div>
    </div>
  </nuxt-layout>
</template>

<script setup>
definePageMeta({
  layout: false,
  auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: '/',
  }
});
</script>

<style lang="scss" scoped>
  .signup-btn{
    color: white;
    background: black;
    border: 1px solid white;
  }
  .signup-banner{
    color: white;
    background: black;
  }
  .login-form{
    height: 100vh;
    background: #f8f6ef;
  }
</style>