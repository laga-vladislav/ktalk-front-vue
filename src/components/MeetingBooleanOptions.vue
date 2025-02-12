<template>
    <div class="meeting-subitem boolean-settings">
        <div class="boolean-text-panel">
            <p>{{ title }}</p>
            <span class="light-text">{{ description }}</span>
        </div>
        <ToggleSwitch v-model="booleanModel"></ToggleSwitch>
    </div>
</template>

<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch';

const booleanModel = defineModel<boolean>()

defineProps<{
    title: string
    description: string
}>()
</script>

<style scoped>
.boolean-settings {
    display: flex;
    justify-content: space-between;
}

.boolean-settings>*:last-child {
    flex: 0 0 auto;
    margin-right: 1rem;
}

.boolean-text-panel>*:not(:last-child) {
    margin-bottom: .3rem;
}

.boolean-text-panel>span {
    font-size: .85rem;
}
</style>