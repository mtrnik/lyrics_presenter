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
                        <template v-for="(verse, index) in song.verses" :key="index">
                            <v-list-item>
                                <v-list-item-title>
                                    <contenteditable tag="span" :contenteditable="true" v-model="verse.tag" :no-nl="true" :no-html="true" />
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    <contenteditable tag="div" :contenteditable="true" v-model="verse.lyrics" :no-nl="false" :no-html="false" />
                                </v-list-item-subtitle>
                                <v-list-item-action start>
                                    <span @click="removeVerse( verse.tag )">delete</span>
                                </v-list-item-action>
                            </v-list-item>
                        </template>
                        <v-col cols="12">
                            <v-textarea v-model="newLyrics" label="Add Additional Lyrics" />
                        </v-col>
                    </v-col>
                </v-row>
                <v-row v-if="step === 'order'">
                    <v-col cols="12">
                        <template v-for="(verse, index) in song.verses" :key="index">
                            <v-list-item>
                                <v-list-item-title>{{ verse.tag }}</v-list-item-title>
                                <v-list-item-subtitle v-html="verse.lyrics" />
                                <span @click="addVerseToOrder( verse.tag )">Add</span>
                            </v-list-item>
                        </template>
<!--                        <draggable-->
<!--                            v-model="song.orderedTags"-->
<!--                        >-->
<!--                            <template #item="{tag}">-->
<!--                                <div>{{tag}}</div>-->
<!--                                <span @click="removeFromOrder(tag)">Remove</span>-->
<!--                            </template>-->
<!--                        </draggable>-->
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="$emit('close')">
                Close
            </v-btn>
            <v-btn v-if="step === 'lyrics'" color="blue-darken-1" variant="text" @click="prepareVerses()">
                Next
            </v-btn>
            <v-btn v-if="step === 'verses'" color="blue-darken-1" variant="text" @click="processVerses()">
                Next
            </v-btn>
            <v-btn v-if="step === 'order'" color="blue-darken-1" variant="text" @click="saveChanges()">
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import {PropType} from "@vue/runtime-core";
import slugify from "slugify";
import contenteditable from 'vue-contenteditable';
import { v4 as uuidv4 } from 'uuid';
import draggable from 'vuedraggable'
import {Song} from "~/types/types";
import {useSongsStore} from "~/store/songs.store";
import {useLyricsParser} from "~/composables/lyricsParser.service";

type StepEnum = 'lyrics' | 'verses' | 'order'

export default defineNuxtComponent({
    name: "song-edit",
    props: {
        song: {
            type: Object as PropType<Song>,
            required: true
        },
    },
    components: {
        contenteditable,
        draggable,
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
            step,
            newLyrics: ''
        }
    },
    computed: {},
    mounted() {
        if ( this.song.id ) {
            this.step = 'verses'
        }
    },
    methods: {
        prepareVerses() {
            const slug = slugify( this.song.name, { lower: true} )

            const verses = this.lyricsParser.parseLyrics( this.song.lyrics )

            this.song.id = uuidv4()
            this.song.slug = slug
            this.song.verses = [ ...verses ]

            this.step = <StepEnum>'verses'
        },
        processVerses() {
            if ( this.newLyrics ) {
                const verses = this.lyricsParser.parseLyrics( this.newLyrics )
                this.song.verses = [ ...this.song.verses, ...verses ]
            }

            this.step = <StepEnum>'order'
        },
        async saveChanges() {
            console.debug(JSON.parse( JSON.stringify( this.song ) ))

            await this.songsStore.saveSong( JSON.parse( JSON.stringify( this.song ) ) )
            this.$emit('close')
        },

        removeVerse( verseTag: string ) {
            const verseIndex = this.song.verses.findIndex( verse => verse.tag === verseTag )

            if ( verseIndex >= 0 ) {
                this.song.verses.splice( verseIndex, 1 )
            }

            this.song.orderedTags = this.song.orderedTags.filter( tag => tag !== verseTag )
        },

        addVerseToOrder( tag: string ) {
            this.song.orderedTags.push( tag )
        },
        removeFromOrder( tag: string ) {

            // TODO what if multiple
            const tagIndex = this.song.orderedTags.findIndex( orderedTag => orderedTag === tag )
            if ( tagIndex >= 0 ) {
                this.song.orderedTags.splice( tagIndex, 1 )
            }
        }

    }
})
</script>
