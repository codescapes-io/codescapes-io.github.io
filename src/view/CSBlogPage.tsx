import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CSCardArticle from '../component/CSCardArticle';
import CSCardArticlePopular from '../component/CSCardArtcilePopular';
import CSEmailSubscribe from '../component/CSEmailSubscribe';
import CSHeroSlider from '../component/CSHeroSlider';
import { Skeleton } from '@mui/material';
import CSHeroSliderSkeleton from '../component/skeleton/CSHeroSliderSkeleton';
import CSCardPopularSkeleton from '../component/skeleton/CSCardPopularSkeleton';
import CSCardArticleSkeleton from '../component/skeleton/CSCardArticleSkeleton';

export interface BlogProps {
    articleList: {
        id: number
        attributes: {
            title: string
            content: string
            createdAt: string
            updatedAt: string
            publishedAt: string
            read: string
            categories: {
                data: {
                    id: number
                    attributes: {
                        name: string
                    }
                }[]
            }
            users_permissions_user: {
                data: {
                    id: number
                    attributes: {
                        username: string
                        email: string
                        name: string
                    }
                }
            }
        }
    }[]
}

const CSBlogPage: React.FC = () => {
    const [articles, setArticles] = useState<BlogProps['articleList']>([]);
    const [popularArticle, setPopularArticle] = useState<BlogProps['articleList']>([]);
    const [dotActive, setDotActive] = useState<number>(0);
    const [heroImgUrl, setHeroImgUrl] = useState<string>();
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        let cancel = false;
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/articles?populate=categories,users_permissions_user&&pagination[pageSize]=3`);
            const responseSort = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/articles?populate=categories,users_permissions_user&pagination[pageSize]=3&sort[0]=read%3Adesc`);
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
        <section>
            <div className="container-hero-blog">
                {
                    isLoading
                        ? <Skeleton
                            variant='rectangular'
                            width='100%'
                            height='100%'
                            animation='wave'
                            style={{ position: 'absolute' }}
                        />
                        : <img
                            src={heroImgUrl}
                            alt='hero-slider'
                            className='hero-img active-img'
                        />
                }
                <div className="container-slider">
                    {
                        isLoading
                            ? <CSHeroSliderSkeleton />
                            : popularArticle.map((el, index) => {
                                return (
                                    <CSHeroSlider
                                        key={index}
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
                    <h1>Popular This Month</h1>
                    <p>created on 27 Mei 2021</p>
                </div>
                <div className="container-card-row">
                    {
                        popularArticle.map((el, index) => {
                            return (
                                isLoading
                                    ? <CSCardPopularSkeleton />
                                    : <CSCardArticlePopular
                                        key={index}
                                        title={el.attributes.title}
                                        category={el.attributes.categories.data[0].attributes.name}
                                        createdAt={el.attributes.createdAt}
                                        writer={el.attributes.users_permissions_user.data.attributes.name}
                                    />
                            )
                        })
                    }
                </div>
            </div>
            <div className="container-all-article">
                {
                    articles.map((el, index) => {
                        return (
                            isLoading
                                ? <CSCardArticleSkeleton />
                                : <CSCardArticle
                                    key={index}
                                    title={el.attributes.title}
                                    content={el.attributes.content}
                                    category={el.attributes.categories.data[0].attributes.name}
                                    createdAt={el.attributes.createdAt}
                                    writer={el.attributes.users_permissions_user.data.attributes.name}
                                />
                        )
                    })
                }
            </div>
            <CSEmailSubscribe />
        </section>
    );
};

export default CSBlogPage;
