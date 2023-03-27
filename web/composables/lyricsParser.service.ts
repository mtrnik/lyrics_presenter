import {Verse} from "~/types/types";

export const useLyricsParser = () => {

    function parseLyrics( lyrics: string ): Verse[] {
        const verses: Verse[] = []
        const parts: string[] = lyrics.split('\n\n')

        for ( const partIndex in parts ) {
            verses.push( { lyrics: parts[partIndex], tag: 'verse-' + partIndex } )
        }

        return verses
    }

    return {
        parseLyrics
    }
}
