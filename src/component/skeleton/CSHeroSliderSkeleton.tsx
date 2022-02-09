import React from 'react';
import { Skeleton, Typography } from '@mui/material';


const CSHeroSliderSkeleton = () => {
    return <div className='content-wrap-skeleton' title='skeleton-hero-slider'>
        <Typography variant='caption' width='40%'><Skeleton /></Typography>
        <Typography variant='h3'><Skeleton width='100%' /></Typography>
        <Typography variant='h3' style={{ marginBottom: '16px' }}><Skeleton width='50%' /></Typography>
        <Typography variant='body1'><Skeleton /></Typography>
        <Typography variant='body1'><Skeleton /></Typography>
        <Typography variant='body1'><Skeleton width='20%' /></Typography>
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center' }}>
            <Skeleton variant='circular' width={36} height={36} style={{ marginRight: '16px' }} />
            <Typography variant='caption' width='40%'><Skeleton /></Typography>
        </div>
    </div>;
};

export default CSHeroSliderSkeleton;
