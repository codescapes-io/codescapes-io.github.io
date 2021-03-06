import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';
import DateFormater from '../func/DateFormater';

export interface CSICardArticleProps {
    nId?: number;
    strClass?: string;
    strTitle: string;
    strContent?: string;
    strCategory: string;
    strCreatedAt: string;
    strWriter: string;
}

const CSCardArticle: React.FC<CSICardArticleProps> = (props) => {
    return (
        <Box
            className="container-article-ads"
            sx={{
                flexDirection: { xs: 'column', md: 'row' }
            }}
            title="card-article"
        >
            <div className="card-article">
                <div
                    style={{
                        backgroundImage: `url(${
                            process.env.REACT_APP_BASE_URL + '/uploads/article_img_77492e10a8.png'
                        })`
                    }}
                    className="hero-img active-img"
                ></div>
                <Box
                    className="content-wrap-card"
                    sx={{
                        px: '0.875rem',
                        pb: '0.875rem',
                        pt: { xs: '4rem', md: '1.5rem' },
                        width: { xs: '90%', md: '50%' }
                    }}
                >
                    <Typography
                        className="bold-yellow"
                        variant="body1"
                        sx={{
                            fontSize: { xs: '12px', md: '16px' },
                            fontWeight: '600'
                        }}
                    >
                        {props.strCategory}
                    </Typography>
                    <Link to={`/blog/${props.nId}`}>
                        <Typography variant="h1" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
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
                </Box>
            </div>
            <div className="card-ads">ads here</div>
        </Box>
    );
};

export default CSCardArticle;
