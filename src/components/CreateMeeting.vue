<template>
    <div id="main-container">
        <h1>Новая встреча</h1>
        <div class="meeting-item">
            <MeetingTextInformation v-model="meetingTheme" text="Тема встречи" placeholderText="Будет в заголовке"
                :validate="true" />
            <MeetingTextInformation v-model="meetingText" text="Текст приглашения"
                placeholderText="О чём будет встреча" />
        </div>
        <div class="meeting-item">
            <MeetingDatetimeOptions v-model:pickedDate="pickedDate" v-model:pickedTimeFrom="pickedTimeFrom"
                v-model:pickedTimeTo="pickedTimeTo" />
        </div>
        <div class="meeting-item">
            <MeetingBooleanOptions v-model="allowAnonymous" title="Внешние участники"
                description="Сможет подключиться любой, у кого есть ссылка" />
            <MeetingBooleanOptions v-model="enableSip" title="Подключение по звонку"
                description="Разрешить подключение через городскую связь или по протоколу SIP" />
            <MeetingBooleanOptions v-model="enableAutoRecording" title="Автоматическая запись встречи"
                description="Встреча будет записана автоматически" />
            <MeetingBooleanOptions v-model="enablePinCode" title="Вход по PIN-коду"
                description="Для подключения потрубется ввести PIN-код" />
        </div>
        <MeetingPincodeOptions v-model:enablePinCode="enablePinCode" v-model:pinCode="pinCode" />
        <div class="meeting-item">
            <Button :disabled="!meetingTheme" @click="submit" id="submit-button" label="Создать встречу"
                severity="success"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import Button from 'primevue/button';
import MeetingTextInformation from './MeetingTextInformation.vue';
import MeetingDatetimeOptions from './MeetingDatetimeOptions.vue';
import { Timezone } from './models/TimezoneClass';
import { type IMeeting } from './/models/MeetingInterface';
import axios from 'axios'
import MeetingBooleanOptions from './MeetingBooleanOptions.vue';
import MeetingPincodeOptions from './MeetingPincodeOptions.vue';

const router = useRouter()

function goToCreateMeeting() {
    router.push('/create-meeting')
}

const urlParams = new URLSearchParams(window.location.search)
// const authId = urlParams.get('auth_id');
// const domain = urlParams.get('domain');
console.log(urlParams)

function getRandomArbitrary(min: number, max: number) {
    return Math.ceil(Math.random() * (max - min) + min);
}

const meetingTheme = ref()
const meetingText = ref()

const now = new Date()
const pickedDate = ref(now)
const pickedTimeFrom = ref(now)
const now2 = new Date(now);
now2.setHours(now2.getHours() + 1);
const pickedTimeTo = ref(now2);
const timezone = new Timezone()

const allowAnonymous = ref(false);
const enableSip = ref(false);
const enableAutoRecording = ref(false);
const enablePinCode = ref(false);
const pinCode = ref<string>(getRandomArbitrary(1000, 9999).toString());




async function submit() {
    const meeting: IMeeting = {
        subject: meetingTheme.value,
        description: meetingText.value,
        start: pickedTimeFrom.value,
        end: pickedTimeTo.value,
        timezone: timezone.value,
        allowAnonymous: allowAnonymous.value,
        enableSip: enableSip.value,
        enableAutorecording: enableAutoRecording.value,
        pinCode: enablePinCode.value ? pinCode.value : null
    }

    const request = {
        // creatorId:
    }

    const result = axios.post('http://127.0.0.1:8000/create_meeting',)

    console.log(result)

}
</script>

<style scoped>
div#main-container {
    border: .1rem solid white;
}

#copy-button:hover>svg {
    filter: invert();
}
</style>