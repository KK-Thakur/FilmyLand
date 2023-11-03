import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import avatar from "../../../assets/avatar.png";
import LazyLoadImg from "../../../components/lazyLoadImage/LazyLoadImg";


const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {(!loading && data && url?.profile) ? (
                    <div className="listItems">
                        {data?.map((item,i)=>{
                            let imgUrl=item?.profile_path ? (url.profile+item.profile_path) : (avatar);
                            // let imgUrl=item?.profile_path ? ("https://image.tmdb.org/t/p/h632"+item.profile_path) : (avatar);
                            return(
                                <div key={i} className="listItem">
                                    <div className="profileImg">
                                        <LazyLoadImg src={imgUrl} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">{item.character}</div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
