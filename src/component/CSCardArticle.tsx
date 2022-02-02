import React from 'react';
import { Link } from 'react-router-dom';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';

export interface CardArticleProps {
    id?: number
    class?: string
    title: string
    content?: string
    category: string
    createdAt: string
    writer: string
}

const CSCardArticle: React.FC<CardArticleProps> = (props) => {
    let date = new Date(props.createdAt);
    let month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let formatDate = `${date.getDay()}  ${month[date.getMonth()]}  ${date.getFullYear()}`
    return (
        <div className='container-article-ads flex-col mx-8 lg:flex-row'>
            <div className='card-article'>
                <div
                    style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL + '/uploads/article_img_77492e10a8.png'})` }}
                    className='hero-img active-img'
                >
                </div>
                <div className="content-wrap-card px-3.5 pb-3.5 pt-16 md:pt-6 w-full md:w-3/6">
                    <p className='bold-yellow text-xs lg:text-base'>{props.category}</p>
                    <Link to={`/blog/${props.id}`}><h1 className='text-4xl'>{props.title}</h1></Link>
                    <p className='text-xs lg:text-base'>{props.content}</p>
                    <div className="article-writer">
                        <CSWriterAvatar />
                        <p><strong>{props.writer}</strong> on {formatDate}</p>
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
