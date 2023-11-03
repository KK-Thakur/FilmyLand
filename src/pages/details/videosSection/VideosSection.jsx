import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import LazyLoadImg from "../../../components/lazyLoadImage/LazyLoadImg";
import { PlayIcon } from "../playBtn/PlayIcon";



const VideosSection = ({ data, loading }) => {
    // console.log(data);
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {(!loading && data) ? (
                    <div className="videos">
                        {(data.results?.length==0) ? (
                                <>
                                    <span style={{color: "#7e7a75"}}>Sorry! No Result Found!</span>
                                </>
                            ) : (
                                <>
                                {data.results?.map((video)=>{
                                    return(
                                        <div 
                                            key={video.id} 
                                            className="videoItem"
                                            onClick={()=>{
                                                setVideoId(video?.key);
                                                setShow(true);
                                            }}
                                        >
                                            <div className="videoThumbnail">
                                                <LazyLoadImg src={`https://img.youtube.com/vi/${video?.key}/hqdefault.jpg`} />
                                                <PlayIcon />
                                            </div>

                                            <div className="videoTitle">{video.name}</div>
                                        </div>
                                    )
                                })}
                                </>
                            )
                        }
                        
                    </div>
                    ) : (
                        <div className="videoSkeleton">
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                        </div>
                    )
                }
            </ContentWrapper>
            <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
        </div>
    );
};

export default VideosSection;