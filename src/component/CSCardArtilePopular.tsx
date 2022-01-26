import React from 'react';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';

const CSCardArtilePopular = () => {
    return (
        <div className='card-article-popular'>
            <p className='bold-yellow'>Website Component</p>
            <h1>Instant Lorem Ipsum all your </h1>
            <div className="card-button">
                <button>Learn more</button>
            </div>
            <div className="article-writer light">
                <CSWriterAvatar />
                <p><strong>Michael Junior</strong> on 27 Mei 2021</p>
            </div>
        </div>
    );
};

export default CSCardArtilePopular;
