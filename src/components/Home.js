import React from 'react';
import './Home.css';
import image from '../lighthouse.jpg'


function Home(){
    return (
            <div className='home'>
                <main>
                    <img  src={image} alt='Lighthosue'
                        className="absolute object-cover w-full h-full"
                    />
                    <section className='relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8'>
                        <h1 className='text-6xl text-blue-100 font-bold cursive leading-none lg:leading-snug home-name'>
                            My Home
                        </h1> 
                    </section> 
                </main>    
            </div>
        )
    
}

export default Home;