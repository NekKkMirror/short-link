<template>
  <transition-group name="fade" tag="v-list-item-group">
    <v-list-item v-for="link in links" :key="link.id" class="fade-item">
      <v-list-item-content>
        <v-list-item-title>
          <strong>Shortened:</strong>
          <a :href="getFullLink(link.shortUrl)" target="_blank">
            {{ link.shortUrl }}
          </a>
        </v-list-item-title>
        <v-list-item-subtitle>
          <p>{{ link.originalUrl }}</p>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn small icon @click="fetchInfo(link.shortUrl)">
          <v-icon>mdi-information</v-icon>
        </v-btn>
        <v-btn small icon color="error" @click="deleteLink(link.shortUrl)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    links: { type: Array, required: true },
    fetchInfo: { type: Function, required: true },
    deleteLink: { type: Function, required: true },
  },
  setup() {
    const getFullLink = (shortUrl: string) => {
      return `${import.meta.env.VITE_API_BASE_URL}/shortened-link/${shortUrl}`
    }

    return { getFullLink }
  },
})
</script>

<style>
.fade-item {
  transition:
    opacity 0.5s,
    transform 0.5s;
}
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
