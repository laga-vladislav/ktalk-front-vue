<template>
  <div class="meeting-subitem">
    <p>{{ text }}</p>
    <InputText :invalid="validate ? !meetingModel : false" v-model="meetingModel" :placeholder="placeholderText"></InputText>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';

const meetingModel = defineModel<string>()

defineProps<{
  validate?: boolean
  text: string
  placeholderText?: string
}>()
</script>