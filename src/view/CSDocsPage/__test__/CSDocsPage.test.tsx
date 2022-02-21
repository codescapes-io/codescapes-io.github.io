import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import CSDocsPage from '../CSDocsPage';
import { HashRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const fakeData = {
    data: {
        data: [
            {
                id: 1,
                attributes: {
                    path: "yuk mulai",
                    createdAt: "2022-02-15T03:40:22.258Z",
                    updatedAt: "2022-02-15T03:42:14.277Z",
                    publishedAt: "2022-02-15T03:42:14.275Z",
                    doc_view: {
                        data: {
                            id: 3,
                            attributes: {}
                        }
                    }
                }
            },
            {
                id: 2,
                attributes: {
                    path: "yuk mulai/Docker quickstart",
                    createdAt: "2022-02-15T03:40:47.180Z",
                    updatedAt: "2022-02-15T03:42:51.028Z",
                    publishedAt: "2022-02-15T03:42:51.008Z",
                    doc_view: {
                        data: {
                            id: 1,
                            attributes: {}
                        }
                    }
                }
            },
            {
                id: 3,
                attributes: {
                    path: "yuk mulai/Using an existing database",
                    createdAt: "2022-02-15T03:40:53.955Z",
                    updatedAt: "2022-02-15T03:42:53.940Z",
                    publishedAt: "2022-02-15T03:42:53.935Z",
                    doc_view: {
                        data: {
                            id: 2,
                            attributes: {}
                        }
                    }
                }
            },
            {
                id: 4,
                attributes: {
                    path: "Database",
                    createdAt: "2022-02-17T05:38:37.526Z",
                    updatedAt: "2022-02-17T05:38:39.525Z",
                    publishedAt: "2022-02-17T05:38:39.523Z",
                    doc_view: {
                        data: {
                            id: 4,
                            attributes: {}
                        }
                    }
                }
            },
            {
                id: 5,
                attributes: {
                    path: "Actions",
                    createdAt: "2022-02-17T15:17:53.368Z",
                    updatedAt: "2022-02-17T15:19:11.482Z",
                    publishedAt: "2022-02-17T15:19:11.480Z",
                    doc_view: {
                        data: {
                            id: 5,
                            attributes: {}
                        }
                    }
                }
            },
            {
                id: 6,
                attributes: {
                    path: "Database/Migration",
                    createdAt: "2022-02-17T15:18:25.833Z",
                    updatedAt: "2022-02-17T15:19:15.154Z",
                    publishedAt: "2022-02-17T15:19:15.153Z",
                    doc_view: {
                        data: {
                            id: 6,
                            attributes: {}
                        }
                    }
                }
            }
        ],
    }
}

const mockDocsPage = () => {
    return <HashRouter>
        <CSDocsPage />
    </HashRouter>
}

describe('Docs Page unit test', () => {
    it('render when data is ready', async () => {
        mockAxios.get.mockImplementation(() => Promise.resolve(fakeData));
        render(mockDocsPage());
        const docsPage = await screen.findByTitle('docs')
        expect(docsPage).toBeTruthy();
        cleanup();
    })

    it('render when data isnt ready', async () => {
        render(mockDocsPage());
        const docsPage = await screen.findByTitle('docs-blank')
        expect(docsPage).toBeTruthy();
        cleanup();
    })

    it('render all documentation list', async () => {
        mockAxios.get.mockImplementation(() => Promise.resolve(fakeData));
        render(mockDocsPage());
        const docsLinks = await screen.findAllByTitle('doc-link')
        expect(docsLinks).toHaveLength(3);
    })

    it('open child link when click arrow button', async () => {
        mockAxios.get.mockImplementation(() => Promise.resolve(fakeData));
        render(mockDocsPage());
        const arrowBtn = await screen.findAllByTitle('arrow-btn')
        fireEvent.click(arrowBtn[0]);

        const sideCollapse = await screen.findByTitle('side-collapse')
        const docsLinks = await screen.findAllByTitle('doc-link')
        expect(sideCollapse).toBeInTheDocument();
        expect(docsLinks).toHaveLength(5);
    })
})