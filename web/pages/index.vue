<template>
    <v-row>
        <v-col v-for="song in songs" :key="song.id" cols="12">
            <v-card>
                <v-list>
                    <v-list-subheader>{{ song.name }}</v-list-subheader>
                    <template v-for="(verse, index) in song.verses" :key="index">
                        <v-list-item @click="updateLocalStorage( verse.lyrics )">
                            <v-list-item-title>{{ verse.name }}</v-list-item-title>

                            <v-list-item-subtitle>
                                {{ verse.lyrics }}
                            </v-list-item-subtitle>
                        </v-list-item>

                        <!--                                    <v-divider-->
                        <!--                                        v-if="n !== 6"-->
                        <!--                                        :key="`divider-${n}`"-->
                        <!--                                        inset-->
                        <!--                                    ></v-divider>-->
                    </template>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
export default defineNuxtComponent({
    name: "index",
    data() {
        return {
            songs: [
                {
                    id: 1,
                    name: 'Song 1',
                    verses: [
                        { name: 'Sloha 1', lyrics: 'Song 1, Verse 1' },
                        { name: 'Sloha 2', lyrics: 'Song 1, Verse 2' },
                        { name: 'Refrén', lyrics: 'Song 1, Verse 3' },
                        { name: 'Bridge', lyrics: 'Song 1, Verse 4' },
                    ]
                },
                {
                    id: 2,
                    name: 'Song 2',
                    verses: [
                        { name: '', lyrics: 'Song 2, Verse 1' },
                        { name: '', lyrics: 'Song 2, Verse 2' },
                        { name: '', lyrics: 'Song 2, Verse 3' },
                        { name: '', lyrics: 'Song 2, Verse 4' },
                    ]
                }
            ],
            drawer: null,
        }
    },
    methods: {
        updateLocalStorage( lyrics: string ) {
            localStorage.setItem('lyrics_presenter_verse', JSON.stringify({ lyrics } ) )
        }
    }
})
</script>
