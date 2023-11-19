<template>
  <div>
   <v-carousel :show-arrows="false" :hide-delimiters="true" cycle class="auth-carousel">
      <v-carousel-item
        src="/img/fashion1.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="/img/fashion2.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="/img/fashion3.jpg"
        cover
      ></v-carousel-item>
    </v-carousel>
    <div class="d-flex flex-row justify-center align-end h-screen" >
      <v-btn to="/login"  class="mb-12 custom-primary-button" rounded="xl" size="x-large">
          <div style="min-width: 300px;" class="d-inline-flex justify-space-between align-center">
            <div>Get Started</div>
            <v-icon icon="mdi-arrow-right"></v-icon>
          </div>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
});
</script>

<style lang="scss" scoped>
  .auth-carousel{
    position: absolute;
    height: 100vh!important;
    z-index: -1!important;
  }
</style>