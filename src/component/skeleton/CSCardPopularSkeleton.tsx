import { Skeleton, Typography } from '@mui/material';
import React from 'react';

const CSCardPopularSkeleton = () => {
    return <div className='card-article-popular'>
        <Typography variant='body1' width='100%'><Skeleton width='30%' /></Typography>
        <Typography variant='h1' width='100%' style={{ margin: '0' }}><Skeleton width='60%' /></Typography>
        <Typography variant='h1' width='100%' style={{ margin: '0' }}><Skeleton width='30%' /></Typography>
        <div className="card-button" >
            <Skeleton width='35%' height='40%' style={{ alignSelf: 'flex-end' }} />
        </div>
        <div style={{ width: '100%', marginTop: '16px', display: 'flex', alignItems: 'center' }}>
            <Skeleton variant='circular' width={36} height={36} style={{ marginRight: '16px' }} />
            <Typography variant='caption' width='40%'><Skeleton width='100%' /></Typography>
        </div>
    </div>;
};

export default CSCardPopularSkeleton;
