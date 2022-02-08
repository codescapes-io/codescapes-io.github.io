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

export interface CSICategoriesProps {
    id: number
    attributes: {
        name: string
    }
}

export interface CSIUsersProps {
    id: number
    attributes: {
        username: string
        email: string
        name: string
    }
}

export interface CSIArticleProps {
    id: number
    attributes: {
        title: string
        content: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        read: string
        categories: {
            data: CSICategoriesProps[]
        }
        users_permissions_user: {
            data: CSIUsersProps
        }
    }
}

export interface CSIArticleListProps {
    data: CSIArticleProps[]
}

export interface CSIEachArticleProps {
    data: CSIArticleProps
}

const CSBlogPage: React.FC = () => {
    const [articles, setArticles] = useState<CSIArticleListProps['data']>([]);
    const [popularArticle, setPopularArticle] = useState<CSIArticleListProps['data']>([]);
    const [dotActive, setDotActive] = useState<number>(0);
    const [heroImgUrl, setHeroImgUrl] = useState<string>();
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        let cancel = false;
        const fetchData = async () => {
            const response = await axios.get<CSIArticleListProps>(`${process.env.REACT_APP_BASE_URL}/api/articles?populate=categories,users_permissions_user&&pagination[pageSize]=3`);
            const responseSort = await axios.get<CSIArticleListProps>(`${process.env.REACT_APP_BASE_URL}/api/articles?populate=categories,users_permissions_user&pagination[pageSize]=3&sort[0]=read%3Adesc`);
            if (cancel) return;

            setArticles(response.data.data);
            setPopularArticle(responseSort.data.data)
            setHeroImgUrl(`${process.env.REACT_APP_BASE_URL}/uploads/article_img_77492e10a8.png`);
            setLoading(false);
        }

        fetchData()
        return () => {
            cancel = true
        }
    }, [])

    const handleSlide = (index: number) => {
        const dotList = Object.values(document.getElementsByClassName('dot'));

        if (index === dotActive) return;
        dotList[index].classList.add('active-dot')
        dotList[dotActive].classList.remove('active-dot')
        setDotActive(index);
    }

    return (
        <section title='blog'>
            <div className="container-hero-blog">
                {
                    isLoading
                        ? <Skeleton
                            data-testid='skeleton-hero-img'
                            variant='rectangular'
                            width='100%'
                            height='100%'
                            animation='wave'
                            style={{ position: 'absolute' }}
                        />
                        : <div
                            title='hero-img'
                            style={{ backgroundImage: `url(${heroImgUrl})` }}
                            className='hero-img active-img'
                        ></div>
                }
                <div className="container-slider" title='container-slider'>
                    {
                        isLoading
                            ? <CSHeroSliderSkeleton />
                            : popularArticle.map((el, index) => {
                                return (
                                    <CSHeroSlider
                                        key={index}
                                        id={el.id}
                                        class={index === dotActive ? 'active-blog' : ''}
                                        title={el.attributes.title}
                                        category={el.attributes.categories.data[0].attributes.name}
                                        createdAt={el.attributes.createdAt}
                                        writer={el.attributes.users_permissions_user.data.attributes.name}
                                        content={el.attributes.content}
                                    />
                                )
                            })
                    }

                    <div className="dot-slider">
                        {
                            popularArticle.map((el, index) => {
                                return (
                                    <span
                                        title='dot-sliders'
                                        key={index}
                                        onClick={() => handleSlide(index)}
                                        className={dotActive === index ? 'dot active-dot' : 'dot'}
                                        id={el.attributes.title}
                                    >
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="container-popular-article">
                <div className="header-popular">
                    <Typography variant='h1' sx={{ fontSize: { md: '3rem', xs: '1.5rem' } }}>
                        Popular This Month
                    </Typography>
                </div>
                <Box className="container-card-row" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                    {
                        isLoading
                            ? <>
                                <CSCardPopularSkeleton />
                                <CSCardPopularSkeleton />
                                <CSCardPopularSkeleton />
                            </>
                            : popularArticle.map((el, index) => {
                                return (
                                    <CSCardArticlePopular
                                        key={index}
                                        id={el.id}
                                        title={el.attributes.title}
                                        category={el.attributes.categories.data[0].attributes.name}
                                        createdAt={el.attributes.createdAt}
                                        writer={el.attributes.users_permissions_user.data.attributes.name}
                                    />
                                )
                            })
                    }
                </Box>
            </div>
            <Box className="container-all-article" sx={{ px: '2rem' }}>
                {
                    isLoading
                        ? <>
                            <CSCardArticleSkeleton />
                            <CSCardArticleSkeleton />
                            <CSCardArticleSkeleton />
                        </>
                        : articles.map((el, index) => {
                            return (
                                <CSCardArticle
                                    key={index}
                                    id={el.id}
                                    title={el.attributes.title}
                                    content={el.attributes.content}
                                    category={el.attributes.categories.data[0].attributes.name}
                                    createdAt={el.attributes.createdAt}
                                    writer={el.attributes.users_permissions_user.data.attributes.name}
                                />
                            )
                        })
                }
            </Box>
            <CSEmailSubscribe />
        </section>
    );
};

export default CSBlogPage;