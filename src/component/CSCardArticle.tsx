import React from 'react';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';

export interface CardArticleProps {
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
        <div className='container-article-ads'>
            <div className='card-article' style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL + '/uploads/article_img_77492e10a8.png'})` }}>
                {/* <img
                    src={process.env.REACT_APP_BASE_URL + '/uploads/article_img_77492e10a8.png'}
                    alt=""
                    className='hero-img active-img'
                /> */}
                <div className="content-wrap-card">
                    <p className='bold-yellow'>{props.category}</p>
                    <h1>{props.title}</h1>
                    <p>{props.content}</p>
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
