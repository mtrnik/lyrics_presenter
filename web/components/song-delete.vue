<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">Delete Song</span>
        </v-card-title>
        <v-card-text>
            Are you really sure you want to delete song {{ song.name }}?
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="$emit('close')">
                Close
            </v-btn>
            <v-btn color="red" @click="deleteSong()">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import {PropType} from "@vue/runtime-core";
import {Song} from "~/types/types";
import {useSongsStore} from "~/store/songs.store";

export default defineNuxtComponent({
    name: "song-delete",
    props: {
        song: {
            type: Object as PropType<Song>,
            required: true
        },
    },
    setup() {
        const songsStore = useSongsStore()

        return {
            songsStore
        }
    },
    data() {
        return {}
    },
    computed: {},
    mounted() {},
    methods: {
        async deleteSong() {
            await this.songsStore.deleteSong( this.song )
            this.$emit('close')
        }

    }
})
</script>
