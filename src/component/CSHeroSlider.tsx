import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';
import { CSICardArticleProps } from './CSCardArticle';
import DateFormater from '../func/DateFormater'

const CSHeroSlider: React.FC<CSICardArticleProps> = (props) => {
    return (
        <div className={`content-wrap-blog ${props.sClass}`} title='hero-slider'>
            <Typography
                variant='body1'
                className='bold-yellow'
                sx={{
                    fontSize: { xs: '12px', md: '16px' },
                    fontWeight: '600'
                }}
            >
                {props.sCategory}
            </Typography>
            <Link to={`/blog/${props.nId}`}>
                <Typography variant='h1' sx={{ fontSize: { xs: '2.25rem', md: '3rem' } }}>
                    {props.sTitle}
                </Typography>
            </Link>
            <Typography variant='body1' sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                {props.sContent}
            </Typography>
            <div className="article-writer">
                <CSWriterAvatar />
                <p><strong>{props.sWriter}</strong> on {DateFormater(props.sCreatedAt)}</p>
            </div>
        </div>
    );
};

export default CSHeroSlider;
