export interface Verse {
    lyrics: string
    tag: string
}

export interface Song {
    name: string
    slug: string,
    lyrics: string,
    verses: Verse[]
}
