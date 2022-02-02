import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CSWriterAvatar from '../assets/icons/CSWriterAvatar';

export interface CSArticleProps {
    id: number
    attributes: {
        title: string
        content: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        read: string
        categories: {
            data: {
                id: number
                attributes: {
                    name: string
                }
            }[]
        }
        users_permissions_user: {
            data: {
                id: number
                attributes: {
                    username: string
                    email: string
                    name: string
                }
            }
        }
    }
}

const CSArticle: React.FC = () => {
    const [article, setArticle] = useState<CSArticleProps>();
    const { id } = useParams();

    useEffect(() => {
        let cancel = false
        const fetchData = async () => {
            const response = await axios.get(`https://api.codescapes.io/api/articles/${id}?populate=categories,users_permissions_user`)
            if (cancel) return;
            setArticle(response.data.data)
        }

        fetchData();
        return () => {
            cancel = true
        }
    })

    let date = new Date(article ? article.attributes.createdAt : '');
    let month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let formatDate = `${date.getDay()}  ${month[date.getMonth()]}  ${date.getFullYear()}`

    // console.log(article?.attributes.content);

    return (
        <div className='flex flex-col'>
            <div className='flex flex-col mb-16'>
                <p className='text-6xl mb-6 font-black'>{article?.attributes.title}</p>
                <p className='text-2xl mb-6 font-bold'>{article?.attributes.categories.data[0].attributes.name}</p>
                <div className="flex flex-row items-center">
                    <CSWriterAvatar />
                    <p className='text-2xl ml-3 mb-0'><strong>{article?.attributes.users_permissions_user.data.attributes.name}</strong> on {formatDate}</p>
                </div>
            </div>
            <div className="flex">
                <span>
                    {article?.attributes.content}
                </span>
                <div className="flex flex-col items-center">
                    ads here
                </div>
            </div>
        </div>
    );
};

export default CSArticle;
