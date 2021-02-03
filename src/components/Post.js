import React, {useState, useEffect} from 'react';
import './Post.css';
import sanityClient from '../client';
import {Link} from 'react-router-dom'

function Post(){

    const [posts, setPosts] = useState([])

    useEffect(() => {
            sanityClient.fetch(`*[_type == "post"]{
                    title,
                    slug,
                    "urlImage": mainImage.asset->url,
                    "idImage": mainImage.asset->_id,
                    mainImage{
                        asset->{
                            _id,
                            url
                        },
                        alt
                    }
                }`)
                .then((data) => {
                    setPosts(data);
                })
                .catch((error) => console.log(error))
    
    }, [])

    return (
            <div className='post'>
                <main className="bg-green-100 min-h-screen p-12">
                    <section className="container mx-auto">
                        <h1 className="text-5xl flex justify-center cursive">Blog Posts Page</h1>
                        <h2 className="text-lg text-gray-600 flex justify-center mb-12">Welcome to my page blog posts</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            { posts && posts.length > 0 && 
                                posts.map((post, index) => (
                                    <article key={index}>
                                         <p hidden>{JSON.stringify(post)}</p>
                                         <p hidden>{JSON.stringify(post.mainImage)}</p>
                                        <Link to={"/post/" + post.slug.current} key={post.slug.current}>
                                            <span 
                                                className="block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-green-600 hover:shadow-lg  hover:border-green-400"
                                                
                                            >
                                                <img 
                                                    src={post.urlImage} 
                                                    alt={post?.mainImage?.alt}
                                                    className="w-full h-full rounded-r object-cover absolute"
                                                />
                                                <span className="block relative h-full flex justify-end items-end pr-4 pb-4">
                                                    <h3 className="text-gray-800 text-lg font-blog px-3 py-4 bg-red-700 text-red-100 bg-opacity-75 rounded">
                                                        {post.title}    
                                                    </h3>
                                                </span>
                                            </span>
                                        </Link>
                                    </article>
                                ))
                                }    
                        </div>
                    </section>
                </main>
            </div>
        )
    
}

export default Post;