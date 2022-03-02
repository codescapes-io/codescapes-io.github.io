import { Box, Typography } from '@mui/material';
import React from 'react';
import CSIDialog from '../assets/icons/CSIDialog';
import CSIFacebook from '../assets/icons/CSIFacebook';
import CSIInstagram from '../assets/icons/CSIInstagram';
import CSILinkedin from '../assets/icons/CSILinkedin';
import CSIQuestion from '../assets/icons/CSIQuestion';
import CSITwitter from '../assets/icons/CSITwitter';
import CSIYoutube from '../assets/icons/CSIYoutube';

const CSFooter = () => {
    return (
        <footer>
            <Box className="footer-body" sx={{ justifyContent: { xs: 'flex-start', sm: 'center' } }}>
                <div className="footer-setting">
                    <div className="setting-wrap">
                        <CSIQuestion />
                        Resolution Center
                    </div>
                    <div className="setting-wrap">
                        <CSIDialog />
                        English
                    </div>
                </div>
                <div className="footer-content">
                    <div className="footer-label">
                        <Typography variant="body1" sx={{ fontWeight: '600' }}>
                            About Us
                        </Typography>
                    </div>
                    <div className="footer-link">
                        <a href="/">lorem</a>
                        <a href="/">lorem</a>
                        <a href="/">lorem</a>
                    </div>
                </div>
                <div className="footer-content">
                    <div className="footer-label">
                        <Typography variant="body1" sx={{ fontWeight: '600' }}>
                            Our Product
                        </Typography>
                    </div>
                    <div className="footer-link">
                        <a href="/">lorem</a>
                        <a href="/">lorem</a>
                        <a href="/">lorem</a>
                    </div>
                </div>
                <div className="footer-content">
                    <div className="footer-label">
                        <Typography variant="body1" sx={{ fontWeight: '600' }}>
                            Our Product
                        </Typography>
                    </div>
                    <div className="footer-link">
                        <a href="/">lorem</a>
                        <a href="/">lorem</a>
                        <a href="/">lorem</a>
                    </div>
                </div>
            </Box>
            <div className="footer-bottom">
                <CSIFacebook />
                <CSITwitter />
                <CSIYoutube />
                <CSIInstagram />
                <CSILinkedin />
            </div>
        </footer>
    );
};

export default CSFooter;
