<template>
<v-dialog
  v-model="showDialog"
  transition="dialog-bottom-transition"
  width="500">
  <v-card>
      <v-card-title primary-title>
        Add a new dress
      </v-card-title>
      <v-card-text class="pa-5">
          <v-form ref="sendForm" v-model="valid" lazy-validation>
              <v-text-field v-model="dress.name" label="Name" ></v-text-field>
              <v-file-input
                  accept="image/*" 
                  label="Click here to select a photo"
                  outlined
                  @change="preview"
                  v-model="dress.image"
                >
                </v-file-input>
                <v-img :src="url"></v-img>
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
// const props = defineProps({
//   showDialog: null,
// });
const route = useRoute()
const customerId = route.params.id
const successNotification = inject('successNotification')
const fetchCustomer = inject('fetchCustomer')
const initialForm = {name: '', image: null, preview: null}
const dress = ref(Object.assign({}, initialForm))
const currentDress = ref(null)
const showDialog = ref(false)
const url = ref(null)
const file = null
const open = function(mDress = null) {
  currentDress.value = mDress
  dress.value = Object.assign({}, initialForm)
  if(mDress){
    dress.value = {name: mDress.name}
    url.value = mDress.image_url
  }
  showDialog.value = true
}
const close = function() {
  showDialog.value = false
}

async function save() {
  const { $api } = useNuxtApp();
  const form = dress.value
  // post file to server
  const params = {
    dress: {
      'name': form.name,
    }
  }
  if(form.image && form.image[0]){
    params['dress']['image'] = form.image[0]
  }

  try {
    const response = await $api.upsertDress(customerId, 
    currentDress.value ? currentDress.value.id : null, params)
    console.info(response)
    successNotification(response.data.message)
    close()
    fetchCustomer()
  } catch (error) {
    
  }
}

function preview() {
  url.value = URL.createObjectURL(dress.value.image[0])
}

defineExpose({ open })
</script>