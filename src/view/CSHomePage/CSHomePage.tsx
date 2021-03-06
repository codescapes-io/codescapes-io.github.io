import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CSIFeature from '../../assets/image/CSIFeature';
import CSEmailSubscribe from '../../component/CSEmailSubscribe';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export interface CSITechs {
    id: number;
    attributes: {
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        url: string;
        formats: {
            thumbnail: {
                name: string;
                width: number;
                height: number;
                size: number;
                url: string;
            };
            medium: {
                name: string;
                width: number;
                height: number;
                size: number;
                url: string;
            };
            small: {
                name: string;
                width: number;
                height: number;
                size: number;
                url: string;
            };
        };
    };
}

export interface CSIHome {
    id: number;
    attributes: {
        title: string;
        createdAt: string;
        updateAt: string;
        publishedAt: string;
        techs: {
            data: CSITechs[];
        };
    };
}

export interface CSIHomeResponse {
    data: CSIHome;
}

const Home: React.FC = () => {
    const [content, setContent] = useState<CSIHome | string>();

    useEffect(() => {
        let bCancel = false;
        const fetchData = async () => {
            const response = await axios.get<CSIHomeResponse>(
                `${process.env.REACT_APP_BASE_URL}/api/homepage?populate=techs`
            );
            return response;
        };
        fetchData()
            .then((resp) => {
                if (bCancel || !resp) return;
                setContent(resp.data.data);
            })
            .catch((err) => {
                setContent(err.response.statusText);
            });
        return () => {
            bCancel = true;
        };
    }, []);

    if (typeof content === 'string') {
        return (
            <Box
                sx={{
                    display: 'flex',
                    height: '90vh',
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '101px'
                }}
            >
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    Can not load data!
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    {content}
                </Typography>
            </Box>
        );
    }
    return (
        <section id="home" title="home" className="mt-nav">
            <div className="container-hero">
                <h1 title="header-content">{content?.attributes.title}</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s
                </p>
                <button>Get Started Free</button>
            </div>
            <div className="container-hero-2">
                <h1>Lorem ipsum.</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s Lorem Ipsum
                </p>
            </div>
            <div className="container-features">
                <div className="feature-link">
                    <div className="radio-feature">
                        <input type="radio" name="feature" id="cloud" />
                        <label htmlFor="cloud">Cloud Deployment</label>
                    </div>
                    <div className="radio-feature">
                        <input type="radio" name="feature" id="backend" />
                        <label htmlFor="backend">Backend Visualizer</label>
                    </div>
                    <div className="radio-feature">
                        <input type="radio" name="feature" id="api" />
                        <label htmlFor="api">Logic API</label>
                    </div>
                    <div className="radio-feature">
                        <input type="radio" name="feature" id="database" />
                        <label htmlFor="database">Database Management</label>
                    </div>
                </div>
                <div className="container-feature-img">
                    <CSIFeature width={677} height={500} />
                    <a href="/" className="learn-more">
                        Learn more
                    </a>
                </div>
            </div>
            <div className="tech-compatible">
                {content?.attributes.techs.data.map((el) => {
                    return (
                        <img
                            title="techs"
                            key={el.id}
                            src={`${process.env.REACT_APP_BASE_URL}${el.attributes.url}`}
                            alt=""
                        />
                    );
                })}
            </div>
            <CSEmailSubscribe />
        </section>
    );
};

export default Home;
