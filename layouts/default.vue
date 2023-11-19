<template>
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar
        color="#f8f6ef"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{route.meta.title}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title>
                <template v-if="data">
                  <div class="ml-6">
                    {{data.fullname}}
                  </div>
                  <div class="ml-6">
                    {{data.email}}
                  </div>
                </template>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="main-layout-dropdown"
            >
              <v-list-item-title>
                <v-btn block @click="logout">Logout</v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="left"
        color="#f8f6ef"
      >
        <v-list
          :items="items"
          
        >
          <v-list-item
            v-for="(item) in items"
            :to="item.to"
            :key="item.title"
            :title="item.title"
          >
          </v-list-item> 
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 500px;">
        <slot/>
      </v-main>
    </v-layout>
</template>

<script setup>
const { $isMobile } = useNuxtApp()
const drawer = ref(!$isMobile())
const route = useRoute()
const { signOut, data } = useAuth()
if(!data.value){
  navigateTo(`/login`)
}
console.info(data.value)
const items = ref([
    {
      to: '/customers',
      title: 'Customers',
      value: 'foo',
    },
    {
      to: '/payments',
      title: 'Payments',
      value: 'fizz',
    },
  ]
)
const group = ref(null)
function logout(){
  signOut({callbackUrl: '/login'})
}

watch(group,() => {
  drawer.value = false
})
</script>
