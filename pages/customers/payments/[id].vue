<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <v-card-text class="default-layout-page-header">
        <span v-if="customer">{{customer.firstname}}'s</span> Transactions -> 10 transactions total
      </v-card-text>
      <div class="mr-4">
         <v-btn
            @click="newPayment"
          >
            Record payment
          </v-btn>
      </div>
    </div>
    <div>
      <payments-list ref="payment_list" :customerId="customerId"/>
    </div>
    <payments-form @payment-made="refreshData"  ref="payment_form"  />
  </div>
</template>

<script setup >
definePageMeta({
  title: 'Customer payments'
})
const payment_form = ref(null)
const payment_list = ref(null)
const route = useRoute()
const customerId = route.params.id
const customer = ref(null)
async function fetchData(){
  const { $api } = useNuxtApp();
  const response = await $api.getCustomer(route.params.id)
  customer.value = response
}
onMounted(() => {
  fetchData()
})
async function refreshData(){
  payment_list.value.fetchData()
}
function newPayment() {
  payment_form.value.open(customer.value)
}
</script>
