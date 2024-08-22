import React, { useState, useEffect } from 'react'
import s from './home-banner.module.scss'
import Slider from 'react-slick'
import Link from 'next/link'

const HomeOne = ({ homeOne }) => {
  const [windowWidth, setWindowWidth] = useState()
  useEffect(() => {
    const resizeWindow = () => setWindowWidth(window.innerWidth)

    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  const SliderPrevArrow = (props) => (
    <img
      src='/home/arrowLeft.svg'
      alt=''
      onClick={props.onClick}
      className={s.sliderPrevArrow}
    />
  )

  const SliderNextArrow = (props) => (
    <img
      src='/home/arrowRight.svg'
      alt=''
      onClick={props.onClick}
      className={s.sliderNextArrow}
    />
  )

  const settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    prevArrow: <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />,
  }

  return (
    <Slider {...settings} className={s.wrapper}>
      {homeOne.map(({ title, image, link, imageMob }, i) => (
        <div key={i}>
          <Link href={link}>
            <a
              style={{
                backgroundImage: `url(${
                  windowWidth > 768 ? image?.sourceUrl : imageMob?.sourceUrl
                })`,
              }}
              className={s.inner}
            >
              {title && (
                <div className={s.major}>
                  <div dangerouslySetInnerHTML={{ __html: title }} />
                  {title && <span>Перейти</span>}
                </div>
              )}
            </a>
          </Link>
        </div>
      ))}
    </Slider>
  )
}

export default HomeOne
