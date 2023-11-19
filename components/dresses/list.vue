<template>
  <v-container class="">
    <v-row no-gutters>
      <v-col
        v-for="dress in dresses"
        :key="dress.id"
        cols="12"
        sm="4"
      >
        <v-sheet style="background-color: #f8f6ef;" class="ma-2 pa-2">
          <v-card
            bg-color="#f8f6ef"
            class="mx-auto"
            style="cursor: pointer;"
            max-width="344"
          > 
            <v-img v-if="dress.image_url"
              :src="dress.image_url"
              height="200px"
              cover
            ></v-img>
            <v-img v-else
              src="/img/dress.png"
              height="200px"
              cover
            ></v-img>

            <v-card-title>
              {{dress.name}}
            </v-card-title>

            <v-card-subtitle>
              Last updated, {{formatDate(dress.updated_at)}}
            </v-card-subtitle>
            <v-card-text>
              <span class="button-link" @click="editDress(dress)">Edit</span>
            </v-card-text>
          </v-card>

        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  dresses: null,
});
const editDress = inject('editDress')
const { dresses } = toRefs(props);

function formatDate(date){
  return 'Jan 5th, 2023'
}
</script>