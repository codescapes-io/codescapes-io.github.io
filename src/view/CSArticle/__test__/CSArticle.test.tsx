import React from 'react';
import CSArticle from '../CSArticle';
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import { HashRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

afterEach(cleanup);

const fakeData = {
    data: {
        data: {
            id: 1,
            attributes: {
                title: "halo",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                createdAt: "2022-01-18T12:45:25.876Z",
                updatedAt: "2022-01-26T03:15:16.236Z",
                publishedAt: "2022-01-18T12:45:28.635Z",
                read: "25",
                categories: {
                    data: [
                        {
                            id: 2,
                            attributes: {
                                createdAt: "2022-01-26T02:43:16.073Z",
                                updatedAt: "2022-01-26T07:04:35.245Z",
                                publishedAt: "2022-01-26T02:47:17.245Z",
                                name: "Mobile Development"
                            }
                        }
                    ]
                },
                users_permissions_user: {
                    data: {
                        id: 1,
                        attributes: {
                            username: "michael",
                            email: "michaeljd@email.com",
                            provider: "local",
                            confirmed: true,
                            blocked: false,
                            createdAt: "2022-01-26T07:09:14.308Z",
                            updatedAt: "2022-01-26T07:09:14.308Z",
                            name: "Michael Junior"
                        }
                    }
                }
            }
        }
    }
}

const mockArticlePage = () => {
    return <HashRouter>
        <CSArticle />
    </HashRouter>
}

describe('Unit test article page', () => {
    it('render without crashing', () => {
        render(mockArticlePage())
        const articlePage = screen.getByTitle('article');
        expect(articlePage).toBeTruthy();
    })

    it('calls article data from strapi', async () => {
        // mock axios
        mockAxios.get.mockImplementation(() => Promise.resolve(fakeData));
        render(mockArticlePage())

        const articleTitle = screen.getByTitle('article-title');
        await waitFor(() => expect(articleTitle).toHaveTextContent(fakeData.data.data.attributes.title))

    })
})