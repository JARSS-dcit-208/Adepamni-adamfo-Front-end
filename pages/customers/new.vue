<template>
  <div>
    <v-container style="background: #f8f6ef;">
      <div>
        <h3 class="mb-6" >New customer</h3>
        <customers-form />
      </div> 
    </v-container>
  </div>
</template>


<script setup>
definePageMeta({
  title: 'Add new customer'
})
</script>