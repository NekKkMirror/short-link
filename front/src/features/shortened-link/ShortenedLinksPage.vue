<template>
  <v-container class="text-center">
    <v-row justify="center" align="center" style="height: 80vh">
      <v-col cols="12">
        <h1>Manage Shortened Links</h1>

        <v-btn class="mb-4" outlined color="primary" @click="toggleCreationMode">
          {{ creationMode ? 'Back to List' : 'Create New Link' }}
        </v-btn>

        <v-card outlined class="mt-4 pa-4">
          <transition name="fade">
            <div>
              <template v-if="creationMode">
                <v-text-field
                  v-model="newUrl"
                  label="Enter URL to shorten"
                  placeholder="https://example.com"
                  outlined
                  clearable
                />
                <v-text-field
                  v-model="alias"
                  label="Custom Alias (optional, max 20 chars)"
                  :rules="[aliasRule]"
                  outlined
                  clearable
                />
                <DatePicker v-model="expiresAt" label="Expiration Date" />
                <v-btn :disabled="loading || !newUrl" color="primary" @click="createShortLink">
                  Shorten URL
                </v-btn>
              </template>

              <template v-else>
                <ShortenedLinksList
                  v-if="links && links.length > 0"
                  :links="links"
                  :fetchInfo="fetchInfo"
                  :deleteLink="handleDelete"
                />
                <v-alert v-if="links.length === 0" color="info" outlined>
                  No shortened links found. Try creating one!
                </v-alert>
              </template>
            </div>
          </transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useShortenedLinkStore } from '@features/shortened-link/store/shortenedLinkStore'
import ShortenedLinksList from '@features/shortened-link/components/ShortenedLinksList.vue'
import DatePicker from '@components/DatePicker.vue'

export default defineComponent({
  name: 'ShortenedLinksPage',
  components: { ShortenedLinksList, DatePicker },
  setup() {
    const shortenedLinkStore = useShortenedLinkStore()
    const { loading, toggleCreationMode, createLink, fetchLinkInfo, deleteLink } =
      shortenedLinkStore
    const links = computed(() => shortenedLinkStore.links)
    const creationMode = computed(() => shortenedLinkStore.creationMode)

    const newUrl = ref('')
    const alias = ref('')
    const expiresAt = ref('')

    const aliasRule = (value: string) => {
      return value.length <= 20 || 'Alias must not exceed 20 characters.'
    }

    const createShortLink = async () => {
      try {
        if (!newUrl.value) return

        const linkData = {
          url: newUrl.value,
          alias: alias.value || undefined,
          expiresAt: expiresAt.value ? new Date(expiresAt.value).toISOString() : undefined,
        }

        await createLink(linkData.url, linkData.alias, linkData.expiresAt)

        newUrl.value = ''
        alias.value = ''
        expiresAt.value = ''

        shortenedLinkStore.creationMode = false
      } catch (error) {
        alert('Error while creating the link. Please try again!')
      }
    }

    const handleDelete = async (shortUrl: string) => {
      try {
        await deleteLink(shortUrl)
      } catch (error) {
        alert('Error while deleting the link. Please try again!')
      }
    }

    return {
      links,
      loading,
      creationMode,
      toggleCreationMode,
      newUrl,
      alias,
      expiresAt,
      aliasRule,
      createShortLink,
      handleDelete,
      fetchInfo: fetchLinkInfo,
    }
  },
})
</script>
