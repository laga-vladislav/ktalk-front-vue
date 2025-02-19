<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToCreateMeeting() {
  router.push('/create-meeting')
}

function goToSettings() {
  router.push('/settings')
}

document.cookie.split(";").forEach(cookie => {
  const [name, value] = cookie.trim().split("=");
  if (name === "jwt") {
    const payload = JSON.parse(atob(value.split(".")[1]));
    if (payload.isAdmin) {
      goToSettings()
    } else {
      goToCreateMeeting()
    }
  }
});
</script>

<template>
  <main id="main">
    <RouterView />
  </main>
</template>
