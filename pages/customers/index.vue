<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <v-card-text class="default-layout-page-header">
        Customers -> 10 customers found
      </v-card-text>
      <div class="mr-4">
         <v-btn
            :to="`/customers/new`"
          >
            Add customer
          </v-btn>
      </div>
    </div>
    <div>
      <customers-list/>
    </div>
  </div>
</template>

<script setup >
definePageMeta({
  title: 'Customers'
})
</script>
