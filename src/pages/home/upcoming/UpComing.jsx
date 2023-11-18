import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const UPComing = () => {
    const [endPoint, setEndPoint] = useState("movie");
    const {data,loading}=useFetch(`/${endPoint}/upcoming`);
    
    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Upcoming Movies</span>
            </ContentWrapper>
            <Carousel endPoint={endPoint} data={data?.results} loading={loading}/>
        </div>
    )
}

export default UPComing