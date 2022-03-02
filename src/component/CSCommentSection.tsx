import React from 'react';
import { Box } from '@mui/material';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';

const CSCommentSection = () => {
    return (
        <Box className="container-comment">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                }}
            >
                <Box className="article-writer" sx={{ mb: '24px' }}>
                    <CSWriterAvatar />
                    <p>
                        <strong>Michael Junior</strong> on 27 Mei 2021
                    </p>
                </Box>
                <p className="text-article">
                    industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                    1500s .
                </p>
                <Box
                    sx={{
                        display: 'flex',
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        mt: '16px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mx: '12px'
                        }}
                    >
                        <ThumbUpAltRoundedIcon color="action" />
                        <p>0</p>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mx: '12px'
                        }}
                    >
                        <ModeCommentRoundedIcon color="action" />
                        <p>0</p>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CSCommentSection;
