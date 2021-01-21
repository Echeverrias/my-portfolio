import React, {useState, useEffect}from 'react';
import sanityClient from '../client.js';
import {useParams} from 'react-router-dom';
import './SinglePost.css';
import imageUrlBuilder from '@sanity/image-url' ;
import BlockContent from "@sanity/block-content-to-react";
import getYouTubeID from 'get-youtube-id';
import YouTube from 'react-youtube';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source){
    return builder.image(source)
}

const serializers = {
    types: {
      youtube: ({node}) => {
        const { url } = node
        const id = getYouTubeID(url)
        return (<YouTube videoId={id} />)
      }
    }
}

function SinglePost(){

    const [singlePost, setSinglePost] = useState(null);
    const slug = useParams().slug;

    useEffect(() => {
        console.log(slug);
        console.log(slug === "my-second-blog-post")
        console.log(``);
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                    _id, url
                }
            },
            body,
            "name": author->name,
            "authorImage": author->image,
        }`)
        .then((data) => {
            console.log(data);
            setSinglePost(data[0]);
        })
        .catch(console.error);
    }, [slug])

    if(!singlePost){
        return <div className="flex justify-center pt-20 lg:pt-40">Loading...</div>
    }else{
        console.log(singlePost);
        console.log(singlePost.body);
    }    

    return (
            <div className='singlePost'>
                <main className="bg-gray-200 min-h-screen p-12">
                    <article className="container shadow-lg mx-auto bg-green-100 rounded-lg">
                        <header className="relative">
                            <div className="absolute h-full w-full flex items-center justify-center p-8">
                                <div className="bg-white bg-opacity-75 rounded p-12">
                                    <h1 className="cursive text-3xl lg:text-6xl mb-4">
                                        {singlePost.title}
                                    </h1>
                                    <div className="singlePost__author flex justify-center text-gray-800">
                                        <img 
                                            className="w-10 h-10 bg-gray-300 rounded-full"
                                            src={urlFor(singlePost.authorImage).url()}
                                            alt={singlePost.name}    
                                        />
                                    
                                        <p className="cursive flex items-center pl-2 text-2xl">
                                            {singlePost.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <img 
                                className="w-full object-cover rounded-t"
                                src={singlePost.mainImage.asset.url}
                                alt={singlePost.title}
                                style={{height: "400px"}}
                            />
                        </header>
                        <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:proze-xl max-w-full">
                            <BlockContent
                                blocks={singlePost.body}
                                projectId="yom18al6"
                                dataset="production"
                                serializers={serializers}
                            />
                        </div>
                    </article>
                </main>
            </div>
        )
    
}

export default SinglePost;