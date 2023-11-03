import React, { useEffect, useState } from 'react'
import "./style.scss"
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import LazyLoadImg from '../../../components/lazyLoadImage/LazyLoadImg'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HeroBanner = () => {
    const [query, setQuery] = useState("")
    const [background, setBackground] = useState("");
    const navigate=useNavigate();
    const [isLoading, setIsLoading] = useState(true);


    const url=useSelector((state)=>state.home.url);
    const {data,loading} =useFetch("/movie/upcoming");
    
    useEffect(() => {
        if(url.backdrop && data?.results){
            setBackground(url?.backdrop + data?.results?.[Math.floor(Math.random() * 19)].backdrop_path);
            setIsLoading(false);
        }
    }, [data,url])
    
    function searchQueryHandler(e){        
        if((e.key==="Enter" || e.type==="click")&& query.length >0){
            navigate(`/search/${query}`)
            setQuery("");
        }
    }
    const skeleton_style={
        height:200
    }
    return (
        <div className="heroBanner">
            {isLoading?(
                <SkeletonTheme baseColor="#313131" highlightColor="#525252">
                    <div className="backdrop-img">
                        <Skeleton containerClassName="avatar-skeleton" />
                    </div>
                </SkeletonTheme>):(
                    <div className="backdrop-img">
                        <LazyLoadImg src={background}/>
                    </div>
                )
            }

            <div className="opacity-layer"></div>
            
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button 
                        onClick={searchQueryHandler}
                        >Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner