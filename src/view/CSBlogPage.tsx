import React from 'react';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';
import CSCardArticle from '../component/CSCardArticle';
import CSCardArtilePopular from '../component/CSCardArtilePopular';
import CSEmailSubscribe from '../component/CSEmailSubscribe';

const CSBlogPage = () => {
    return (
        <section>
            <div className="container-hero-blog">
                <div className="content-wrap-blog">
                    <p className='bold-yellow'>Website Component</p>
                    <h1>Instant Lorem Ipsum all your </h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <div className="article-writer">
                        <CSWriterAvatar />
                        <p><strong>Michael Junior</strong> on 27 Mei 2021</p>
                    </div>
                </div>
            </div>
            <div className="container-popular-article">
                <div className="header-popular">
                    <h1>Popular This Month</h1>
                    <p>created on 27 Mei 2021</p>
                </div>
                <div className="container-card-row">
                    <CSCardArtilePopular />
                    <CSCardArtilePopular />
                    <CSCardArtilePopular />
                </div>
            </div>
            <div className="container-all-article">
                <CSCardArticle />
                <CSCardArticle />
                <CSCardArticle />
            </div>
            <CSEmailSubscribe />
        </section>
    );
};

export default CSBlogPage;
