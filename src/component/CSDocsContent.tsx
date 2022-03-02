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
        tableContent: string
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
    const [strError, setError] = useState<string>('');
    const { pathname, hash } = useLocation();
    let { id } = useParams();

    useEffect(() => {
        let bCancel = false;
        const fetchData = async () => {
            const resp = await axios.get<CSIDocViewResponse>(`${process.env.REACT_APP_BASE_URL}/api/doc-views/${id}`)
            return resp
        }

        fetchData()
            .then(resp => {
                if (bCancel || !resp) return;
                setDocView(resp.data.data);
                setError('')
            })
            .catch(err => {
                setError(err.response.statusText);
            })
        return () => {
            bCancel = true;
        }
    }, [id])

    useEffect(() => {
        if (!hash) {
            window.scroll(0, 0)
        } else {
            const id = hash.replace('#', '')
            const element = document.getElementById(id)
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }

    }, [hash, pathname])

    const generateSlug = (vars: React.ReactNode & React.ReactNode[]) => {
        return vars.toString().replace(' ', '-').toLowerCase()
    }

    const strTitle = docView ? docView.attributes.title : ''

    if (strError) return (
        <Box sx={{ display: 'flex', height: '100vh', width: '100%', flexDirection: 'column', alignItems: 'center', marginTop: '101px' }}>
            <Typography variant='body1' sx={{ textAlign: 'center' }}>Can not load data!</Typography>
            <Typography variant='body1' sx={{ textAlign: 'center' }}>{strError}</Typography>
        </Box>

    )
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

            <Typography variant='h5' fontWeight={600} sx={{ my: '36px' }}>{strTitle}</Typography>
            <Box className='table-content'>
                <Typography variant='body1'>Table of contents</Typography>
                <ReactMarkdown
                    className='docs-link-list'
                    components={{
                        a: ({ children, href }) => {
                            return (<a href={`#${pathname + href}`}>{children}</a>)
                        }
                    }}
                >
                    {docView?.attributes.tableContent ?? ''}
                </ReactMarkdown>
            </Box>
            <ReactMarkdown
                className='md-content'
                components={{
                    h1: ({ children }) => {
                        const slug = generateSlug(children)
                        return (<h1 id={slug}>{children}</h1>)
                    },
                    h2: ({ children }) => {
                        const slug = generateSlug(children)
                        return (<h2 id={slug}>{children}</h2>)
                    },
                    h3: ({ children }) => {
                        const slug = generateSlug(children)
                        return (<h3 id={slug}>{children}</h3>)
                    },
                    h4: ({ children }) => {
                        const slug = generateSlug(children)
                        return (<h4 id={slug}>{children}</h4>)
                    },
                    h5: ({ children }) => {
                        const slug = generateSlug(children)
                        return (<h5 id={slug}>{children}</h5>)
                    },
                    h6: ({ children }) => {
                        const slug = generateSlug(children)
                        return (<h6 id={slug}>{children}</h6>)
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