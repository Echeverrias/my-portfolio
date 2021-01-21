import React, {useState, useEffect} from 'react';
import './About.css';
import sanityClient from '../client.js';
import image from '../lighthouse.jpg';
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react"

const builder = imageUrlBuilder(sanityClient);
function urlFor(source){
    return builder.image(source);
}


function About(){

    const [author, setAuthor] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "author"]{
            name,
            bio,
            "authorImage": image.asset->url
        }`)
        .then((data) => setAuthor(data[0]))
        .catch(console.error);
    }, [])

    if (!author) return <div className="flex justify-center lg:pt:40 pt-20">Loading...</div>

    return (
            <div className='about'>
                <main claaName="relative">
                    <img src={image} alt={"Forest"} className="absolute w-full"/>
                    <div className="p-10 lg:pt-48 container mx-auto relative">
                        <section className="bg-green-800 rounded-lg shadow-2xl lg:flex p-20">
                            <img 
                                src={urlFor(author.authorImage)} 
                                alt={author.name}
                                className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8 bg-gray-400"
                            />
                            <div className="text-lg flex flex-col justify-center">
                                <h1 className="cursive text-6xl text-green-300 mb-4">
                                    Hey there. I'm {" "}
                                    <span className="text-green-100">
                                        {author.name}
                                    </span>
                                </h1>
                                <div className="prose lg:prose-xl text-white">
                                    <BlockContent 
                                        blocks={author.bio}
                                        projectId= "yom18al6"
                                        dataset= "production"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        )
    
}

export default About;