<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const welcomeMessage = ref('Welcome to Short Link Manager')
    const description = ref('Your ultimate tool for managing and analyzing your shortened links.')

    const route = useRoute()

    const showWelcome = computed(() => route.name === null || route.name === 'Welcome')

    return {
      welcomeMessage,
      description,
      showWelcome,
    }
  },
})
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title> Short Link Manager </v-toolbar-title>
      <v-spacer />
      <v-btn :to="{ name: 'Welcome' }" text> Home </v-btn>
      <v-btn :to="{ name: 'ShortenedLinks' }" text> Links </v-btn>
      <v-btn :to="{ name: 'Analytics', params: { shortUrl: 'example' } }" text> Analytics </v-btn>
    </v-app-bar>

    <v-main>
      <div v-if="showWelcome">
        <v-container class="text-center">
          <v-row justify="center" align="center" style="height: 80vh">
            <v-col cols="12">
              <h1 class="text-display-large">{{ welcomeMessage }}</h1>
              <p class="text-body-large">{{ description }}</p>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <router-view v-else />
    </v-main>
  </v-app>
</template>

<style scoped>
.text-center {
  text-align: center;
}

.text-display-large {
  font-weight: bold;
}

.text-body-large {
  font-size: 1.25rem;
  color: #666;
}
</style>
