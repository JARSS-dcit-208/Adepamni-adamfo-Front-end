<template>
  <div v-if="customer">
    <v-container style="background: #f8f6ef;">
      <div>
        <v-card width="400" style="background: #f8f6ef;box-shadow: none;" >
          <v-card-item>
            <v-card-title>{{customer.firstname}} {{customer.lastname}}
              <v-btn
                :to="`/customers/edit/${customer.id}`"
                color="grey-lighten-1"
                icon="mdi-pencil"
                variant="text"
              ></v-btn>
            </v-card-title>

            <v-card-subtitle>
              {{customer.email}}
              <span class="indicator"></span>
              {{customer.phone}}
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            {{customer.address}}
            <div><a :href="`/customers/payments/${customer.id}`" class="button-link" @click="createDress">View payments</a></div>
          </v-card-text>
        </v-card>  
        <v-divider class="mt-8"></v-divider>
        <v-card width="800" style="background: #f8f6ef;box-shadow: none;" >
          <v-card-item>
            <v-card-title>Measurements</v-card-title>
          </v-card-item>

          <v-card-text>
            <v-table style="background: #f8f6ef;">
              <tbody>
                <tr
                  v-for="measurement in measurements"
                  :key="measurement[0]"
                >
                  <td>{{ snakeToTitle(measurement[0]) }}</td>
                  <td><span v-if="measurement[1]">{{ measurement[1] }} inches</span></td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card> 
        <v-divider class="mt-8"></v-divider>
        <v-card  style="background: #f8f6ef;box-shadow: none;" >
          <v-card-item>
            <v-card-title>Apparel</v-card-title>
            <v-card-subtitle>
              <span class="button-link" @click="createDress">Create new</span>
            </v-card-subtitle>
          </v-card-item>
        </v-card> 
        <dresses-list :dresses="customer.dresses"/>
      </div> 
    </v-container>
    <dresses-form :dress="currentDress" ref="dresses_form"  />
  </div>
</template>


<script setup>
definePageMeta({
  title: 'View customer'
})
const route = useRoute()
const customer = ref(null)
const dresses_form = ref(null)
const currentDress = ref(null)

function snakeToTitle(str){
  return str.split('_').map(function (item) {
      return item.charAt(0).toUpperCase() + item.substring(1);
  }).join(' ');
}

function createDress() {
  dresses_form.value.open()
}

function editDress(dress) {
  dresses_form.value.open(dress)
}

async function fetchData(){
  const { $api } = useNuxtApp();
  const response = await $api.getCustomer(route.params.id)
  customer.value = response
  
}
const measurements = computed(() => {
  if(customer.value == null)return []
  return Object.keys(customer.value.measurement).filter(key=> key != 'id').map(key => {
    return [key, customer.value.measurement[key]]
  })
})
onMounted(() => {
  fetchData()
})
provide('fetchCustomer', fetchData)
provide('editDress', editDress)
</script>