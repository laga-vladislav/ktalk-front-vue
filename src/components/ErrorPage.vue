<template>
    <div>
        <h1>Ошибка</h1>
        <p>{{ message }}</p>
    </div>
</template>

<style scoped>
* {
    color: white;
}

div {
    display: flex;
    flex-direction: column;
    row-gap: .3rem;
}

#back {
    margin-top: 1rem;
    text-decoration: underline;
}
</style>

<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter()
const route = useRoute();
const message = route.query.message || "Что-то пошло не так";
</script>