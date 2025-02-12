<template>
    <div id="main-container">
        <div id="menu">
            <Button id="create-meeting-redirect-button" severity="secondary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 11H10V13H14V11Z" fill="currentColor" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
                        fill="currentColor" />
                </svg>
                <p>Создание встречи</p>
            </Button>
            <Button id="setting-redirect-button" severity="secondary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7 3C8.86384 3 10.4299 4.27477 10.874 6H19V8H10.874C10.4299 9.72523 8.86384 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3ZM7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z"
                        fill="currentColor" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M17 20C15.1362 20 13.5701 18.7252 13.126 17H5V15H13.126C13.5701 13.2748 15.1362 12 17 12C19.2091 12 21 13.7909 21 16C21 18.2091 19.2091 20 17 20ZM17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14C15.8954 14 15 14.8954 15 16C15 17.1046 15.8954 18 17 18Z"
                        fill="currentColor" />
                </svg>
                <p>Настройки</p>
            </Button>
        </div>
    </div>
</template>
<style></style>
<style scoped>
div#menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    row-gap: 1rem;
    padding: 1rem 3rem;
}

button {
    display: flex;
    justify-content: left;
    height: 4rem;
}

button>p {
    font-size: 1.3rem;
}
</style>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Button } from 'primevue';

const router = useRouter()

function goToMenu() {
    router.push('/menu')
}
</script>