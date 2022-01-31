import React from 'react';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';
import { CardArticleProps } from './CSCardArticle';

const CSCardArtcilePopular: React.FC<CardArticleProps> = (props) => {
    let date = new Date(props.createdAt);
    let month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let formatDate = `${date.getDay()}  ${month[date.getMonth()]}  ${date.getFullYear()}`
    return (
        <div className='card-article-popular'>
            <p className='bold-yellow'>{props.category}</p>
            <h1>{props.title} </h1>
            <div className="card-button">
                <button>Learn more</button>
            </div>
            <div className="article-writer light">
                <CSWriterAvatar />
                <p><strong>{props.writer}</strong> {formatDate}</p>
            </div>
        </div>
    );
};

export default CSCardArtcilePopular;
