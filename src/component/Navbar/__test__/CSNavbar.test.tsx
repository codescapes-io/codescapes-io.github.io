import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import CSNavbar from '../CSNavbar';

describe('unit test Navbar', () => {
    it('render navbar without crashing', () => {
        render(<CSNavbar />)

        const navbar = screen.getByTitle('navbar');

        expect(navbar).toBeTruthy();
        cleanup();
    })

    it('open sidebar whem click menu icon', async () => {
        render(<CSNavbar />)

        const menuIcon = screen.getByTitle('menu-icon');
        fireEvent.click(menuIcon);
        const sideDrawer = await screen.findByTitle('side-drawer');

        expect(sideDrawer).toBeInTheDocument();

        const closeIcon = await screen.findByTitle('close-icon');
        fireEvent.click(closeIcon);

        await waitFor(() => expect(sideDrawer).not.toBeInTheDocument());

    })
})