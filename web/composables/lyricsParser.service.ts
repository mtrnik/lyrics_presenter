import {Verse} from "~/types/types";
import { v4 as uuidv4 } from 'uuid';

export const useLyricsParser = () => {

    function parseLyrics( lyrics: string ): Verse[] {
        const verses: Verse[] = []
        const parts: string[] = lyrics.split('\n\n')

        for ( const partIndex in parts ) {
            const verseLyrics = parts[partIndex]
            let verseTag = 'verse-' + ( parseInt( partIndex ) + 1 )

            verses.push( { id: uuidv4(), lyrics: verseLyrics, tag: verseTag } )
        }

        return verses
    }

    return {
        parseLyrics
    }
}
