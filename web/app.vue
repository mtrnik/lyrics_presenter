<template>
  <div>
      <NuxtLayout>
          <NuxtPage />
      </NuxtLayout>
  </div>
</template>

<script lang="ts">
import localforage from "localforage";

export default defineNuxtComponent({
    name: "app",
    mounted() {
        localforage.config({
            name: 'Lyrics Presenter App'
        });
    },
})
</script>
