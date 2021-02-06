import React from 'react';
import { Component } from 'react';
import { toast } from "react-toastify";
import BannerCarosel from '../components/bannerCarosel';
import Header from "../components/header";
import PopularMovies from '../components/popularMovies';
import TopRatedMovies from '../components/topRatedMovies';
import UpcommingMovies from '../components/upcommingMovies';
import VideoModal from '../components/videoModal';

class home extends Component {
    constructor() {
        super();
        this.state = {
            search:"",
            searchArray:[],
            Length: 0,
            Offset: 1,
            Limit: 1,
            hasMore: false,
            navBg:false,
            videoURL:"",
            videoDetails:{}
        }
    }

    componentDidMount() {
        window.onscroll = () => {
            if (document.documentElement.scrollTop > 100) {
              this.setState({ navBg: true });
            } else {
              this.setState({ navBg: false });
            }
        };
    }

    getSearchApiDetails = () => {
        const {Offset, searchArray, Limit} = this.state;
        let api_key = "dcd90828f3169240a4e9b818d289b221"
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query='${this.state.search}'&page=1&include_adult=false`, {
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
                    searchArray:
                    Offset === 1
                    ? res.results
                    : [...searchArray, ...res.results],
                    hasMore: res.results.length > 9 ? true : false
                })
            }else{
                toast.error(res.message);
            }
        })
        .catch((err) => toast.error(err.message));
    }

    getPosterImage = (id) => {
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
            this.setState({videoURL:res.results[0] && res.results[0].key},()=>{console.log(this.state.videoURL)});
        })
        .catch((err) => toast.error(err.message));
    }

    setMovieId = (id, details) => {
        this.setState({videoDetails:details,search:""},()=>{
            this.getPosterImage(id);
        })
    }

    setSearchParams = (e) => {
        this.setState({searchArray:[],search:e.target.value},()=>{
            if(this.state.search !== ""){
                this.getSearchApiDetails();
            }else{
                return;
            }
        })
    }

    closeModal = () => {
        this.setState({videoURL:""});
    }

    render() {
        const {navBg,searchArray,search,videoURL,videoDetails} =this.state;
        return (
            <div className="home">
                <Header 
                    setSearchParams={this.setSearchParams} 
                    navBg={navBg} 
                    searchArray={searchArray}
                    search={search}
                    setMovieId={this.setMovieId}
                />
                <BannerCarosel />
                <PopularMovies />
                <UpcommingMovies />
                <TopRatedMovies />
                {videoURL !== "" ?
                    <VideoModal url={videoURL} closeModal={this.closeModal} videoDetails={videoDetails} />
                    : ""
                }
            </div>
        )
    }
}

export default home;