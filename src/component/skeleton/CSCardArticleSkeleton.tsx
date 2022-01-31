import { Skeleton, Typography } from '@mui/material';
import React from 'react';

const CSCardArticleSkeleton = () => {
    return <div className='container-article-ads'>
        <div className="card-article">
            <div className="content-wrap-card">
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
            </div>
        </div>
        <div className="card-ads" style={{ width: '10%' }}>
            <Typography variant='caption' width='40%'><Skeleton /></Typography>
        </div>
    </div>;
};

export default CSCardArticleSkeleton;
