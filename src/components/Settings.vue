<template>
    <div id="main-container">
        <h1>Настройки</h1>
        <h2>Для правильного функционирования данного приложения необходимо заполнить следующие </h2>
        <Form v-slot="$form" :resolver="resolver" @submit="">
            <div>
                <InputText name="ktalk_space_name" type="text" placeholder="Имя пространства КТолк" />
                <Message v-if="$form.ktalk_space_name?.invalid" severity="error" size="small" variant="simple">{{
                    $form.ktalk_space_name.error?.message }}</Message>
            </div>
            <div>
                <InputText name="ktalk_admin_email" type="text" placeholder="Почта администратора пространства КТолк" />
                <Message v-if="$form.ktalk_admin_email?.invalid" severity="error" size="small" variant="simple">{{
                    $form.ktalk_admin_email.error?.message }}</Message>
            </div>
            <div>
                <InputText name="ktalk_api_key" type="text" placeholder="API ключ пространства КТолк" />
                <Message v-if="$form.ktalk_api_key?.invalid" severity="error" size="small" variant="simple">{{
                    $form.ktalk_api_key.error?.message }}</Message>
            </div>
            <Button
                :disabled="!$form.valid || !$form.ktalk_space_name?.touched || !$form.ktalk_admin_email?.touched || !$form.ktalk_api_key?.touched"
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
import { Form } from '@primevue/forms';
import { yupResolver } from '@primevue/forms/resolvers/yup';
import * as yup from 'yup';

let resolver = yupResolver(
    yup.object({
        ktalk_space_name: yup.string().required("Поле обязательно для заполнения"),
        ktalk_admin_email: yup.string().email("Некорректный формат почты").required("Поле обязательно для заполнения"),
        ktalk_api_key: yup.string().required("Поле обязательно для заполнения")
    })
)

</script>