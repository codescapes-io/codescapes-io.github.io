import { Box, Skeleton, Typography } from '@mui/material';
import React from 'react';

const CSCardArticleSkeleton = () => {
    return <Box className='container-article-ads' title='skeleton-article-card' sx={{ flexDirection: { xs: 'column', md: 'row' }, }}>
        <div className="card-article">
            <Box className="content-wrap-card" sx={{
                px: '0.875rem',
                pb: '0.875rem',
                pt: { xs: '4rem', md: '1.5rem' },
                width: { xs: '90%', sm: '50%' }
            }}>
                <Typography variant='caption' width='40%'><Skeleton /></Typography>
                <Typography variant='h3' width='100%'><Skeleton width='50%' /></Typography>
                <Typography variant='h3' width='100%'><Skeleton width='100%' /></Typography>
                <Typography variant='body1' gutterBottom component='div' width='100%'><Skeleton width='100%' /></Typography>
                <Typography variant='body1' gutterBottom component='div' width='100%'><Skeleton width='100%' /></Typography>
                <Typography variant='body1' gutterBottom component='div' width='100%'><Skeleton width='100%' /></Typography>
                <div style={{ width: '100%', marginTop: '16px', display: 'flex', alignItems: 'center' }}>
                    <Skeleton variant='circular' width={36} height={36} style={{ marginRight: '16px' }} />
                    <Typography variant='caption' width='40%'><Skeleton /></Typography>
                </div>
            </Box>
        </div>
        <div className="card-ads" style={{ width: '10%' }}>
            <Typography variant='caption' width='40%'><Skeleton /></Typography>
        </div>
    </Box>;
};

export default CSCardArticleSkeleton;
