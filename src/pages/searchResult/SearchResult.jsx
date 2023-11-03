import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import "./style.scss"
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import noResults from "../../assets/no-results.png";
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCard';


const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading]=useState(true);
    const {query}=useParams();
    function fetchInitialData(){
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            async(res)=>{
                setData(res);
                setPageNum((prev)=>prev+1);
                setLoading(false);
            }
        )
    }
    function fetchNextPageData(){
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res)=>{
                if (data?.results) {
                    setData({...data, results: [...data?.results, ...res.results]});
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        )
    }


    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query])
    

    return (
        <div className="searchResultsPage">
            {(loading || !data) && <Spinner initial={true} /> }
            {(!loading && data) &&
                <ContentWrapper>
                    {data.results?.length >0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${data?.total_results > 1 ? "results": "result"} for '${query}'`}
                            </div>

                            <InfiniteScroll
                                className="content"
                                dataLength={data.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data.total_pages}
                                loader={<Spinner initial={true} />}
                            >
                                {data?.results?.map((item,index)=>{
                                    if (item.media_type === "person") return;
                                    return(
                                        <MovieCard key={item.id + index} cardData={item} fromSeacrh={true} mediaType={item.media_type}/>
                                    )
                                })}
                            </InfiniteScroll>
                        </>
                    ):(
                        <span className="resultNotFound">
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            }
        </div>
    )
}

export default SearchResult