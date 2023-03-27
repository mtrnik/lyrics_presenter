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
        <v-card>
            <v-card-title>
                <span class="text-h5">Song</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="editSong.name" label="Song Name" />
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="editSong.lyrics" label="Song Lyrics" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="editDialog = false">
                    Close
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="saveChanges()">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import {Song} from "~/types/types";
import slugify from "slugify";
import {useSongsStore} from "~/store/songs.store";

export default defineNuxtComponent({
    name: "songs",
    setup() {
        const songsStore = useSongsStore()

        return {
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
        async saveChanges() {
            const slug = slugify(this.editSong.name)

            const song: Song = {
                slug,
                name: this.editSong.name,
                lyrics: this.editSong.lyrics,
                verses: [ ...this.editSong.verses ]
            }

            await this.songsStore.saveSong( song )

            this.editDialog = false
        },

    }
})
</script>
