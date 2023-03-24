export interface Verse {
    lyrics?: string
}

export interface Song {
    name: string
    verses: Verse[]
}
