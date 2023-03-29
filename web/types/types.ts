export interface Song {
    id: string
    name: string
    slug: string,
    lyrics: string,
    verses: Verse[]
    orderedTags: string[]
}

export interface Verse {
    id: string
    lyrics: string
    tag: string
}

