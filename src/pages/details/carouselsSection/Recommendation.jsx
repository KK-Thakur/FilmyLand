import React from 'react'
import Carousel from '../../../components/carousel/Carousel'
import useFetch from '../../../hooks/useFetch'

const Recommendation = ({mediaType, id}) => {
    const {data,loading}=useFetch(`/${mediaType}/${id}/recommendations`);
    
    const title= "Recommendation";
    return (
        <Carousel data={data?.results} loading={loading} endPoint={mediaType} title={title}/>
    )
}

export default Recommendation