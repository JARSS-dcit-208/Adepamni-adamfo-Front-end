<template>
  <nuxt-layout name="auth">
    <div class="login-page">
      <div class="signup-banner pt-12 pb-8 px-4">
        <div class="text-h4 pb-8">Signup</div>
      </div>
      <div class="login-form pt-12 pb-8 px-4">
        <signup-form/>
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