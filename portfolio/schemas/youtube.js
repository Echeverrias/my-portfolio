import React from 'react';
import getYouTubeID from 'get-youtube-id';
import YouTube from 'react-youtube';

/*  props ==
    {
        "isLoading":false,
        "value":{
            "_type":"youtube",
            "url":"https://www.youtube.com/watch?v=1cTPyn77pUI"
        },
        "layout":"block",
        "isPlaceholder":false,
        "_renderAsBlockImage":false
    }
*/
const YouTubePreview = ({value}) => {
    const id = getYouTubeID(value.url)
    const url = `https://www.youtube.com/embed/${id}`
    if(!id) return <div>Missing YouTube URL</div>
    return (
        <iframe 
            title="YouTube Preview"
            width="560" 
            height="315" 
            src={url} 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
)};

const Preview = ({value}) => {
    const {url} = value;
    const id = getYouTubeID(url);
    return (
        <YouTube videoId={id} />
    )
};

export default {
    name: 'youtube',
    type: 'object',
    title: 'YouTube Embed',
    fields: [
        {
            name: 'url',
            type: 'url',
            title: 'YouTube video URL',
        }
    ],
    preview: {
        select: {
            url: 'url',
        },
        component: Preview,
    }
}