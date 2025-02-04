<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import InputMask from 'primevue/inputmask';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import DatePicker from 'primevue/datepicker';
import ToggleSwitch from 'primevue/toggleswitch';
import Select from 'primevue/select';
import Button from 'primevue/button';
import { useClipboard } from '@vueuse/core'
import axios from 'axios'

function getRandomArbitrary(min: number, max: number) {
  return Math.ceil(Math.random() * (max - min) + min);
}

class Timezone {
  value: string;

  constructor() {
    this.value = this.getGMTValue()
  }

  getGMTOffset = (): number => {
    const offsetMinutes = new Date().getTimezoneOffset()
    const offsetHours = -offsetMinutes / 60
    return offsetHours
  };

  getGMTValue = (): string => {
    const offset = this.getGMTOffset()
    const sign = offset >= 0 ? '+' : ''

    return 'GMT' + sign + offset
  }
}

interface Meeting {
  subject: string,
  description: string,
  start: Date,
  end: Date,
  timezone: string,
  allowAnonymous: boolean,
  enableSip: boolean,
  enableAutorecording: boolean,
  pinCode: string | null
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

const { copy, isSupported } = useClipboard()

function handleCopy() {
  // if (isSupported) {
  // }
  copy(pinCode.value.toString())
}

async function submit() {
  const meeting: Meeting = {
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

<template>
  <main id="calendar">
    <h1>Новая встреча</h1>
    <div class="meeting-item">
      <div class="meeting-subitem">
        <p>Тема встречи</p>
        <InputText :invalid="!meetingTheme" v-model="meetingTheme" placeholder="Будет в заголовке"></InputText>
      </div>
      <div class="meeting-subitem">
        <p>Текст приглашения</p>
        <InputText v-model="meetingText" placeholder="О чём бдует встреча"></InputText>
      </div>
    </div>
    <div class="meeting-item">
      <div class="meeting-subitem">
        <p>Дата и время</p>
        <div class="datetime-panel">
          <DatePicker id="datepicker" v-model="pickedDate" date-format="dd.mm.yy"></DatePicker>
          <div class="timepicker">
            <DatePicker id="timepicker-from" v-model="pickedTimeFrom" time-only fluid></DatePicker>
            <hr>
            <DatePicker id="timepicker-to" v-model="pickedTimeTo" time-only fluid></DatePicker>
          </div>
          <p class="light-text">{{ timezone.value }}</p>
        </div>
      </div>
    </div>
    <div class="meeting-item">
      <div class="meeting-subitem boolean-settings">
        <div class="boolean-text-panel">
          <p>Внешние участники</p>
          <span class="light-text">Сможет подключиться любой, у кого есть ссылка</span>
        </div>
        <ToggleSwitch v-model="allowAnonymous"></ToggleSwitch>
      </div>
      <div class="meeting-subitem boolean-settings">
        <div class="boolean-text-panel">
          <p>Подключение по звонку</p>
          <span class="light-text">Разрешить подключение через городскую связь или по протоколу SIP</span>
        </div>
        <ToggleSwitch v-model="enableSip"></ToggleSwitch>
      </div>
      <div class="meeting-subitem boolean-settings">
        <div class="boolean-text-panel">
          <p>Автоматическая запись встречи</p>
          <span class="light-text">Встреча будет записана автоматически</span>
        </div>
        <ToggleSwitch v-model="enableAutoRecording"></ToggleSwitch>
      </div>
      <div class="meeting-subitem boolean-settings">
        <div class="boolean-text-panel">
          <p>Вход по PIN-коду</p>
          <span class="light-text">Для подключения потрубется ввести PIN-код</span>
        </div>
        <ToggleSwitch v-model="enablePinCode"></ToggleSwitch>
      </div>
    </div>
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
          <InputMask v-model="pinCode" id="pincode-input" mask="9999" placeholder="9999" />
        </IconField>
        <Button @click="handleCopy" id="copy-button" variant="text" size="small" label="Secondary" severity="secondary">
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
    <div class="meeting-item">
      <Button v-if="meetingTheme" @click="submit" id="submit-button" label="Создать встречу"
        severity="success"></Button>
    </div>
  </main>
</template>
<style>
:root {
  --ktalk-background: #333231;
  --ktalk-grey: #545352;
}

input {
  width: 100%;
}

main#calendar {
  color: white;
  font-size: 1rem;
  background-color: var(--ktalk-background);
  max-width: 440px;
  max-height: 863px;
  border: var(--ktalk-grey) 1px;
  border-radius: 5px;
  padding: 1.8rem 1.2rem;
}

main#calendar>*:not(:last-child) {
  margin-bottom: 29px;
}

.meeting-item>*:not(:last-child) {
  margin-bottom: 19px;
}

.meeting-subitem>*:not(:last-child) {
  margin-bottom: 12px;
}

h1 {
  font-weight: 700;
  font-size: 1.5rem;
}

.light-text {
  opacity: .5;
}

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

#copy-button:hover>svg {
  filter: invert();
}
</style>