import dayjs from 'dayjs';
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import "./style.scss";
import LazyLoadImg from '../lazyLoadImage/LazyLoadImg';
import Genres from '../genres/Genres';
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from '../circleRating/CircleRating';


const MovieCard = ({ cardData, fromSeacrh, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = cardData?.poster_path ? url?.poster + cardData?.poster_path : PosterFallback;
    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${cardData?.media_type || mediaType}/${cardData?.id}`)
            }
        >
            <div className="posterBlock">
                <LazyLoadImg className="posterImg" src={posterUrl} />
                {!fromSeacrh && (
                    <>
                        <CircleRating rating={cardData?.vote_average?.toFixed(1)} />
                        <Genres data={cardData?.genre_ids.slice(0, 2)} />
                    </>
                )}
            </div>
            <div className="textBlock">
                <span className="title"> {cardData?.title || cardData?.name} </span>
                <span className="date">
                    {dayjs(cardData?.release_date || cardData?.first_air_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
}

export default MovieCard