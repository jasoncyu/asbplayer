import { inferTracks } from './util';

inferTracks({
    onRequest: async (addTrack, setBasename) => {
        function extractNextData(): string[] | null {
            const scriptElement = document.getElementById('__NEXT_DATA__');

            if (scriptElement && scriptElement.textContent) {
                const jsonData = JSON.parse(scriptElement.textContent);

                return jsonData.props.initialProps.pageProps.prePlayerData.dash.data.program.stl;
            }
        }
        const titleElem = document.getElementsByClassName('intl-play-main-title')[0]
        const title = titleElem.querySelector('a').textContent.trim()
        setBasename(title)

        const stlList = extractNextData();

        for (const obj of stlList) {
            addTrack({
                label: obj._name,
                language: obj._name,
                url: `https://meta.video.iqiyi.com${obj.srt}`,
                extension: 'srt',
            });

        }
    },
});
