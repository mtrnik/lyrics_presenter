<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">Song</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row v-if="step === 'lyrics'">
                    <v-col cols="12">
                        <v-text-field v-model="song.name" label="Song Name" />
                    </v-col>
                    <v-col cols="12">
                        <v-textarea v-model="song.lyrics" label="Song Lyrics" />
                    </v-col>
                </v-row>
                <v-row v-if="step === 'verses'">
                    <v-col cols="12">
                        <template v-for="verse in song.verses" :key="verse.tag">
                            <v-list-item>
                                <v-list-item-title>{{ verse.tag }}</v-list-item-title>
                                <v-list-item-subtitle>{{ verse.lyrics }}</v-list-item-subtitle>
                            </v-list-item>
                        </template>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="$emit('close')">
                Close
            </v-btn>
            <v-btn v-if="step === 'lyrics'" color="blue-darken-1" variant="text" @click="processVerses()">
                Next
            </v-btn>
            <v-btn v-if="step === 'verses'" color="blue-darken-1" variant="text" @click="saveChanges()">
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
import {PropType} from "@vue/runtime-core";

type StepEnum = 'lyrics' | 'verses'

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
        const step = <StepEnum>'lyrics'

        return {
            step
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
        processVerses() {
            const slug = slugify( this.song.name )

            const verses = this.lyricsParser.parseLyrics( this.song.lyrics )

            this.song.slug = slug
            this.song.verses = [ ...verses ]

            this.step = <StepEnum>'verses'
        },
        async saveChanges() {
            await this.songsStore.saveSong( JSON.parse( JSON.stringify( this.song ) ) )
            this.$emit('close')
        },

    }
})
</script>
