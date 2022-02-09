import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';
import { CSICardArticleProps } from './CSCardArticle';
import DateFormater from '../func/DateFormater'


const CSCardArtcilePopular: React.FC<CSICardArticleProps> = (props) => {
    return (
        <Box className='card-article-popular' title='card-popular'>
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
                <Typography variant='h1' sx={{ fontSize: '2.25rem' }}>
                    {props.sTitle}
                </Typography>
            </Link>
            <div className="card-button">
                <button>Learn more</button>
            </div>
            <div className="article-writer light">
                <CSWriterAvatar />
                <p><strong>{props.sWriter}</strong> {DateFormater(props.sCreatedAt)}</p>
            </div>
        </Box>
    );
};

export default CSCardArtcilePopular;
