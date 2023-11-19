<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <v-card-text class="default-layout-page-header">
        Transactions -> 10 transactions total
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
      <payments-list ref="payment_list"/>
    </div>
    <payments-form @payment-made="refreshData"  ref="payment_form"  />
  </div>
</template>

<script setup >
definePageMeta({
  title: 'Payments'
})
const payment_form = ref(null)
const payment_list = ref(null)
function newPayment() {
  payment_form.value.open()
}
async function refreshData(){
  console.info('here')
  payment_list.value.fetchData()
}
</script>
