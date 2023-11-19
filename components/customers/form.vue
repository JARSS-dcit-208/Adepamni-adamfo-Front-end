<template>
  <v-form @submit.prevent="save" ref="sendForm" v-model="valid" lazy-validation>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field v-model="form.firstname" label="Firstname" ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field v-model="form.lastname" label="Lastname" ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field v-model="form.email" label="Email" ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field type="phone" v-model="form.phone" label="Phone" ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field v-model="form.address" label="Address" ></v-text-field>
        </v-col>
      </v-row>
      <v-divider class="mt-8"></v-divider>
      <h6 class="my-4">Measurements</h6>
      <template v-if="form.measurement">
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field type="number" v-model="form.measurement.height" label="Height" ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field type="number" v-model="form.measurement.weight" label="Weight" ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field type="number" v-model="form.measurement.bust" label="Bust" ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field type="number" v-model="form.measurement.waist" label="Waist" ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field type="number" v-model="form.measurement.hips" label="Height" ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field type="number" v-model="form.measurement.inseam" label="Weight" ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field type="number" v-model="form.measurement.back_waist_length" label="Back waist length" ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field type="number" v-model="form.measurement.front_waist_length" label="Front waist length" ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field type="number" v-model="form.measurement.shoulder_to_shoulder" label="Shoulder to shoulder" ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field type="number" v-model="form.measurement.chest_depth" label="Chest depth" ></v-text-field>
        </v-col>
      </v-row>
      </template>

     <!-- 
     "armhole_depth"
     "crotch_depth"
     "neck_circumference"
     "sleeve_length"
     "bicep_circumference"
     "forearm_circumference"
     "thigh_circumference"
     "knee_circumference"
     "calf_circumference"
     "ankle_circumference" -->
      <v-btn type="submit" class="mt-2 mr-4">Submit</v-btn>
      <v-btn type="submit" class="mt-2">Cancel</v-btn>
  </v-form>
</template>

<script setup>
const props = defineProps({
  customer: null,
});
const { customer } = toRefs(props);
const route = useRoute()
const successNotification = inject('successNotification')
const initialForm = {
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  address: '',
  measurement: {
     "height": '',
     "weight": '',
     "bust": '',
     "waist": '',
     "hips": '',
     "back_waist_length": '',
     "front_waist_length": '',
     "shoulder_to_shoulder": '',
     "chest_depth": '',
     "armhole_depth": '',
     "inseam": '',
     "crotch_depth": '',
     "neck_circumference": '',
     "sleeve_length": '',
     "bicep_circumference": '',
     "forearm_circumference": '',
     "thigh_circumference": '',
     "knee_circumference": '',
     "calf_circumference": '',
     "ankle_circumference": '',
  }
}
const form = ref(Object.assign({}, initialForm))
if(customer.value){
  form.value = Object.assign({}, customer.value)
}

async function save() {
  const { $api } = useNuxtApp();
  const params = Object.assign({}, form.value)
  params.measurement_attributes = params.measurement
  delete params['measurement']
  try {
    const response = await $api.upsertCustomer(
    customer.value ? customer.value.id : null, params)
    console.info(response)
    // successNotification(response.data.message)
    navigateTo(`/customers/${response.data.id}`)
  } catch (error) {
    
  }
}
</script>