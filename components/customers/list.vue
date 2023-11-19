<template>
  <div>
    <v-container style="background: #f8f6ef;">
      <v-list
          style="background: #f8f6ef;cursor: pointer;"
          :items="computedData"
          item-props
          lines="three"
        >
        <v-list-item
            v-for="(item) in computedData"
            :to="`/customers/${item.id}`"
            :key="item.id"
            :prepend-avatar="item.prependAvatar"
            :title="item.title"
            :subtitle="item.subtitle"
          >
          <template v-slot:append>
            <v-btn
              :to="`customers/edit/${item.id}`"
              color="grey-lighten-1"
              icon="mdi-pencil"
              variant="text"
            ></v-btn>
          </template>
          </v-list-item>          
        </v-list>
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
// const { pending, data: customers } = useAsyncData('http://localhost:3000/customers', {
//   lazy: true
// })
// const params = ref({})
// const { data: customers, error } = await useAsyncData(
//   'cafes',
//   () => $fetch( `/customers`, {
//     method: 'GET',
//     baseURL: 'http://localhost:3000',
//     params: params.value,
//   } ), {
//     watch: [
//       params,
//     ]
//   }
// );
const data = ref(null)
const meta = ref({})
const page = ref(1)
const perPage = ref(10)
const computedData = computed(() => {
  if(data.value == null)return []
  return data.value.map(el => {
    return {
      prependAvatar: '/img/user.png',
      title: `${el.firstname} ${el.lastname}`,
      subtitle: el.phone,
      id: el.id,
    }
  })
})
async function fetchData(){
  const { $api } = useNuxtApp();
  let params = {page: page.value}
  const response = await $api.getCustomers(params)
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
</script>