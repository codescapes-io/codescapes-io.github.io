import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';
import { CardArticleProps } from './CSCardArticle';
import DateFormater from '../func/DateFormater'

const CSHeroSlider: React.FC<CardArticleProps> = (props) => {
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
                <p><strong>{props.writer}</strong> on {DateFormater(props.createdAt)}</p>
            </div>
        </div>
    );
};

export default CSHeroSlider;
