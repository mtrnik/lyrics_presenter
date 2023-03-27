<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">Song</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="song.name" label="Song Name" />
                    </v-col>
                    <v-col cols="12">
                        <v-textarea v-model="song.lyrics" label="Song Lyrics" />
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="$emit('close')">
                Close
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveChanges()">
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import {Song} from "~/types/types";
import slugify from "slugify";
import {useSongsStore} from "~/store/songs.store";
import {useLyricsParser} from "~/composables/lyricsParser.service";

export default defineNuxtComponent({
    name: "song-edit",
    props: {
        song: {
            type: Object as PropType<Song>,
            required: true
        },
    },
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
        async saveChanges() {
            const slug = slugify( this.song.name )

            const verses = this.lyricsParser.parseLyrics( this.song.lyrics )

            const song: Song = {
                slug,
                name: this.song.name,
                lyrics: this.song.lyrics,
                verses: [ ...verses ]
            }

            // TODO processVerses

            await this.songsStore.saveSong( song )

            this.$emit('close')
        },

    }
})
</script>
