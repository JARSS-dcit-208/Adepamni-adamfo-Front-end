<template>
  <div>
    <v-container style="background: #f8f6ef;">
      <div>
        <h3 class="mb-6" v-if="customer">Edit {{customer.firstname}} {{customer.lastname}}</h3>
        <customers-form v-if="customer" :customer="customer" />
      </div> 
    </v-container>
  </div>
</template>


<script setup>
definePageMeta({
  title: 'Edit customer'
})
const route = useRoute()
const customer = ref(null)

async function fetchData(){
  const { $api } = useNuxtApp();
  const response = await $api.getCustomer(route.params.id)
  customer.value = response
}
onMounted(() => {
  fetchData()
})
</script>