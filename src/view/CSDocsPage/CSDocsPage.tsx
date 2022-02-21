import React, { useCallback, useEffect, useState } from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { Collapse, Container, Drawer, Fab, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';
import axios from 'axios';

export interface CSIDocs {
    id: number
    attributes: {
        title: string
        documentation: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        docs_children: {
            data: CSIDocsChild[] | []
        }
    }
}

export interface CSIDocsChild {
    id: number
    attributes: {
        title: string
        documentation: string
        createdAt: string
        updatedAt: string
        publishedAt: string
    }
}

export interface CSIDocsResponse {
    data: CSIDocs[]
}

export interface CSIDocPath {
    id: number
    attributes: {
        path: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        doc_view?: {
            data: {
                id: number,
            }
        }
    }
}

export interface CSIDocPathListResponse {
    data: CSIDocPath[]
}

export interface CSIDocPathResponse {
    data: CSIDocPath
}

interface CSIFormatPath {
    doc_view: number
    childs: Map<string, CSIFormatPath>
}

const CSDocsPage = () => {
    const [bDrawerOpen, setDrawerOpen] = useState(false);
    const [docList, setDocList] = useState<CSIDocPath[]>([]);
    const [linkList, setLinkList] = useState<Map<string, CSIFormatPath>>(new Map())
    const [nLink, setLink] = useState<number | null>(0);
    const sidebarWidth = 350;

    const handleSidebar = () => { setDrawerOpen(!bDrawerOpen) }
    const handleClickLink = () => { setDrawerOpen(false) }
    const handleLink = (num: number) => { num === nLink ? setLink(null) : setLink(num) }

    const recurs = useCallback((path: string, maps: Map<string, CSIFormatPath>, id: number) => {
        const splittedpaths = path.split('/');

        const strParentKey = splittedpaths[0]
        const strChildKey = splittedpaths[1]

        let parent: CSIFormatPath | undefined = {
            doc_view: id,
            childs: new Map<string, CSIFormatPath>()
        }
        let newChild: CSIFormatPath | undefined = {
            doc_view: 1,
            childs: new Map<string, CSIFormatPath>()
        }

        if (splittedpaths.length === 1) {
            const key = splittedpaths[0];
            if (!maps.has(key)) {
                maps.set(key, {
                    doc_view: id,
                    childs: new Map()
                })
            }
        }
        else {

            if (maps.has(strParentKey)) {
                parent = maps.get(strParentKey);
                if (!parent) return;
                let view_id = parent.childs.get(strChildKey)?.doc_view ?? id
                newChild.doc_view = view_id
                parent.childs.set(strChildKey, newChild)
            }

            maps.set(strParentKey, parent)
            splittedpaths.splice(0, 1)
            recurs(splittedpaths.join('/'), parent.childs, parent.doc_view)
        }
    }, [])

    const linkComponent = (maps: Map<string, CSIFormatPath>) => {
        let elementList: JSX.Element[] = [];
        maps.forEach((value, key) => {
            if (value.childs.size < 1) {
                elementList.push(
                    <ListItem id={`${value.doc_view}`} itemID={`${value.doc_view}`} key={value.doc_view}>
                        <NavLink
                            className='side-nav'
                            title='doc-link'
                            to={`/docs/${value.doc_view}`}
                            onClick={handleClickLink}
                        >
                            {key}
                        </NavLink>
                    </ListItem>
                )
            } else {
                elementList.push(
                    <Box key={value.doc_view}>
                        <ListItem id={`${value.doc_view}`} itemID={`${value.doc_view}`} sx={{ justifyContent: 'space-between' }}>
                            <NavLink
                                className='side-nav'
                                title='doc-link'
                                to={`/docs/${value.doc_view}`}
                                onClick={handleClickLink}
                                end
                            >
                                {key}
                            </NavLink>
                            {nLink === value.doc_view ? <Box title='arrow-btn' onClick={() => handleLink(value.doc_view)}><ExpandLess /></Box> : <Box title='arrow-btn' onClick={() => handleLink(value.doc_view)}><ExpandMore /></Box>}
                        </ListItem>
                        <Collapse in={nLink === value.doc_view} timeout="auto" title='side-collapse' unmountOnExit>
                            <List disablePadding>
                                {linkComponent(value.childs)}
                            </List>
                        </Collapse>
                    </Box>
                )
            }
        })
        return elementList
    }

    const drawer = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexBasis: '30%',
                    flexDirection: 'column',
                    backgroundColor: '#272827',
                    color: 'white',
                    p: '16px 32px',
                }}
            >
                <Typography variant='body1' sx={{ fontWeight: '800' }}>Nambahi GraphQL Engine</Typography>
                <List>
                    {/* Loop to render doc list */}
                    {linkComponent(linkList)}
                </List>
            </Box>
        )
    }

    useEffect(() => {
        let cancel = false;
        let paths = new Map<string, CSIFormatPath>()
        const fetchData = async () => {
            const resPath = await axios.get<CSIDocPathListResponse>(`${process.env.REACT_APP_BASE_URL}/api/doc-paths?populate[doc_view][fields][0]=id`)
            if (cancel || !resPath) return;
            setDocList(resPath.data.data);

            resPath.data.data.map(el => recurs(el.attributes.path, paths, el.attributes.doc_view?.data.id ?? el.id))
            setLinkList(paths)

        }
        fetchData();
        return () => {
            cancel = true;
        }
    }, [recurs]);


    if (docList.length < 1) {
        return (
            <Container title='docs-blank' maxWidth='xl' sx={{ display: 'flex', height: '100vh', borderTop: '3px solid #424242', pl: { md: '0' } }}>
                {/* side */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        flexBasis: '30%',
                        flexDirection: 'column',
                        backgroundColor: '#272827',
                        color: 'white',
                        p: '16px 32px',
                    }}
                >
                    <Typography variant='body1' sx={{ fontWeight: '800' }}>Nambahi GraphQL Engine</Typography>
                    <List>
                    </List>

                </Box>

                {/* main */}
                <Box
                    sx={{
                        display: 'flex',
                        flexBasis: { xs: '100%', md: '70%' },
                    }}
                >
                </Box>
            </Container>
        )
    }

    return (
        <Container title='docs' maxWidth='xl' sx={{ display: 'flex', pl: { md: '0' }, marginTop: '101px' }}>
            {/* side */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    position: 'fixed',
                    flexBasis: '30%',
                    boxSizing: 'border-box',
                    width: `${sidebarWidth}px`,
                    flexDirection: 'column',
                    backgroundColor: '#272827',
                    color: 'white',
                    p: '16px 32px',
                    height: '100vh'
                }}
            >
                <Typography variant='body1' sx={{ fontWeight: '800' }}>Nambahi GraphQL Engine</Typography>
                <List>
                    {/* Loop to render doc list */}
                    {linkComponent(linkList)}
                </List>
            </Box>

            {/* main */}
            <Box
                sx={{
                    display: 'flex',
                    marginLeft: { xs: 0, md: `${sidebarWidth}px` },
                    flexBasis: { xs: '100%', md: '70%' },
                }}
            >
                <Outlet />

            </Box>
            <Drawer
                title='side-drawer'
                anchor='left'
                variant='temporary'
                sx={{ display: 'block', top: '94px' }}
                open={bDrawerOpen}
                onClose={handleSidebar}
                PaperProps={{
                    sx: {
                        background: '#272827'
                    }
                }}
            >
                {drawer()}
            </Drawer>
            <Fab
                onClick={handleSidebar}
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    zIndex: 10000
                }}
            >
                <TouchAppRoundedIcon />
            </Fab>
        </Container>
    )
}

export default CSDocsPage