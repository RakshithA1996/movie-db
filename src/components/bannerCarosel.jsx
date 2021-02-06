import React from 'react';
import { Component } from 'react';
import poster1 from "../images/poster7.jpeg";
import poster2 from "../images/poster8.jpg";
import poster3 from "../images/poster3.jpg";
import poster4 from "../images/poster4.jpg";
import poster5 from "../images/poster5.jpg";
import poster6 from "../images/poster6.jpg";
import poster9 from "../images/poster9.png";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class bannerCarosel extends Component {
    constructor(){
        super();
        this.state = {
            imageArray : [
                poster1,poster3,poster4,poster9,poster5,poster2,poster6
            ]
        }
    }
    
    render() {
        const settings = window.screen.availWidth > 700? {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            row: 0,
        }:{
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            row: 0,
        };

        return (
            <div className="bannerCarousel">
                <Slider {...settings}>
                    {this.state.imageArray.map((data,index)=>{
                        return(
                            <img className="bannerCarousel__Img" key={index} src={data} alt="poster"  />
                        )
                    })}
                </Slider>
                <div class="shadow"></div>
            </div>
        )
    }
}

export default bannerCarosel;