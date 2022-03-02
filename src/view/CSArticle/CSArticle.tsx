import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CSWriterAvatar from '../../assets/icons/CSWriterAvatar';
import DateFormater from '../../func/DateFormater';
import CSEmailSubscribe from '../../component/CSEmailSubscribe';
import CSCommentSection from '../../component/CSCommentSection';
import { CSIArticle, CSIEachArticleResponse } from '../CSBlogPage/CSBlogPage';
import ReactMarkdown from 'react-markdown';

const CSArticle: React.FC = () => {
    const [article, setArticle] = useState<CSIArticle | string>(
        {
            id: -1,
            attributes: {
                title: '',
                content: '',
                createdAt: '',
                updatedAt: '',
                publishedAt: '',
                read: '',
                categories: {
                    data: []
                },
                users_permissions_user: {
                    data: {
                        id: -1,
                        attributes: {
                            email: '',
                            name: '',
                            username: '',
                        }
                    }
                }
            }
        }
    );
    const { id } = useParams();

    useEffect(() => {
        let bCancel = false
        const fetchData = async () => {
            const response = await axios.get<CSIEachArticleResponse>(`${process.env.REACT_APP_BASE_URL}/api/articles/${id}?populate=categories,users_permissions_user`)
            return response;

        }

        fetchData()
            .then(resp => {
                if (bCancel || !resp) return;
                setArticle(resp.data.data)
            })
            .catch(err => {
                setArticle(err.response.statusText)
            })

        return () => {
            bCancel = true
        }
    }, [id])

    if (typeof article !== 'object') {
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
                <Typography
                    variant='body1'
                    sx={{ textAlign: 'center' }}
                >
                    Can not load data!
                </Typography>
                <Typography
                    variant='body1'
                    sx={{ textAlign: 'center' }}
                >
                    {article}
                </Typography>
            </Box>
        )
    } else {
        return (
            <>
                <Box
                    className='article-img mt-nav'
                    sx={{
                        backgroundImage: `url('${process.env.REACT_APP_BASE_URL}/uploads/article_img_77492e10a8.png')`,
                        height: { xs: '10%', sm: '20%', md: '35%' },
                        minHeight: '318px',
                    }}
                >

                </Box>
                <Container
                    maxWidth='lg'
                    title='article'
                    className='container-article mt-nav'
                    sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
                >
                    <Box
                        className='header-article'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            mb: { xs: '16px', md: '60px' },
                            mt: { xs: '70px', md: '180px' },
                        }}
                    >
                        <Typography
                            variant='h1'
                            title='article-title'
                            sx={{
                                mb: { xs: '8px', md: '24px' },
                                fontSize: { xs: '35px', md: '60px' },
                                fontWeight: '900',
                                color: '#413D3D'
                            }}
                        >
                            {article?.attributes.title}
                        </Typography>
                        <Typography
                            variant='body1'
                            sx={{
                                fontSize: { xs: '12px', md: '24px', fontWeight: '700' },
                            }}
                            className='bold-yellow'
                        >
                            {article?.attributes.categories.data[0]?.attributes.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: '8px', md: '24px' } }}>
                            <CSWriterAvatar />
                            <Typography
                                variant='body1'
                                sx={{
                                    m: 0,
                                    ml: '12px',
                                    fontSize: { xs: '12px', md: '24px' },
                                }}
                            >
                                <strong>{article?.attributes.users_permissions_user.data.attributes.name}</strong> on {DateFormater(article?.attributes.createdAt)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="body-article" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                        <Box sx={{ flexBasis: '70%' }} title='article-body'>
                            <ReactMarkdown
                                components={{
                                    img: ({ src }) => {
                                        const source = `${process.env.REACT_APP_BASE_URL}${src}`
                                        return (
                                            <img
                                                src={`${source}`}
                                                alt='adsasd'
                                                title='article-img'
                                                className='image-content-article'
                                            />
                                        )
                                    }
                                }}
                            >{article.attributes.content}</ReactMarkdown>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexBasis: '30%' }}>
                            ads here
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', sm: '70%', md: '50%' }, mb: '64px' }}>
                        <Typography
                            variant='body1'
                            sx={{ fontSize: '16px', fontWeight: '600', color: '#5C5454', mb: '24px' }}
                        >
                            Comment
                        </Typography>
                        <CSCommentSection />
                        <form action="">
                            <TextField
                                label="Your Message"
                                variant="outlined"
                                multiline
                                rows={3}
                                sx={{ mb: '32px', width: '100%' }}
                            />
                            <TextField
                                label="Your Email"
                                variant="outlined"
                                sx={{ mb: '32px', width: '100%' }}
                            />
                            <Button variant='contained' type='submit' sx={{ backgroundColor: '#FFAB00' }}>Submit</Button>
                        </form>
                    </Box>
                </Container>
                <CSEmailSubscribe />
            </>
        );
    }
};

export default CSArticle;
