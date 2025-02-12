<template>
    <div class="meeting-subitem">
        <p>Дата и время</p>
        <div class="datetime-panel">
            <DatePicker id="datepicker" :model-value="pickedDate"
                @update:model-value="$emit('update:pickedDate', $event)" date-format="dd.mm.yy"></DatePicker>
            <div class="timepicker">
                <DatePicker id="timepicker-from" :model-value="pickedTimeFrom"
                    @update:model-value="$emit('update:pickedTimeFrom', $event)" time-only fluid></DatePicker>
                <hr>
                <DatePicker id="timepicker-to" :model-value="pickedTimeTo"
                    @update:model-value="$emit('update:pickedTimeTo', $event)" time-only fluid></DatePicker>
            </div>
            <p class="light-text">{{ timezone.value }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
import { Timezone } from './models/TimezoneClass';

defineProps<{
    pickedDate: Date,
    pickedTimeFrom: Date,
    pickedTimeTo: Date
}>()

defineEmits(['update:pickedDate', 'update:pickedTimeFrom', 'update:pickedTimeTo'])

const timezone = new Timezone()
</script>

<style scoped>
.datetime-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
}

.datetime-panel:last-child {
    margin-right: 1rem;
}

#datepicker {
    max-width: 120px;
}

.timepicker {
    display: flex;
    max-width: 170px;
    align-items: center;
}

.timepicker>hr {
    width: 3rem;
    height: 2px;
    background-color: white;
    margin: 0 .3rem;
}
</style>