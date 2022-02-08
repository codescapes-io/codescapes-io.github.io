import React from 'react';
import { render, screen } from '@testing-library/react';
import CSHomePage from '../CSHomePage';

describe('unit test HomePage', () => {
    it('render HomePage without crashing', () => {
        render(<CSHomePage />);
        const linkElement = screen.getByTitle('home');
        expect(linkElement).toBeTruthy();

    })

    describe('calls API', () => {
        it('render header from api', async () => {
            render(<CSHomePage />);
            await screen.findByText('Low-code your Program')
            expect((await screen.findByTitle('header-content')).textContent).toBe('Low-code your Program');
        })


        it('render techs logo', async () => {
            render(<CSHomePage />);
            const techsLogo = await screen.findAllByTitle('techs')
            expect(techsLogo).toHaveLength(4);

        })
    })


})