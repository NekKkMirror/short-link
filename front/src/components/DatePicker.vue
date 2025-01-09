<template>
  <v-date-input
    v-model="internalValue"
    :label="label"
    :menu-props="{ closeOnContentClick: false, isFullWidth: true }"
    :textFieldProps="{ outlined: true, clearable: true }"
    :locale="locale"
    @update:modelValue="emitUpdate"
  >
    <template #input>
      <div>{{ formattedValue }}</div>
    </template>
  </v-date-input>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'

export default defineComponent({
  name: 'DatePicker',
  props: {
    modelValue: {
      type: [String, Date],
      required: false,
      default: null,
    },
    label: String,
    format: String,
    locale: String,
  },
  setup(props, { emit }) {
    const internalValue = ref<string | null>(
      props.modelValue instanceof Date ? props.modelValue.toISOString() : props.modelValue || null,
    )
    const formattedValue = computed(() => {
      if (!internalValue.value) return ''
      return new Date(internalValue.value).toLocaleDateString(props.locale)
    })

    watch(
      () => internalValue.value,
      newValue => emit('update:modelValue', newValue),
    )

    return {
      internalValue,
      formattedValue,
      emitUpdate: (newValue: string) => {
        internalValue.value = newValue
      },
    }
  },
})
</script>
