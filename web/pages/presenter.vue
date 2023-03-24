<template>
    <div>
        presenter
        <pre>{{ verse }}</pre>
    </div>
</template>

<script lang="ts">
import {Verse} from "~/types/types";

export default defineNuxtComponent({
    name: "presenter",
    data() {
        const intervalWatcher: number = 0
        const verse = {} as Verse

        return {
            intervalWatcher,
            verse
        }
    },
    mounted() {
        this.watchLocalStorage()
    },
    beforeUnmount() {
        clearInterval( this.intervalWatcher )
    },
    methods: {
        watchLocalStorage() {
            this.intervalWatcher = setInterval( () => {
                this.readLocalStorage()
            }, 100)
        },
        readLocalStorage() {
            console.debug('readLocalStorage')
            this.verse = JSON.parse( localStorage.getItem('lyrics_presenter_verse') ?? '{}' )
        }
    }
})
</script>

<style scoped>

</style>
