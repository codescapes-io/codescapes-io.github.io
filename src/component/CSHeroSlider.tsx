import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';
import { CSICardArticleProps } from './CSCardArticle';
import DateFormater from '../func/DateFormater';

const CSHeroSlider: React.FC<CSICardArticleProps> = (props) => {
    return (
        <div className={`content-wrap-blog ${props.strClass}`} title="hero-slider">
            <Typography
                variant="body1"
                className="bold-yellow"
                sx={{
                    fontSize: { xs: '12px', md: '16px' },
                    fontWeight: '600'
                }}
            >
                {props.strCategory}
            </Typography>
            <Link to={`/blog/${props.nId}`}>
                <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '3rem' } }}>
                    {props.strTitle}
                </Typography>
            </Link>
            <Typography variant="body1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                {props.strContent}
            </Typography>
            <div className="article-writer">
                <CSWriterAvatar />
                <p>
                    <strong>{props.strWriter}</strong> on {DateFormater(props.strCreatedAt)}
                </p>
            </div>
        </div>
    );
};

export default CSHeroSlider;
