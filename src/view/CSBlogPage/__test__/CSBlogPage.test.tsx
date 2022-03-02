import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import CSBlogPage from '../CSBlogPage';
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
                    title: 'halo',
                    content: 'halo',
                    createdAt: '2022-01-26T02:42:25.196Z',
                    read: '25',
                    categories: {
                        data: [
                            {
                                id: 1,
                                attributes: {
                                    name: 'Mobile Dev'
                                }
                            }
                        ]
                    },
                    users_permissions_user: {
                        data: {
                            id: 1,
                            attributes: {
                                username: 'michael',
                                name: 'Michael Junior'
                            }
                        }
                    }
                }
            },
            {
                id: 2,
                attributes: {
                    title: 'halo',
                    content: 'halo',
                    createdAt: '2022-01-26T02:42:25.196Z',
                    read: '15',
                    categories: {
                        data: [
                            {
                                id: 1,
                                attributes: {
                                    name: 'Mobile Dev'
                                }
                            }
                        ]
                    },
                    users_permissions_user: {
                        data: {
                            id: 1,
                            attributes: {
                                username: 'michael',
                                name: 'Michael Junior'
                            }
                        }
                    }
                }
            }
        ]
    }
};

const mockBlogPage = () => {
    return (
        <HashRouter>
            <CSBlogPage />
        </HashRouter>
    );
};

describe('unit test BlogPage', () => {
    it('render BlogPage without crashing', () => {
        render(mockBlogPage());
        const blogPage = screen.getByTitle('blog');
        expect(blogPage).toBeTruthy();
        cleanup();
    });

    describe('render skeleton', () => {
        it('render loading skeleton while loading', () => {
            render(mockBlogPage());
            const skeletonHeroImg = screen.getByTestId('skeleton-hero-img');
            const skeletonCardPopular = screen.getAllByTitle('skeleton-card-popular');
            const skeletonArticleCard = screen.getAllByTitle('skeleton-article-card');
            const skeletonHeroSlider = screen.getByTitle('skeleton-hero-slider');
            expect(skeletonHeroImg).toBeInTheDocument();
            expect(skeletonArticleCard).toHaveLength(3);
            expect(skeletonCardPopular).toHaveLength(3);
            expect(skeletonHeroSlider).toBeInTheDocument();
            cleanup();
        });
    });

    describe('calls API', () => {
        it('render hero img', async () => {
            mockAxios.get.mockImplementation(() => Promise.resolve(fakeData));
            render(mockBlogPage());
            const heroImg = await screen.findByTitle('hero-img');
            expect(heroImg).toHaveAttribute(
                'style',
                'background-image: url(https://api.codescapes.io/uploads/article_img_77492e10a8.png);'
            );
            cleanup();
        });

        it('render hero slider components', async () => {
            mockAxios.get.mockImplementation(() => Promise.resolve(fakeData));
            render(mockBlogPage());

            const slider = await screen.findAllByTitle('hero-slider');

            expect(slider).toHaveLength(fakeData.data.data.length);
            cleanup();
        });
    });

    it('click dot to slide hero', async () => {
        mockAxios.get.mockImplementation(() => Promise.resolve(fakeData));
        render(mockBlogPage());

        const slider = await screen.findAllByTitle('hero-slider');
        const dotSlider = await screen.findAllByTitle('dot-sliders');

        fireEvent.click(dotSlider[0]);
        expect(slider[0]).toHaveClass('active-blog');
        fireEvent.click(dotSlider[0]);
        expect(slider[0]).toHaveClass('active-blog');
        cleanup();
    });
});
