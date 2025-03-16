import { extractExtension, inferTracks } from './util';
console.log('iqiyi page.js')

// document.addEventListener("DOMContentLoaded", function() {
//     main()
// });

inferTracks({
    onRequest: async (addTrack, setBasename) => {
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
        const titleElem = document.getElementsByClassName('intl-play-main-title')[0]
        const title = titleElem.querySelector('a').textContent.trim()
        setBasename(title)

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
    },
    waitForBasename: false,
});
