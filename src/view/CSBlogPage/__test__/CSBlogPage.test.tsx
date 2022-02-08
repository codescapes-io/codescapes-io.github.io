import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import CSBlogPage from '../CSBlogPage';
import { HashRouter } from 'react-router-dom';

const mockBlogPage = () => {
    return <HashRouter>
        <CSBlogPage />
    </HashRouter>
}

describe('unit test BlogPage', () => {
    it('render BlogPage without crashing', () => {
        render(mockBlogPage());
        const blogPage = screen.getByTitle('blog');
        expect(blogPage).toBeTruthy();
        cleanup();
    })

    describe('render skeleton', () => {
        it('render hero img loading skeleton', () => {
            render(mockBlogPage());
            const skeletonHeroImg = screen.getByTestId('skeleton-hero-img')
            const skeletonCardPopular = screen.getAllByTitle('skeleton-card-popular')
            const skeletonArticleCard = screen.getAllByTitle('skeleton-article-card')
            const skeletonHeroSlider = screen.getByTitle('skeleton-hero-slider')
            expect(skeletonHeroImg).toBeInTheDocument();
            expect(skeletonArticleCard).toHaveLength(3);
            expect(skeletonCardPopular).toHaveLength(3);
            expect(skeletonHeroSlider).toBeInTheDocument();
            cleanup();

        })
    })

    describe('calls API', () => {
        it('render hero img', async () => {
            render(mockBlogPage());
            const heroImg = await screen.findByTitle('hero-img')
            expect(heroImg).toHaveAttribute('style', 'background-image: url(https://api.codescapes.io/uploads/article_img_77492e10a8.png);');

        })

        it('render hero slider components', async () => {
            render(mockBlogPage());
            const slider = await screen.findAllByTitle('hero-slider')
            expect(slider).toHaveLength(3);
        })
    })

    it('click dot to slide hero', async () => {
        render(mockBlogPage());
        const slider = await screen.findAllByTitle('hero-slider')
        const dotSlider = await screen.findAllByTitle('dot-sliders')
        fireEvent.click(dotSlider[2])
        expect(slider[2]).toHaveClass('active-blog')
        fireEvent.click(dotSlider[2])
        expect(slider[2]).toHaveClass('active-blog')
    })

})