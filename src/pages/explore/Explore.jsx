import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Select from 'react-select';
import InfiniteScroll from 'react-infinite-scroll-component';

import useFetch from "../../hooks/useFetch"
import "./style.scss"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { fetchDataFromApi } from '../../utils/api';
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";



let filters = {};  //it is vvi that this should be global

const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState(null);
    const [genre, setGenre] = useState(null);

    const { mediaType } = useParams();
    // const [selectedOption, setSelectedOption] = useState(null);

    const sortbyData = [
        { value: "popularity.asc", label: "Popularity Ascending" },
        { value: "popularity.desc", label: "Popularity Descending" },
        { value: "vote_average.desc", label: "Rating Descending" },
        { value: "vote_average.asc", label: "Rating Ascending" },
        { value: "primary_release_date.desc", label: "Release Date Descending" },
        { value: "primary_release_date.asc", label: "Release Date Ascending" },
        { value: "original_title.asc", label: "Title (A-Z)" },
    ];


    const fetchInitialData = () => {
        setLoading(true);
        //const url = `/discover/${mediaType}?page=${pageNum}${sortBy != null ? `&sort_by=${sortBy}` : ``}`
        //fetchDataFromApi(url).then(
        fetchDataFromApi(`/discover/${mediaType}`, filters).then(
            (res) => {
                // console.log(res);
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        )
    }

    const fetchNextPageData = () => {
        //const url = `/discover/${mediaType}?page=${pageNum}${sortBy != null ? `&sort_by=${sortBy}` : ``}`
        //fetchDataFromApi(url).then(
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
            (res) => {
                if (data?.results) {
                    setData({ ...data, results: [...data?.results, ...res.results], });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        )
    }



    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortBy(null);
        fetchInitialData();
    }, [mediaType])


    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
    // console.log(genresData);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];


    function onChange(selectedOptions, action) {
        if (action.name === "sortby") {
            setSortBy(selectedOptions);
            // console.log(action.action);
            if (action.action !== "clear") {
                filters.sort_by = selectedOptions.value;
            }
            else {
                delete filters.sort_by;
            }
        }
        if (action.name === "genres") {
            setGenre(selectedOptions);
            if (action.action !== "clear") {
                let genreId = selectedOptions.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }
        setPageNum(1);
        fetchInitialData();
        // console.log(selectedOptions.value, action);
    }

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
                    </div>

                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />

                        <Select
                            name="sortby"  //to get name when action happen action
                            value={sortBy}
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"

                            isClearable={true}
                            onChange={onChange}
                            options={sortbyData}
                            placeholder="Sort by"
                        />
                    </div>
                </div>

                {(loading || !data) && <Spinner initial={true} />}
                {(!loading && data) &&
                    <>
                        {data.results.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner initial={true} />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;

                                    return (
                                        <MovieCard key={index} cardData={item} fromSeacrh={false} mediaType={mediaType} />
                                    )
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                }
            </ContentWrapper>
        </div>
    )
}

export default Explore