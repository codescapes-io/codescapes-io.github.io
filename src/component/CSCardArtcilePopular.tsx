import { Box, Typography } from '@mui/material';
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
        <Box className='card-article-popular' sx={{ mx: '2rem', mb: '2rem' }}>
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
                <Typography variant='h1' sx={{ fontSize: '2.25rem' }}>
                    {props.title}
                </Typography>
            </Link>
            <div className="card-button">
                <button>Learn more</button>
            </div>
            <div className="article-writer light">
                <CSWriterAvatar />
                <p><strong>{props.writer}</strong> {formatDate}</p>
            </div>
        </Box>
    );
};

export default CSCardArtcilePopular;
