<template>
<v-dialog
  v-model="showDialog"
  transition="dialog-bottom-transition"
  width="500">
  <v-card>
      <v-card-title primary-title>
        Record payment
      </v-card-title>
      <v-card-text class="pa-5">
          <v-form ref="sendForm" v-model="valid" lazy-validation>
              <v-autocomplete
                item-title="fullname"
                item-value="id"
                label="Customer"
                v-model="customer"
                :items="customers"
                :loading="loadingCustomers"
                hide-no-data
                @update:search="debouncedSearch"
                item-text="fullname"
                placeholder="Start typing to Search"
                clearable
                return-object
              ></v-autocomplete>
              <v-text-field type="number" v-model="form.amount" label="Amount" ></v-text-field>
              <v-text-field v-model="form.description" label="Description" ></v-text-field>
          </v-form>
      </v-card-text>
      <v-card-actions class="pa-5">
          <v-btn class="ml-auto" @click="save()" color="primary">Save</v-btn>
          <v-btn class="ml-auto" @click="close()" outlined color="primary">Cancel</v-btn>
      </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script setup>
 import debounce from 'debounce'
// const props = defineProps({
//   showDialog: null,
// });
const emit = defineEmits(['payment-made'])
const route = useRoute()
const successNotification = inject('successNotification')
const fetchPayments = inject('fetchPayments')
const initialForm = {amount: '', description: ''}
const form = ref(Object.assign({}, initialForm))
const customer = ref(null)
const customers = ref([])
const showDialog = ref(false)
const search = ref('')
const loadingCustomers = ref(false)
const open = function(mCustomer = null) {
  customer.value = mCustomer
  showDialog.value = true
}
const close = function() {
  showDialog.value = false
}

async function save() {
  const { $api } = useNuxtApp();
  const params = {
    payment: Object.assign({}, form.value)
  }
  const customerId = customer.value.id
  console.info(customerId)
  try {
    const response = await $api.createPayment(customerId, params)
    console.info(response)
    // successNotification(response.data.message)
    close()
    emit('payment-made')
  } catch (error) {
    
  }
}


const debouncedSearch = debounce(async (value) => {
  if (!value) {
    return
  }
  
  // Handle empty value
  if (!value) {
    customers.value = [];
    customer.value = null
  }
  // Items have already been requested
  if (loadingCustomers.value) {
    return
  }
  loadingCustomers.value = true

  const { $api } = useNuxtApp();
  try {
    const response = await $api.searchCustomers({term: value})
    customers.value = response.data
  } catch (error) {
    
  }
  loadingCustomers.value = false
  
}, 200)

defineExpose({ open })
</script>