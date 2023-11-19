<template>
  <div>
    <v-container style="background: #f8f6ef;">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Customer
              </th>
              <th class="text-left">
                Amount
              </th>
              <th class="text-left">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in data"
              :key="item.id"
            >
              <td>{{ item.customer.fullname }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.description }}</td>
            </tr>
          </tbody>
        </v-table>
        <vue-awesome-paginate
          class="mt-6"
          :total-items="total"
          :items-per-page="perPage"
          :max-pages-shown="4"
          v-model="page"
          :on-click="onPageChanged"
        />
    </v-container>
  </div>
</template>

<script setup>
const data = ref(null)
const meta = ref({})
const props = defineProps({
  customerId: null,
});
const { customerId } = toRefs(props);
const page = ref(1)
const perPage = ref(10)
async function fetchData(){
  console.info('fetch')
  const { $api } = useNuxtApp();
  let params = {page: page.value}
  if(customerId.value){
    params.customer_id = customerId.value
  }
  const response = await $api.getPayments(params)
  data.value = response.data
  meta.value = response.meta
  
}
const pageCount = computed(() => {
  if(!data.value){
    return 0
  }
  return meta.value.total_pages
})
const total = computed(() => {
  if(!data.value){
    return 0
  }
  return meta.value.total
})
const onPageChanged = (mPage) => {
  fetchData()
};
onMounted(() => {
  fetchData()
})
defineExpose({ fetchData })
</script>