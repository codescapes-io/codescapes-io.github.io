import React, { useCallback, useEffect, useState } from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { Collapse, Container, Drawer, Fab, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';
import axios from 'axios';

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
    nDocViewId: number
    childs: Map<string, CSIFormatPath>
}

const CSDocsPage = () => {
    const [bDrawerOpen, setDrawerOpen] = useState(false);
    const [bError, setError] = useState(false);
    const [docList, setDocList] = useState<CSIDocPath[]>([]);
    const [linkList, setLinkList] = useState<Map<string, CSIFormatPath>>(new Map())
    const [nLink, setLink] = useState<number | null>(0);
    const sidebarWidth = 350;

    const handleSidebar = () => { setDrawerOpen(!bDrawerOpen) }
    const handleClickLink = () => { setDrawerOpen(false) }
    const handleLink = (num: number) => { num === nLink ? setLink(null) : setLink(num) }

    const constructNav = useCallback(() => {
        const constructNavRecurs = (strPath: string, maps: Map<string, CSIFormatPath>, nId: number) => {
            const splittedPaths = strPath.split('/');

            const strParentKey = splittedPaths[0]
            const strChildKey = splittedPaths[1]

            let parent: CSIFormatPath | undefined = {
                nDocViewId: nId,
                childs: new Map<string, CSIFormatPath>()
            }
            let newChild: CSIFormatPath | undefined = {
                nDocViewId: 1,
                childs: new Map<string, CSIFormatPath>()
            }

            if (splittedPaths.length === 1) {
                const strKey = splittedPaths[0];
                const value = {
                    nDocViewId: nId,
                    childs: new Map()
                }
                if (!maps.has(strKey)) {
                    maps.set(strKey, value)
                }
            } else {
                if (maps.has(strParentKey)) {
                    parent = maps.get(strParentKey);
                    if (!parent) return;
                    let nDocViewId = parent.childs.get(strChildKey)?.nDocViewId ?? nId
                    newChild.nDocViewId = nDocViewId
                    parent.childs.set(strChildKey, newChild)
                }

                maps.set(strParentKey, parent)
                splittedPaths.splice(0, 1)
                constructNavRecurs(splittedPaths.join('/'), parent.childs, parent.nDocViewId)
            }
        }

        const setLinks = (listMaps: CSIDocPath[]) => {
            const paths = new Map()
            listMaps.map(el => constructNavRecurs(el.attributes.path, paths, el.attributes.doc_view?.data.id ?? el.id))
            return paths;
        }
        return setLinks(docList)
    }, [docList])

    const linkComponent = (maps: Map<string, CSIFormatPath>) => {
        let elementList: JSX.Element[] = [];
        maps.forEach((value, strKey) => {
            if (value.childs.size < 1) {
                elementList.push(
                    <ListItem id={`${value.nDocViewId}`} itemID={`${value.nDocViewId}`} key={value.nDocViewId}>
                        <NavLink
                            className='side-nav'
                            title='doc-link'
                            to={`/docs/${value.nDocViewId}`}
                            onClick={handleClickLink}
                        >
                            {strKey}
                        </NavLink>
                    </ListItem>
                )
            } else {
                elementList.push(
                    <Box key={value.nDocViewId}>
                        <ListItem id={`${value.nDocViewId}`} itemID={`${value.nDocViewId}`} sx={{ justifyContent: 'space-between' }}>
                            <NavLink
                                className='side-nav'
                                title='doc-link'
                                to={`/docs/${value.nDocViewId}`}
                                onClick={handleClickLink}
                                end
                            >
                                {strKey}
                            </NavLink>
                            {nLink === value.nDocViewId ? <Box title='arrow-btn' onClick={() => handleLink(value.nDocViewId)}><ExpandLess /></Box> : <Box title='arrow-btn' onClick={() => handleLink(value.nDocViewId)}><ExpandMore /></Box>}
                        </ListItem>
                        <Collapse in={nLink === value.nDocViewId} timeout="auto" title='side-collapse' unmountOnExit>
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
        const fetchData = async () => {
            const resPath = await axios.get<CSIDocPathListResponse>(`${process.env.REACT_APP_BASE_URL}/api/doc-paths?populate[doc_view][fields][0]=id`)
            return resPath;
        }
        fetchData()
            .then(paths => {
                if (cancel || !paths) return;
                setError(false);
                setDocList(paths.data.data);
            })
            .catch(err => {
                console.log(err);
                setError(true);
            })
        return () => {
            cancel = true;
        }
    }, []);

    useEffect(() => {
        setLinkList(constructNav())
    }, [docList, constructNav])

    if (bError) return (
        <Container title='docs-blank' maxWidth='xl' sx={{ display: 'flex', height: '100vh', flexDirection: 'column', marginTop: '101px' }}>
            <Typography variant='body1' sx={{ textAlign: 'center' }}>Can not load data!</Typography>
        </Container>

    )

    if (docList.length < 1) {
        return (
            <Container title='docs-blank' maxWidth='xl' sx={{ display: 'flex', height: '100vh', borderTop: '3px solid #424242', pl: { md: '0' } }}>
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
                        height: '100vh',
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