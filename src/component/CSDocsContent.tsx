import React, { useEffect, useState } from 'react'
import { Button, IconButton, InputBase, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ThumbUpOffAltRounded, ThumbDownAltRounded } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import CSFooter from './CSFooter';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export interface CSIDocView {
    id: number
    attributes: {
        title: string
        content: string
        table_content: string
        createdAt: string
        updatedAt: string
        publishedAt: string
    }
}

export interface CSIDocViewResponse {
    data: CSIDocView
}


const CSDocsContent = () => {
    const [docView, setDocView] = useState<CSIDocView>()
    const { pathname, hash } = useLocation();

    let { id } = useParams()

    useEffect(() => {
        let cancel = false;
        const fetchData = async () => {
            const resPath = await axios.get<CSIDocViewResponse>(`${process.env.REACT_APP_BASE_URL}/api/doc-views/${id}`).catch(err => {
                if (err.response.status === 404) {
                    throw new Error(`${err.config.url} not found`);
                }
                throw err;
            })
            if (cancel || !resPath) return;
            setDocView(resPath.data.data);
        }

        fetchData()
        return () => {
            cancel = true;
        }
    }, [id])

    useEffect(() => {
        if (hash === '') {
            window.scroll(0, 0)
        } else {
            setTimeout(() => {
                const id = hash.replace('#', '')
                const element = document.getElementById(id)
                console.log(element);
                if (element) {
                    element.scrollIntoView();
                }
            }, 0)
        }

    }, [hash, pathname])

    const title = docView ? docView.attributes.title : ''
    const contentList = docView ? docView?.attributes.content.split('####') : []
    contentList.splice(0, 1)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', px: { xs: 0, md: '55px' } }}>
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '668px',
                    boxShadow: '0',
                    borderBottom: '3px solid #272827',
                    borderRadius: '0',
                    mt: '24px',
                    px: '0'
                }}
            >
                <IconButton type="submit" sx={{ p: '0', color: '#272827' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search docs"
                    inputProps={{ 'aria-label': 'search docs' }}
                />
            </Paper>

            <Typography variant='h5' fontWeight={600} sx={{ my: '36px' }}>{title}</Typography>
            <Box className='table-content'>
                <Typography variant='body1'>Table of contents</Typography>
                <ReactMarkdown className='docs-link-list'>{docView?.attributes.table_content ?? ''}</ReactMarkdown>
            </Box>
            <ReactMarkdown
                className='md-content'
                components={{
                    h4({ children }) {
                        const childs = React.Children.toArray(children)
                        const slug = childs[0].toString().replace(' ', '-').toLowerCase()
                        return (<h4 id={slug}>{children}</h4>)
                    }

                }}
            >
                {docView ? docView?.attributes.content : ''}
            </ReactMarkdown>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                background: '#E9E9E9',
                border: '1px solid #C6C6C6',
                borderRadius: '4px',
                p: '16px 36px',
                color: '#6B6B6B',
                mb: '31px',

            }}>
                <Typography variant='body1' fontWeight={700} sx={{ mr: '9px', fontSize: { xs: '12px', md: '1rem' } }}>
                    Was this page helpful?
                </Typography>
                <ThumbUpOffAltRounded sx={{ mr: '9px' }} />
                <ThumbDownAltRounded sx={{ mr: '9px' }} />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                background: '#D5EBEC',
                border: '1px solid #78BBBD',
                borderRadius: '4px',
                p: '21px 36px',
                color: '#6B6B6B',
                mb: '31px'

            }}>
                <Typography variant='body1' fontWeight={700} sx={{ mr: '9px' }}>
                    Stay up to date with product & security news
                </Typography>
                <form action="" className='subscribe-docs'>
                    <input type="email" placeholder='Your Email Address' />
                    <Button
                        variant='contained'
                        sx={{
                            background: '#78BBBD',
                            color: 'white',
                            mt: '12px',
                            fontSize: { xs: '12px', md: '16px' }
                        }}>
                        Subscribe
                    </Button>
                </form>
            </Box>
            <CSFooter />
        </Box >
    )
}

export default CSDocsContent