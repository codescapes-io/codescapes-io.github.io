import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';
import DateFormater from '../func/DateFormater';
import CSEmailSubscribe from '../component/CSEmailSubscribe';
import CSCommentSection from '../component/CSCommentSection';

export interface CSArticleProps {
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
}

const CSArticle: React.FC = () => {
    const [article, setArticle] = useState<CSArticleProps>();
    const { id } = useParams();
    const [contentArticle, setContentArticle] = useState(['']);

    useEffect(() => {
        let cancel = false
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/articles/${id}?populate=categories,users_permissions_user`)
            if (cancel) return;
            setArticle(response.data.data)
            setContentArticle(response.data.data.attributes.content.split('\n').filter((item: string) => item.length));

        }

        fetchData();

        return () => {
            cancel = true
        }
    }, [id])

    return (
        <>
            <Box
                className='article-img'
                sx={{
                    backgroundImage: `url('${process.env.REACT_APP_BASE_URL}/uploads/article_img_77492e10a8.png')`,
                    height: { xs: '10%', sm: '20%', md: '35%' },
                    minHeight: '318px',
                }}
            >

            </Box>
            <Container maxWidth='lg' className='container-article' sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
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
                        {article?.attributes.categories.data[0].attributes.name}
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
                    <Box sx={{ flexBasis: '70%' }}>
                        {
                            contentArticle.map(
                                (el, index) => {
                                    if (el[0] === '!' && el[1] === '[') {
                                        let separator = 0;
                                        for (let i = 0; i < el.length; i++) {
                                            if (el[i] === ']' && el[i + 1] === '(' && el[el.length - 1] === ')') {
                                                separator = i;
                                            }
                                        }
                                        let alt = el.slice(2, separator);
                                        let src = el.slice(separator + 2, el.length - 1);

                                        return (
                                            <img
                                                src={`${process.env.REACT_APP_BASE_URL + src}`}
                                                alt={alt}
                                                key={index}
                                                className='image-content-article'
                                            />
                                        )
                                    }
                                    return (<p className='text-article' key={index}>{el}</p>);
                                }
                            )
                        }
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
};

export default CSArticle;
