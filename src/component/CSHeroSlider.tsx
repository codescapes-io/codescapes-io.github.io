import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';
import { CardArticleProps } from './CSCardArticle';

const CSHeroSlider: React.FC<CardArticleProps> = (props) => {
    let date = new Date(props.createdAt);
    let month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let formatDate = `${date.getDay()}  ${month[date.getMonth()]}  ${date.getFullYear()}`

    return (
        <div className={`content-wrap-blog ${props.class}`}>
            <Typography
                variant='body1'
                className='bold-yellow'
                sx={{
                    fontSize: { xs: '12px', md: '16px' },
                    fontWeight: '600'
                }}
            >
                {props.category}
            </Typography>
            <Link to={`/blog/${props.id}`}>
                <Typography variant='h1' sx={{ fontSize: { xs: '2.25rem', md: '3rem' } }}>
                    {props.title}
                </Typography>
            </Link>
            <Typography variant='body1' sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                {props.content}
            </Typography>
            <div className="article-writer">
                <CSWriterAvatar />
                <p><strong>{props.writer}</strong> on {formatDate}</p>
            </div>
        </div>
    );
};

export default CSHeroSlider;
