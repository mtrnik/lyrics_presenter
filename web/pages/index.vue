<template>
    <v-app id="inspire">

        <v-navigation-drawer v-model="drawer">
            <v-sheet
                color="grey-lighten-4"
                class="pa-4"
            >
<!--                <v-avatar-->
<!--                    class="mb-4"-->
<!--                    color="grey-darken-1"-->
<!--                    size="64"-->
<!--                ></v-avatar>-->

                <div @click="openPresenter">Present</div>
            </v-sheet>

            <v-divider></v-divider>

            <v-list>
                <v-list-item v-for="[icon, text] in links" :key="icon" link >
                    <template v-slot:prepend>
                        <v-icon>{{ icon }}</v-icon>
                    </template>

                    <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container class="py-8 px-6" fluid>
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

                                    <v-divider
                                        v-if="n !== 6"
                                        :key="`divider-${n}`"
                                        inset
                                    ></v-divider>
                                </template>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
<!--    <div>-->
<!--        <h1 class="text-3xl font-bold underline">-->
<!--            Hello world!-->
<!--        </h1>-->
<!--        <span @click="openPresenter">Open Presenter</span>-->
<!--        <ul>-->
<!--            <li v-for="index in [0,1,2,3,4,5]" :key="index" @click="updateLocalStorage(index)">-->
<!--                verse {{ index }}-->
<!--            </li>-->
<!--        </ul>-->
<!--    </div>-->
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
            links: [
                ['mdi-play-box', 'Live'],
                ['mdi-clipboard-text-play-outline', 'Songs'],
                // ['mdi-delete', 'Trash'],
                // ['mdi-alert-octagon', 'Spam'],
            ],
        }
    },
    methods: {
        openPresenter() {
            window.open( window.location.href + 'presenter' , "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");
        },
        updateLocalStorage( lyrics: string ) {
            localStorage.setItem('lyrics_presenter_verse', JSON.stringify({ lyrics } ) )
        }
    }
})
</script>
