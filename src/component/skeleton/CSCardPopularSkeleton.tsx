import { Box, Skeleton, Typography } from '@mui/material';
import React from 'react';

const CSCardPopularSkeleton = () => {
    return <Box className='card-article-popular' title='skeleton-card-popular' sx={{ flexBasis: '30%', width: { xs: '100%' } }}>
        <Typography variant='body1' width='100%' ><Skeleton width='30%' /></Typography>
        <Typography variant='h1' width='100%' style={{ margin: '0' }}><Skeleton width='90%' height={60} /></Typography>
        <Typography variant='h1' width='100%' style={{ margin: '0' }}><Skeleton width='40%' height={60} /></Typography>
        <div className="card-button" >
            <Skeleton width={80} height={50} style={{ alignSelf: 'flex-end' }} />
        </div>
        <div style={{ width: '100%', marginTop: '16px', display: 'flex', alignItems: 'center' }}>
            <Skeleton variant='circular' width={36} height={36} style={{ marginRight: '16px' }} />
            <Typography variant='caption' width='40%'><Skeleton width='100%' /></Typography>
        </div>
    </Box>;
};

export default CSCardPopularSkeleton;
