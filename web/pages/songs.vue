<template>
    <v-row>
        <v-col>
            <v-card>
                <v-list>
                    <template v-for="song in songs" :key="song.id" cols="12">
                        <v-list-item @click="showEditDialog(song)">
                            <v-list-item-title>{{ song.name }}</v-list-item-title>
                        </v-list-item>

                        <!--                        <v-divider v-if="index !== song.verses - 1" inset />-->
                    </template>
                </v-list>
            </v-card>
        </v-col>
    </v-row>

    <v-dialog v-model="editDialog" width="auto" >
        <v-card>
            <v-card-text>
                {{ editSong.name }}
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="editDialog = false">Close Dialog</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import {Song} from "~/types/types";

export default defineNuxtComponent({
    name: "songs",
    data() {
        return {
            songs: [
                { id: 1, name: 'Song 1' },
                { id: 2, name: 'Song 2' },
                { id: 3, name: 'Song 3' },
                { id: 4, name: 'Song 4' },
                { id: 5, name: 'Song 5' },
            ],

            editDialog: false,
            editSong: {} as Song
        }
    },
    mounted() {
        // this.watchLocalStorage()
    },

    methods: {
        showEditDialog( song?: Song ) {
            this.editDialog = true
            if ( song ) {
                this.editSong = song
            }

        }
    }
})
</script>

<style scoped>

</style>
