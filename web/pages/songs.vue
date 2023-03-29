<template>
    <v-row>
        <v-col>
            <v-btn color="primary" @click="showEditDialog()" class="mb-4">Add Song</v-btn>
            <v-card>
                <v-list>
                    <template v-for="song in songs" :key="song.id">
                        <v-list-item>
                            <v-list-item-title>{{ song.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ song.lyrics }}</v-list-item-subtitle>
                            <v-menu activator="parent">
                                <v-list>
                                    <v-list-item @click="showAddToServiceDialog(song)">
                                        <v-list-item-title>Add to Service</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="showEditDialog(song)">
                                        <v-list-item-title>Edit</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="showDeleteDialog(song)">
                                        <v-list-item-title>Delete</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
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
        showAddToServiceDialog( song: Song ) {
            console.debug('song', song)
        },

        showEditDialog( song?: Song ) {
            this.editDialog = true
            this.editSong = { id: '', name: '', slug: '', lyrics: '', verses: [], orderedTags: [] }

            if ( song ) {
                this.editSong = { ...this.editSong, ...song }
            }
        },

        showDeleteDialog( song: Song ) {
            console.debug('song', song)
        }
    }
})
</script>
