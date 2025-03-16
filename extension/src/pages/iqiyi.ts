import { extractExtension, inferTracks } from './util';
console.log('iqiyi page.js')

function main(addTrack) {
    // Function to extract and parse the data
    function extractNextData(): string[] | null {
        // Find the script tag with id "__NEXT_DATA__"
        const scriptElement = document.getElementById('__NEXT_DATA__');
        console.log('scriptElement: ', scriptElement)

        if (scriptElement && scriptElement.textContent) {
            // Parse the content as JSON
            const jsonData = JSON.parse(scriptElement.textContent);

            // Extract the specified data
            const stlData = jsonData.props.initialProps.pageProps.prePlayerData.dash.data.program.stl;
            return stlData;
        }

        return null;
    }

    // Usage
    const stlList = extractNextData();
    console.log('Extracted STL data:', stlList);

    for (const obj of stlList) {
        console.log(obj)
        const track = {
            label: obj._name,
            language: obj._name,
            url: `https://meta.video.iqiyi.com${obj.srt}`,
            extension: 'srt',
        }
        console.log('track: ', track)
        addTrack({
            label: obj._name,
            language: obj._name,
            url: `https://meta.video.iqiyi.com${obj.srt}`,
            extension: 'srt',
        });

    }
}
// document.addEventListener("DOMContentLoaded", function() {
//     main()
// });

inferTracks({
    onRequest: async (addTrack) => {
        main(addTrack)
        // console.log('value in iqiyi', value)
        // const track = {
        //     "label": "YOU'RE NOT LAUGHING NOW Bahasa Melayu",
        //     "language": "ms-my",
        //     "url": "https://cf-timedtext.aux.pv-cdn.net/3123/0892/bc28/42c7-91b5-5b925045dd19/5a2b1937-230e-43cc-8d35-747b2344b2a6.ttml2",
        //     "extension": "ttml2"
        // }
        // addTrack(track);
        // if (value?.subtitleUrls instanceof Array) {
        //     for (const track of value.subtitleUrls) {
        //         if (
        //             typeof value?.catalogMetadata?.catalog?.title === 'string' &&
        //             typeof track.url === 'string' &&
        //             typeof track.languageCode === 'string' &&
        //             typeof track.displayName === 'string'
        //         ) {
        //             const label = `${value.catalogMetadata.catalog.title} ${track.displayName}`;

        //             addTrack({
        //                 label: label,
        //                 language: track.languageCode.toLowerCase(),
        //                 url: track.url,
        //                 extension: extractExtension(track.url, 'dfxp'),
        //             });
        //         }
        //     }
        // }
    },
    waitForBasename: false,
});
