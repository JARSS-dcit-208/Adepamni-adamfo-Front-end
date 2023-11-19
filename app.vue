<template>
  <div class="app">
    <!-- <full-page-progress-loader/> -->
    <v-snackbar
      v-model="successNotificationVisible"
      top
      right
      :timeout="2000"
      location="top"
      color="primary"
    >
      {{notifications.success}}
    </v-snackbar>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const successNotificationVisible = ref(false)
const notifications = ref({success: null, error: null})

function successNotification(message){
  notifications.value.success = message
  successNotificationVisible.value = true
}
provide('successNotification', successNotification)
</script>

<style lang="scss">
.custom-primary-button{
  color: white;
  background: blue;
}
.app{
  background: #f8f6ef;
  min-height: 100vh;
}
</style>
