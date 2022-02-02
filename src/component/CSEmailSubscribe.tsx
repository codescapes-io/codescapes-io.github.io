import React from 'react';
import CSIMail from '../assets/image/CSIMail';

const CSEmailSubscribe = () => {
    return (
        <div className="container-subscribe">
            <div className='hidden md:block'>
                <CSIMail />
            </div>
            <div className="subs-body px-8 md:ml-16">
                <h1 className='text-3xl font-black tracking-widest md:text-4xl'>Stay Tuned!</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                <form action="">
                    <input type="email" className='text-xs px-3 py-4 md:px-3.5 md:py-4 md:text-base' name="" id="" placeholder='Enter your e-mail adress' />
                    <button className='basis-2/5 md:basis1/5 text-xs md:text-lg'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CSEmailSubscribe;
