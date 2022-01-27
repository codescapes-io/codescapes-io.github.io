import React from 'react';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';
import { CardArticleProps } from './CSCardArticle';

const CSHeroSlider: React.FC<CardArticleProps> = (props) => {
    let date = new Date(props.createdAt);
    let month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let formatDate = `${date.getDay()}  ${month[date.getMonth()]}  ${date.getFullYear()}`
    return (
        <div className={`content-wrap-blog ${props.class}`}>
            <p className='bold-yellow'>{props.category}</p>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <div className="article-writer">
                <CSWriterAvatar />
                <p><strong>{props.writer}</strong> on {formatDate}</p>
            </div>
        </div>
    );
};

export default CSHeroSlider;
