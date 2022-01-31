import React from 'react';
import CSIMail from '../assets/image/CSIMail';

const CSEmailSubscribe = () => {
    return (
        <div className="container-subscribe">
            <CSIMail />
            <div className="subs-body">
                <h1>Stay Tuned!</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                <form action="">
                    <input type="email" name="" id="" placeholder='Enter your e-mail adress' />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CSEmailSubscribe;
