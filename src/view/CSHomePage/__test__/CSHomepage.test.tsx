import React from 'react';
import { render, screen } from '@testing-library/react';
import CSHomePage from '../CSHomePage';
import axios from 'axios';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const fakeData = {
    data: {
        data: {
            id: 1,
            attributes: {
                title: 'Low-code your Program',
                techs: {
                    data: [
                        {
                            id: 6,
                            attributes: {
                                url: '/uploads/unity_logo_cf65490de2.svg'
                            }
                        },
                        {
                            id: 5,
                            attributes: {
                                url: '/uploads/unity_logo_cf65490de2.svg'
                            }
                        },
                        {
                            id: 4,
                            attributes: {
                                url: '/uploads/unity_logo_cf65490de2.svg'
                            }
                        },
                        {
                            id: 3,
                            attributes: {
                                url: '/uploads/unity_logo_cf65490de2.svg'
                            }
                        },
                    ]
                }
            }
        }
    }
}

describe('unit test HomePage', () => {
    it('render HomePage without crashing', () => {
        render(<CSHomePage />);
        const linkElement = screen.getByTitle('home');
        expect(linkElement).toBeTruthy();

    })

    describe('calls API', () => {
        it('render header from api', async () => {
            mockAxios.get.mockImplementation(() => Promise.resolve(fakeData));

            render(<CSHomePage />);
            const headerHome = await screen.findByText(`${fakeData.data.data.attributes.title}`)
            expect(headerHome).toBeInTheDocument();
        })


        it('render techs logo', async () => {
            mockAxios.get.mockImplementation(() => Promise.resolve(fakeData));
            render(<CSHomePage />);
            const techsLogo = await screen.findAllByTitle('techs')
            expect(techsLogo).toHaveLength(4);

        })
    })


})