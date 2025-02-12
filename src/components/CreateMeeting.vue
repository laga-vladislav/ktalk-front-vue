<template>
    <h1>Новая встреча</h1>
    <div class="meeting-item">
        <MeetingTextInformationComponent v-model="meetingTheme" text="Тема встречи" placeholderText="Будет в заголовке"
            :validate="true" />
        <MeetingTextInformationComponent v-model="meetingText" text="Текст приглашения"
            placeholderText="О чём будет встреча" />
    </div>
    <div class="meeting-item">
        <DatetimeComponent v-model:pickedDate="pickedDate" v-model:pickedTimeFrom="pickedTimeFrom"
            v-model:pickedTimeTo="pickedTimeTo" />
    </div>
    <div class="meeting-item">
        <BooleanComponent v-model="allowAnonymous" title="Внешние участники"
            description="Сможет подключиться любой, у кого есть ссылка" />
        <BooleanComponent v-model="enableSip" title="Подключение по звонку"
            description="Разрешить подключение через городскую связь или по протоколу SIP" />
        <BooleanComponent v-model="enableAutoRecording" title="Автоматическая запись встречи"
            description="Встреча будет записана автоматически" />
        <BooleanComponent v-model="enablePinCode" title="Вход по PIN-коду"
            description="Для подключения потрубется ввести PIN-код" />
    </div>
    <PincodeComponent v-model:enablePinCode="enablePinCode" v-model:pinCode="pinCode" />
    <div class="meeting-item">
        <Button v-if="meetingTheme" @click="submit" id="submit-button" label="Создать встречу"
            severity="success"></Button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import Button from 'primevue/button';
import MeetingTextInformationComponent from './MeetingTextInformationComponent.vue';
import DatetimeComponent from './DatetimeComponent.vue';
import { Timezone } from './models/TimezoneClass';
import { type IMeeting } from './/models/MeetingInterface';
import axios from 'axios'
import BooleanComponent from './BooleanComponent.vue';
import PincodeComponent from './PincodeComponent.vue';

const router = useRouter()

function goToAbout() {
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
#copy-button:hover>svg {
    filter: invert();
}
</style>