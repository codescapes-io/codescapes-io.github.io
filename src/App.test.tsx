import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App without crashing', () => {
    render(<App />);
    const linkElement = screen.getByTitle('App');
    expect(linkElement).toBeTruthy();
});
