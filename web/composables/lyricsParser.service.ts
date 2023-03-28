import {Verse} from "~/types/types";

export const useLyricsParser = () => {

    function parseLyrics( lyrics: string, originalVerses: Verse[] ): Verse[] {
        const verses: Verse[] = []
        const parts: string[] = lyrics.split('\n\n')

        for ( const partIndex in parts ) {
            const verseLyrics = parts[partIndex]
            let verseTag = 'verse-' + ( parseInt( partIndex ) + 1 )

            const originalVerse = originalVerses.find( verse => verse.lyrics === verseLyrics )
            if ( originalVerse ) {
                verseTag = originalVerse.tag
            }

            verses.push( { lyrics: verseLyrics, tag: verseTag } )
        }

        return verses
    }

    return {
        parseLyrics
    }
}
