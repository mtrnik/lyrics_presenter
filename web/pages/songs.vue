<template>
    <v-row>
        <v-col>
            <v-btn color="primary" @click="showEditDialog()" class="mb-4">Add Song</v-btn>
            <v-card>
                <v-list>
                    <template v-for="song in songs" :key="song.id">
                        <v-list-item @click="showEditDialog(song)">
                            <v-list-item-title>{{ song.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ song.lyrics }}</v-list-item-subtitle>
                        </v-list-item>

                        <!--                        <v-divider v-if="index !== song.verses - 1" inset />-->
                    </template>
                </v-list>
            </v-card>
        </v-col>
    </v-row>

    <v-dialog v-model="editDialog" width="600">
        <song-edit :song="editSong" @close="editDialog = false" />
    </v-dialog>
</template>

<script lang="ts">
import {Song} from "~/types/types";
import {useSongsStore} from "~/store/songs.store";
import {useLyricsParser} from "~/composables/lyricsParser.service";

export default defineNuxtComponent({
    name: "songs",
    setup() {
        const lyricsParser = useLyricsParser()
        const songsStore = useSongsStore()

        return {
            lyricsParser,
            songsStore
        }
    },
    data() {
        return {
            editDialog: false,
            editSong: {} as Song
        }
    },
    computed: {
        songs(): Song[] {
            return this.songsStore.songs
        }
    },
    mounted() {
        this.songsStore.fetchSongs()
    },
    methods: {
        showEditDialog( song?: Song ) {
            this.editDialog = true
            if ( song ) {
                this.editSong = song
            } else {
                this.editSong = { name: '', slug: '', lyrics: '', verses: [] }
            }
        },
    }
})
</script>
