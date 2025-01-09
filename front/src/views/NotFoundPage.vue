<template>
  <v-container class="text-center">
    <h1 class="text-display-large">404</h1>
    <h2 class="text-headline-large">Page Not Found</h2>
    <p class="text-body-large">Sorry, but the page you are looking for does not exist.</p>
    <v-btn :to="{ name: 'Home' }" color="primary" variant="elevated"> Back to Home </v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFoundPage',
})
</script>

<style scoped>
.text-center {
  text-align: center;
  margin-top: 15vh;
}
</style>
