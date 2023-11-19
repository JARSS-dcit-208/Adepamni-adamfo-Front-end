<template>
  <div v-if="showFullPageProgressLoader" class="full-page-progress-loader d-flex justify-center align-center">
    <v-progress-circular indeterminate></v-progress-circular>
  </div>
</template>


<style lang="scss">
.full-page-progress-loader{
  height: 100vh;
  z-index: 1000;
  position: absolute;
  width: 100%;
  background: #ffffff82;
}
</style>