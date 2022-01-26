import React from 'react';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';

const CSCardArticle = () => {
    return (
        <div className='container-article-ads'>
            <div className='card-article'>
                <div className="content-wrap-card">
                    <p className='bold-yellow'>Website Component</p>
                    <h1>Instant Lorem Ipsum all your </h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <div className="article-writer">
                        <CSWriterAvatar />
                        <p><strong>Michael Junior</strong> on 27 Mei 2021</p>
                    </div>
                </div>
            </div>
            <div className="card-ads">
                ads here
            </div>
        </div>
    )
};

export default CSCardArticle;
