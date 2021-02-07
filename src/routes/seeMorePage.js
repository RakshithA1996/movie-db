import React from 'react';
import { Component } from 'react';
import Header from "../components/header2";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

class seeMorePage extends Component {
    constructor() {
        super();
        this.state = {
          dataArray : [],
          videoArray:[],
          Length: 0,
          Offset: 1,
          Limit: 1,
          hasMore: false,
        };
      }

    componentDidMount(){
        this.getMovieDetails();
    }

    getPosterVideo = (id) => {
        let api_key = "dcd90828f3169240a4e9b818d289b221";
        var vKey;
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((res) => {
            var videoArray = []
            videoArray.concat(res.results[0] && res.results[0].key)
            this.setState({ videoArray: [...this.state.videoArray, res.results[0] && res.results[0].key ]});
        })
        .catch((err) => toast.error(err.message));
    }

    getMovieDetails = () => {
        const {Offset, dataArray, Limit} = this.state;
        let api_key = "dcd90828f3169240a4e9b818d289b221";
        let url = localStorage.getItem("DataValue") === "upcoming" ?
                    `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=${Limit}` :
                  localStorage.getItem("DataValue") === "popular" ?
                    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${Limit}` :
                  localStorage.getItem("DataValue") === "topRated" ? 
                    `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=${Limit}`: ""
        fetch(url , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.results && res.results){
                this.setState({
                    Limit:Limit + 1,
                    Offset:Limit + 1,
                    dataArray:
                    Offset === 1
                    ? res.results
                    : [...dataArray, ...res.results],
                    hasMore: res.results.length > 9 ? true : false
                    },()=>{
                        if(Offset === 1){
                            this.state.dataArray.map((data, index)=>{
                                return this.getPosterVideo(data.id)
                            })
                        }else{
                            this.state.dataArray.slice(this.state.dataArray.length-20,this.state.dataArray.length).map((data, index)=>{
                                return this.getPosterVideo(data.id)
                            })
                        }  
                });
            }else{
                toast.error("Error in api");
            }
        })
        .catch((err) => toast.error(err.message));
    }

    nextfunction = () => {
        this.getMovieDetails();
    };

    render(){
        const {dataArray,videoArray} = this.state;
        console.log(localStorage.getItem("DataValue"))
        let viewItems = dataArray && dataArray.map((data, index)=>{
            return(
                <div className="seeMorePage__Content--Card">
                    <iframe className="seeMorePage__Content--Card__Video" height="215"
                        src={`https://www.youtube.com/embed/${videoArray[index]}?controls=1`} frameborder="0" allowfullscreen>
                    </iframe>
                    <div className="padding2rem">
                        <div className="seeMorePage__Content--Card__Name"><span className="label1">Name : </span>{data.title}</div>
                        <div className="seeMorePage__Content--Card__Overview"><span className="label1">Overview : </span>{data.overview.substring(0,170)}</div>
                        <div className="seeMorePage__Content--Card__Release"><span className="label1">Release Date : </span>{data.release_date}</div>
                    </div>
                </div>
            )
        })
        return(
            <div className="seeMorePage">
                <Header />
                <div className="seeMorePage__Body">
                    <div className="seeMorePage__Header">
                        {localStorage.getItem("DataValue") === "popular" ? "Popular Movies" : 
                         localStorage.getItem("DataValue") === "upcoming" ? "Upcoming Movies" :
                         localStorage.getItem("DataValue") === "topRated" ? "Top Rated Movies" : ""
                        }
                    </div>
                    <div className="seeMorePage__Content">
                    <InfiniteScroll
                        dataLength={viewItems.length}
                        next={() => {
                            this.nextfunction();
                        }}
                        hasMore={this.state.hasMore}
                        loader={
                        <p style={{ textAlign: "center", color: "#bbb" }}>
                            <b>Loading...</b>
                        </p>
                        }
                    >
                        {viewItems}
                    </InfiniteScroll>
                    </div>
                </div>
            </div>
        )
    }
}

export default seeMorePage;