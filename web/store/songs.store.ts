import { defineStore } from 'pinia'
import {Song} from "~/types/types";
import localforage from "localforage";
// import {useToast} from "~/composables/toast.service";

export const useSongsStore = defineStore('songs', {
    state: () => {
        const songs: Song[] = []

        return {
            songs,
        }
    },
    getters: {},
    actions: {
        async fetchSongs(): Promise<void> {
            this.songs = await readSongsFromLocalForage()
        },

        async saveSong(song: Song): Promise<void> {
            await saveSongToLocalForage( song )
            await this.fetchSongs()
        },

        async deleteSong(song: Song): Promise<void> {
            await removeSongFromLocalForage( song )
            await this.fetchSongs()
        }
    },
})

async function readSongsFromLocalForage(): Promise<Song[]> {
    const songs: Song[] = []

    await localforage.iterate(( value: Song ) => {
        songs.push( value )
    })

    return songs
}

async function saveSongToLocalForage(song: Song): Promise<void> {
    await localforage.setItem( song.slug, song )
}

async function removeSongFromLocalForage(song: Song): Promise<void> {
    await localforage.removeItem( song.slug )
}
