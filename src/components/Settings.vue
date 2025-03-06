<template>
    <div id="main-container">
        <h1>Настройки</h1>
        <h2>Для правильного функционирования данного приложения необходимо заполнить следующие </h2>
        <Form v-slot="$form" :resolver="resolver" @submit="submitForm">
            <div>
                <InputText name="space" type="text" placeholder="Имя пространства КТолк" />
                <Message v-if="$form.space?.dirty && $form.space?.invalid" severity="error" size="small"
                    variant="simple">{{
                        $form.space.error?.message }}</Message>
            </div>
            <div>
                <InputText name="admin_email" type="text" placeholder="Почта администратора пространства КТолк" />
                <Message v-if="$form.admin_email?.dirty && $form.admin_email?.invalid" severity="error" size="small"
                    variant="simple">{{
                        $form.admin_email.error?.message }}</Message>
            </div>
            <div>
                <InputText name="api_key" type="text" placeholder="API ключ пространства КТолк" />
                <Message v-if="$form.api_key?.dirty && $form.api_key?.invalid" severity="error" size="small"
                    variant="simple">{{
                        $form.api_key.error?.message }}</Message>
            </div>
            <Button
                :disabled="isSubmitting || !$form.valid || !$form.space?.value || !$form.admin_email?.value || !$form.api_key?.value"
                type="submit" severity="success" label="Сохранить" />
        </Form>
    </div>
</template>

<style scoped>
Form {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
}

Form>div {
    display: flex;
    flex-direction: column;
    row-gap: .3rem;
    align-items: start;
}

Button {
    max-width: 10rem;
    margin-top: 1rem;
}
</style>

<script setup lang="ts">
import { Button, InputText, Message } from 'primevue';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { yupResolver } from '@primevue/forms/resolvers/yup';
import * as yup from 'yup';
import { ref, onMounted } from 'vue';
import { getUserInfoFromSessionStorage } from '@/utils';
import { sendApiRequest } from '@/requestSender';
import { getJwtFromCookie } from '@/authorization';
import { type IUser } from './models/UserInterface';

const API_URL = import.meta.env.VITE_BACK_DOMAIN;
const API_SET_SETTINGS_ENDPOINT = '/set-settings';

const jwtToken = getJwtFromCookie();
const userInfo = ref<IUser | null>(null);
const isSubmitting = ref(false);

const resolver = yupResolver(
    yup.object({
        space: yup.string().required("Поле обязательно для заполнения"),
        admin_email: yup.string().email("Некорректный формат почты").required("Поле обязательно для заполнения"),
        api_key: yup.string().required("Поле обязательно для заполнения")
    })
);

onMounted(async () => {
    try {
        userInfo.value = await getUserInfoFromSessionStorage();
    } catch (error) {
        console.error("Ошибка загрузки userInfo:", error);
    }
});

async function submitForm(event: FormSubmitEvent) {
    if (!userInfo.value) return; // Если userInfo ещё не загружен

    const isValid = event.valid; // event.valid — флаг валидности от PrimeVue Form
    if (!isValid) {
        console.log("Форма не валидна, запрос не отправлен");
        return;
    }

    isSubmitting.value = true;
    const formData = {
        ...event.values,
        member_id: userInfo.value.member_id
    };

    const response = await sendApiRequest<any>(
        `${API_URL}${API_SET_SETTINGS_ENDPOINT}`,
        formData,
        jwtToken
    );

    isSubmitting.value = false;

    if (response.success) {
        console.log("Настройки сохранены:", response.data);
    } else {
        console.error("Ошибка:", response.error);
    }
}
</script>