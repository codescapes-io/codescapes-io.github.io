import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CSCardArticle from '../../component/CSCardArticle';
import CSCardArticlePopular from '../../component/CSCardArtcilePopular';
import CSEmailSubscribe from '../../component/CSEmailSubscribe';
import CSHeroSlider from '../../component/CSHeroSlider';
import { Box, Skeleton, Typography } from '@mui/material';
import CSHeroSliderSkeleton from '../../component/skeleton/CSHeroSliderSkeleton';
import CSCardPopularSkeleton from '../../component/skeleton/CSCardPopularSkeleton';
import CSCardArticleSkeleton from '../../component/skeleton/CSCardArticleSkeleton';

export interface CSICategories {
    id: number;
    attributes: {
        name: string;
    };
}

export interface CSIUsers {
    id: number;
    attributes: {
        username: string;
        email: string;
        name: string;
    };
}

export interface CSIArticle {
    id: number;
    attributes: {
        title: string;
        content: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        read: string;
        categories: {
            data: CSICategories[];
        };
        users_permissions_user: {
            data: CSIUsers;
        };
    };
}

export interface CSIArticleListResponse {
    data: CSIArticle[];
}

export interface CSIEachArticleResponse {
    data: CSIArticle;
}

const CSBlogPage: React.FC = () => {
    const [articles, setArticles] = useState<CSIArticle[] | []>([]);
    const [popularArticle, setPopularArticle] = useState<CSIArticle[] | []>([]);
    const [dotActive, setDotActive] = useState<number>(0);
    const [heroImgUrl, setHeroImgUrl] = useState<string>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let bCancel = false;

        const fetchArticle = async () => {
            const response = await axios.get<CSIArticleListResponse>(
                `${process.env.REACT_APP_BASE_URL}/api/articles?populate=categories,users_permissions_user&&pagination[pageSize]=3`
            );
            return response;
        };

        const fetchArticleSort = async () => {
            const responseSort = await axios.get<CSIArticleListResponse>(
                `${process.env.REACT_APP_BASE_URL}/api/articles?populate=categories,users_permissions_user&pagination[pageSize]=3&sort[0]=read%3Adesc`
            );
            return responseSort;
        };

        fetchArticle()
            .then((resp) => {
                if (bCancel || !resp) return;
                setArticles(resp.data.data);
            })
            .catch((err) => {
                setArticles([err.response.statusText]);
            });

        fetchArticleSort()
            .then((resp) => {
                if (bCancel || !resp) return;
                setHeroImgUrl(`${process.env.REACT_APP_BASE_URL}/uploads/article_img_77492e10a8.png`);
                setLoading(false);
                setPopularArticle(resp.data.data);
            })
            .catch((err) => {
                setPopularArticle([err.response.statusText]);
            });

        return () => {
            bCancel = true;
        };
    }, []);

    const handleSlide = (index: number) => {
        const dotList = Object.values(document.getElementsByClassName('dot'));

        if (index === dotActive) return;
        dotList[index].classList.add('active-dot');
        dotList[dotActive].classList.remove('active-dot');
        setDotActive(index);
    };

    return (
        <section title="blog" className="mt-nav">
            <div className="container-hero-blog">
                {isLoading ? (
                    <Skeleton
                        data-testid="skeleton-hero-img"
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        animation="wave"
                        style={{ position: 'absolute' }}
                    />
                ) : (
                    <div
                        title="hero-img"
                        style={{ backgroundImage: `url(${heroImgUrl})` }}
                        className="hero-img active-img"
                    ></div>
                )}
                <div className="container-slider" title="container-slider">
                    {isLoading ? (
                        <CSHeroSliderSkeleton />
                    ) : (
                        popularArticle.map((el, index) => {
                            if (typeof el == 'string') {
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            marginTop: '101px'
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                            Can not load data!
                                        </Typography>
                                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                            {el}
                                        </Typography>
                                    </Box>
                                );
                            } else {
                                return (
                                    <CSHeroSlider
                                        key={index}
                                        nId={el.id}
                                        strClass={index === dotActive ? 'active-blog' : ''}
                                        strTitle={el.attributes.title}
                                        strCategory={el.attributes.categories.data[0].attributes.name}
                                        strCreatedAt={el.attributes.createdAt}
                                        strWriter={el.attributes.users_permissions_user.data.attributes.name}
                                        strContent={el.attributes.content}
                                    />
                                );
                            }
                        })
                    )}

                    <div className="dot-slider">
                        {popularArticle.map((el, index) => {
                            if (typeof el === 'string') {
                                return null;
                            } else {
                                return (
                                    <span
                                        title="dot-sliders"
                                        key={index}
                                        onClick={() => handleSlide(index)}
                                        className={dotActive === index ? 'dot active-dot' : 'dot'}
                                        id={el.attributes.title}
                                    ></span>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
            <div className="container-popular-article">
                <div className="header-popular">
                    <Typography variant="h1" sx={{ fontSize: { md: '3rem', xs: '1.5rem' } }}>
                        Popular This Month
                    </Typography>
                </div>
                <Box className="container-card-row" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                    {isLoading ? (
                        <>
                            <CSCardPopularSkeleton />
                            <CSCardPopularSkeleton />
                            <CSCardPopularSkeleton />
                        </>
                    ) : (
                        popularArticle.map((el, index) => {
                            if (typeof el === 'string') {
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            marginTop: '101px'
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                            Can not load data!
                                        </Typography>
                                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                            {el}
                                        </Typography>
                                    </Box>
                                );
                            } else {
                                return (
                                    <CSCardArticlePopular
                                        key={index}
                                        nId={el.id}
                                        strTitle={el.attributes.title}
                                        strCategory={el.attributes.categories.data[0].attributes.name}
                                        strCreatedAt={el.attributes.createdAt}
                                        strWriter={el.attributes.users_permissions_user.data.attributes.name}
                                    />
                                );
                            }
                        })
                    )}
                </Box>
            </div>
            <Box className="container-all-article" sx={{ px: '2rem' }}>
                {isLoading ? (
                    <>
                        <CSCardArticleSkeleton />
                        <CSCardArticleSkeleton />
                        <CSCardArticleSkeleton />
                    </>
                ) : (
                    articles.map((el, index) => {
                        if (typeof el === 'string') {
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        width: '100%',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        marginTop: '101px'
                                    }}
                                >
                                    <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                        Can not load data!
                                    </Typography>
                                    <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                        {el}
                                    </Typography>
                                </Box>
                            );
                        } else {
                            return (
                                <CSCardArticle
                                    key={index}
                                    nId={el.id}
                                    strTitle={el.attributes.title}
                                    strContent={el.attributes.content}
                                    strCategory={el.attributes.categories.data[0].attributes.name}
                                    strCreatedAt={el.attributes.createdAt}
                                    strWriter={el.attributes.users_permissions_user.data.attributes.name}
                                />
                            );
                        }
                    })
                )}
            </Box>
            <CSEmailSubscribe />
        </section>
    );
};

export default CSBlogPage;
