import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import LazyLoadImg from "../lazyLoadImage/LazyLoadImg";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";



const Carousel = ({ data, loading, endPoint, title }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const sliding = (dir) => {
        const container = carouselContainer.current;
        let scrollAmount = container.offsetWidth + 20;
        if (dir === "left") {
            scrollAmount = -scrollAmount;
        }

        container.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    };


    //
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };



    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}    {/*only for details page*/}
                {data?.length > 0 ?
                    (<>
                        <BsFillArrowLeftCircleFill
                            className="carouselLeftNav arrow"
                            onClick={() => sliding("left")}
                        />
                        <BsFillArrowRightCircleFill
                            className="carouselRighttNav arrow"
                            onClick={() => sliding("right")}
                        />
                    </>):
                    (
                        <span style={{color: "#7e7a75"}}>Sorry! No Result Found!</span>
                    )
                }
                {(!loading && data) ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item,i) => {
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;
                            return (
                                <div
                                    key={item.id}
                                    className="carouselItem"
                                    onClick={() =>
                                        navigate(`/${item.media_type || endPoint}/${item.id}`)
                                    }
                                >
                                    <div className="posterBlock">
                                        <LazyLoadImg src={posterUrl} />
                                        <CircleRating
                                            rating={item.vote_average.toFixed(1)}
                                        />
                                        <Genres
                                            data={item.genre_ids.slice(0, 2)}
                                        />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(item.release_date || item.first_air_date).format(
                                                "MMM D, YYYY"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;