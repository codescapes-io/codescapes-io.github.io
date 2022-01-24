import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CSIFeature from '../assets/image/CSIFeature';
import CSIMail from '../assets/image/CSIMail';

export interface HomeProps {
    attributes: {
        title: string
        createdAt: string
        updateAt: string
        publishedAt: string
        techs: {
            data: {
                id: number
                attributes: {
                    name: string
                    alternativeText: string
                    caption: string
                    width: number
                    height: number
                    url: string
                    formats: {
                        thumbnail: {
                            name: string
                            width: number
                            height: number
                            size: number
                            url: string
                        },
                        medium: {
                            name: string
                            width: number
                            height: number
                            size: number
                            url: string
                        },
                        small: {
                            name: string
                            width: number
                            height: number
                            size: number
                            url: string
                        }
                    }
                }
            }[]
        }
    }
    id: number
}

const Home: React.FC = () => {
    const [content, setContent] = useState<HomeProps>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(process.env.REACT_APP_HOMEPAGE_API ? process.env.REACT_APP_HOMEPAGE_API : '');
            setContent(response.data.data);
        }
        fetchData()

    }, [content])

    return (
        <section id='home'>
            <div className="container-hero">
                <h1>{content?.attributes.title}</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                <button>Get Started Free</button>
            </div>
            <div className="container-hero-2">
                <h1>Lorem ipsum.</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum</p>
            </div>
            <div className="container-features">
                <div className="feature-link">
                    <div className="radio-feature">
                        <input type="radio" name="feature" id="cloud" />
                        <label htmlFor="cloud">Cloud Deployment</label>
                    </div>
                    <div className="radio-feature">
                        <input type="radio" name="feature" id="backend" />
                        <label htmlFor="backend">Backend Visualizer</label>
                    </div>
                    <div className="radio-feature">
                        <input type="radio" name="feature" id="api" />
                        <label htmlFor="api">Logic API</label>
                    </div>
                    <div className="radio-feature">
                        <input type="radio" name="feature" id="database" />
                        <label htmlFor="database">Database Management</label>
                    </div>
                </div>
                <div className="container-feature-img">
                    <CSIFeature width={677} height={500} />
                    <a href='/' className='learn-more'>Learn more</a>
                </div>
            </div>
            <div className="tech-compatible">
                {content?.attributes.techs.data.map(el => {
                    return (
                        <img key={el.id} src={`http://api.codescapes.io${el.attributes.url}`} alt="" />
                    )
                })}
            </div>
            <div className="container-subscribe">
                <CSIMail />
                <div className="subs-body">
                    <h1>Stay Tuned!</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                        Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <form action="">
                        <input type="email" name="" id="" placeholder='Enter your e-mail adress' />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Home;
