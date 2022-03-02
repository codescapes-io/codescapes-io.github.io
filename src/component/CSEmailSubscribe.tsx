import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import CSIMail from '../assets/image/CSIMail';

const CSEmailSubscribe = () => {
    return (
        <div className="container-subscribe">
            <Box className="hidden md:block" sx={{ display: { xs: 'none', md: 'block' } }}>
                <CSIMail />
            </Box>
            <Box className="subs-body" sx={{ px: '2rem', ml: { md: '16px' } }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { md: '2.25rem', xs: '1.875rem' },
                        letterSpacing: '0.1em',
                        fontWeight: '900'
                    }}
                >
                    Stay Tuned!
                </Typography>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s
                </p>
                <form action="">
                    <input type="email" name="" id="" placeholder="Enter your e-mail adress" />
                    <Button
                        variant="contained"
                        sx={{
                            flexBasis: { xs: '40%', md: '20%' },
                            fontSize: { xs: '12px', md: '16px' }
                        }}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default CSEmailSubscribe;
