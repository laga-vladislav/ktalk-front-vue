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
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import MeetingTextInformation from './MeetingTextInformation.vue';
import MeetingDatetimeOptions from './MeetingDatetimeOptions.vue';
import { Timezone } from './models/TimezoneClass';
import { type IMeeting } from './/models/MeetingInterface';
import axios from 'axios'
import MeetingBooleanOptions from './MeetingBooleanOptions.vue';
import MeetingPincodeOptions from './MeetingPincodeOptions.vue';
import type { IUser } from './models/UserInterface';
import { getTokenFromSessionStorage, getUserInfoFromSessionStorage } from '@/utils';
import { sendApiRequest } from '@/requestSender';
import type { IKTalkMeeting } from './models/KtalkMeetingInformationModel';

const jwtToken = getTokenFromSessionStorage();
const userInfo = ref<IUser | null>(null);
const API_URL = import.meta.env.VITE_BACK_DOMAIN;
const API_CREATE_INTERNAL_MEETING_ENDPOINT = '/create-internal-meeting';

onMounted(async () => {
    try {
        userInfo.value = await getUserInfoFromSessionStorage();
    } catch (error) {
        console.error("Ошибка загрузки userInfo:", error);
    }
    console.debug("UserInfo:", userInfo)
});

function getRandomArbitrary(min: number, max: number) {
    return Math.ceil(Math.random() * (max - min) + min);
}

function formatUtcDate(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(date.getUTCDate())}.${pad(date.getUTCMonth() + 1)}.${date.getUTCFullYear()} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
}

function formatDate(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

const meetingTheme = ref()
const meetingText = ref("")

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
        start: formatDate(pickedTimeFrom.value),
        end: formatDate(pickedTimeTo.value),
        timezone: timezone.value,
        allowAnonymous: allowAnonymous.value,
        enableSip: enableSip.value,
        enableAutoRecording: enableAutoRecording.value,
        pinCode: enablePinCode.value ? pinCode.value : ""
    }

    console.log(meeting)

    const result = await sendApiRequest<IKTalkMeeting>(
        API_URL + API_CREATE_INTERNAL_MEETING_ENDPOINT,
        meeting,
        jwtToken,
        'POST',
        {
            'creatorId': userInfo.value?.user_id,
            'memberId': userInfo.value?.member_id
        }
    )

    if (result.success) {
        console.log(result)
    } else {
        console.error(`Ошибка при создании встречи ${result.error}`)
    }

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