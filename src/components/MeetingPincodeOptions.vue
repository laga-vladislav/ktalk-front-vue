<template>
    <div v-show="enablePinCode" class="meeting-item">
        <div class="pincode-panel">
            <IconField>
                <InputIcon>
                    <svg id="lock-icon" width="1.1rem" height="1.1rem" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M18 10.5C19.6569 10.5 21 11.8431 21 13.5V19.5C21 21.1569 19.6569 22.5 18 22.5H6C4.34315 22.5 3 21.1569 3 19.5V13.5C3 11.8431 4.34315 10.5 6 10.5V7.5C6 4.18629 8.68629 1.5 12 1.5C15.3137 1.5 18 4.18629 18 7.5V10.5ZM12 3.5C14.2091 3.5 16 5.29086 16 7.5V10.5H8V7.5C8 5.29086 9.79086 3.5 12 3.5ZM18 12.5H6C5.44772 12.5 5 12.9477 5 13.5V19.5C5 20.0523 5.44772 20.5 6 20.5H18C18.5523 20.5 19 20.0523 19 19.5V13.5C19 12.9477 18.5523 12.5 18 12.5Z"
                            fill="currentColor" />
                    </svg>
                </InputIcon>
                <InputMask v-model="localPinCode" @update:model-value="$emit('update:pinCode', localPinCode)"
                    id="pincode-input" mask="9999" placeholder="9999" />
            </IconField>
            <Button @click="handleCopy" id="copy-button" variant="text" size="small" label="Secondary"
                severity="secondary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 7H7V5H13V7Z" fill="white" />
                    <path d="M13 11H7V9H13V11Z" fill="white" />
                    <path d="M7 15H13V13H7V15Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M3 19V1H17V5H21V23H7V19H3ZM15 17V3H5V17H15ZM17 7V19H9V21H19V7H17Z" fill="white" />
                </svg>
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputMask from 'primevue/inputmask';
import Button from 'primevue/button';
import { useClipboard } from '@vueuse/core'
import { ref, watch } from 'vue';

const props = defineProps<{
    enablePinCode: boolean
    pinCode: string
}>()

defineEmits(['update:enablePinCode', 'update:pinCode'])

const localPinCode = ref(props.pinCode)

// Следим за изменением `props.pinCode`, чтобы обновлять `localPinCode`
watch(() => props.pinCode, (newVal) => {
    localPinCode.value = newVal
})

const { copy } = useClipboard()

function handleCopy() {
    copy(props.pinCode.toString())
}
</script>

<style scoped>
.pincode-panel {
    width: 38%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#pincode-input {
    width: 6rem;
    flex: 0 0 auto;
}

#copy-button>svg {
    opacity: .7;
}
</style>