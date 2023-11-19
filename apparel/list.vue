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
            prepend-avatar="/img/fashion1.jpg"
            :title="item.title"
            :subtitle="item.subtitle"
          >
          </v-list-item>          
        </v-list>
      <!-- <v-row  class="mb-4" v-for="customer in data" :key="customer.url" no-gutters>
        <v-col
          cols="3"
        >
          <v-img
            :width="40"
            aspect-ratio="16/9"
            cover
            src="/img/user.png"
          ></v-img>
        </v-col>
        <v-col
          cols="9"
        >
          <div>
            {{customer.firstname}} {{customer.lastname}}
          </div>
          <div>
            {{customer.phone}}
          </div>
        </v-col>
      </v-row> -->
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
const computedData = computed(() => {
  console.info(data.value)
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
  const response = await $api.getCustomers()
  data.value = response
  
}

onMounted(() => {
  fetchData()
})
</script>