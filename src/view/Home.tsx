import React, { Component } from 'react'
import axios from 'axios';
import CSIFeature from '../assets/image/CSIFeature';
import CSIUnity from '../assets/image/CSIUnity';
import CSIMidtrans from '../assets/image/CSIMidtrans';
import CSIPython from '../assets/image/CSIPython';
import CSIReact from '../assets/image/CSIReact';
import CSIMail from '../assets/image/CSIMail';

export interface HomeProps {
    data: {
        attributes: {
            title: string
            content: string
            createdAt: string
            updateAt: string
            publishedAt: string
        }
        id: number
    }[]
}

export class Home extends Component {
    state = {
        contents: [],
        error: null,
    }

    componentDidMount = async () => {
        try {
            const response = await axios.get('http://api.codescapes.io/api/articles');
            this.setState({ contents: response.data.data });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        console.log(this.state.contents[0]);
        return (
            <section id='home'>
                <div className="container-hero">
                    <h1>Low-code your Program</h1>
                    {/* <h1>{this.state.contents[0].attributes.title}</h1> */}
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <button>Get Started Free</button>
                </div>
                <div className="container-hero-2">
                    <h1>Lorem ipsum.</h1>
                    {/* <h1>{content[0].attributes.title}</h1> */}
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
                    {/* {tech.map(el => el)} */}
                    <CSIUnity />
                    <CSIMidtrans />
                    <CSIPython />
                    <CSIReact />
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
}

export default Home;
