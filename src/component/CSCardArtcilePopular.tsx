import React from 'react';
import { Link } from 'react-router-dom';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';
import { CardArticleProps } from './CSCardArticle';

const CSCardArtcilePopular: React.FC<CardArticleProps> = (props) => {
    let date = new Date(props.createdAt);
    let month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let formatDate = `${date.getDay()}  ${month[date.getMonth()]}  ${date.getFullYear()}`
    return (
        <div className='card-article-popular mx-8 mb-8'>
            <p className='bold-yellow text-xs lg:text-base'>{props.category}</p>
            <Link to={`/blog/${props.id}`}><h1 className='text-4xl'>{props.title} </h1></Link>
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
