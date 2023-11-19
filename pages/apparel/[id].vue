<template>
  <div v-if="customer">
    <v-container style="background: #f8f6ef;">
      <div>
        <v-card width="400" style="background: #f8f6ef;box-shadow: none;" >
          <v-card-item>
            <v-card-title>{{customer.firstname}} {{customer.lastname}}</v-card-title>

            <v-card-subtitle>
              {{customer.email}}
              <span class="indicator"></span>
              {{customer.phone}}
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            {{customer.address}}
          </v-card-text>
        </v-card>  
        <v-divider class="mt-8"></v-divider>
        <v-card style="background: #f8f6ef;box-shadow: none;" >
          <v-card-item>
            <v-card-title>Measurements</v-card-title>
          </v-card-item>

          <v-card-text>
            <v-table style="background: #f8f6ef;width: 100%;">
              <tbody>
                <tr
                  v-for="(key,value) in customer.measurement"
                  :key="key"
                >
                  <td style="">{{ snakeToTitle(value) }}</td>
                  <td style="width: 80px;">{{ key }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card> 
        <v-divider class="mt-8"></v-divider>
        <v-card  style="background: #f8f6ef;box-shadow: none;" >
          <v-card-item>
            <v-card-title>Apparel</v-card-title>
          </v-card-item>
          <v-card-text>
            <dresses-list/>
          </v-card-text>
        </v-card> 
      </div> 
    </v-container>
  </div>
</template>


<script setup>
const route = useRoute()
const customer = ref(null)

function snakeToTitle(str){
  return str.split('_').map(function (item) {
      return item.charAt(0).toUpperCase() + item.substring(1);
  }).join(' ');
}

async function fetchData(){
  const { $api } = useNuxtApp();
  const response = await $api.getCustomer(route.params.id)
  customer.value = response
  
}
onMounted(() => {
  fetchData()
})
</script>