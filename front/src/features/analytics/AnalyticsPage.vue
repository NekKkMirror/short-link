<template>
  <v-container class="text-center">
    <v-row justify="center" align="center" style="height: 80vh">
      <v-col cols="12">
        <h1>Analytics Dashboard</h1>

        <v-card outlined class="mt-4 pa-4">
          <v-text-field
            v-model="inputShortUrl"
            label="Enter Short URL"
            placeholder="example"
            outlined
            clearable
          />
          <v-btn color="primary" :disabled="!inputShortUrl || loading" @click="loadAnalytics">
            Fetch Analytics
          </v-btn>
        </v-card>

        <v-divider class="my-6" />

        <v-card v-if="loading" outlined class="pa-4">
          <v-progress-linear indeterminate color="primary" />
        </v-card>

        <v-card v-else-if="analyticsData" outlined>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Total Clicks: <strong>{{ analyticsData.totalClicks }}</strong>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider />

          <h2>Recent Clicks:</h2>
          <v-card
            v-for="click in analyticsData.recentClicks"
            :key="new Date(click.clickedAt).toISOString()"
            outlined
            class="my-2 pa-4"
          >
            <p>IP Address: {{ click.ipAddress }}</p>
            <p>Clicked At: {{ formatDate(click.clickedAt) }}</p>
          </v-card>
        </v-card>

        <v-alert v-else-if="!loading && !analyticsData" color="info" outlined>
          No analytics data found. Please enter a valid Short URL!
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useAnalyticsStore } from '@features/analytics/store/analyticsStore'

export default defineComponent({
  name: 'AnalyticsPage',
  setup() {
    const analyticsStore = useAnalyticsStore()
    const { analytics, loading, fetchAnalytics } = analyticsStore

    const inputShortUrl = ref('')
    const currentShortUrl = ref('')

    const analyticsData = computed(() => analytics.get(currentShortUrl.value) || null)

    const loadAnalytics = async () => {
      if (!inputShortUrl.value) return
      currentShortUrl.value = inputShortUrl.value
      await fetchAnalytics(inputShortUrl.value)
    }

    const formatDate = (date: Date) => new Date(date).toLocaleString()

    return {
      loading,
      inputShortUrl,
      analyticsData,
      loadAnalytics,
      formatDate,
    }
  },
})
</script>

<style scoped>
.text-center {
  text-align: center;
}

.my-6 {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>
