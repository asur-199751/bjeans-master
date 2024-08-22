import s from './three-slider.module.scss'
import Link from 'next/link'
import Slider from 'react-slick'
import { v4 as uuidv4 } from 'uuid'

const ThreeSlider = ({ data, windowWidth }) => {
  const SliderPrevArrow = (props) => (
    <img
      src={
        windowWidth >= 1023
          ? '/home/arrowRight.svg'
          : '/catalog/smallArrowDown.svg'
      }
      alt=''
      onClick={props.onClick}
      className={s.sliderPrevArrow}
    />
  )

  const SliderNextArrow = (props) => (
    <img
      src={
        windowWidth >= 1023
          ? '/home/arrowRight.svg'
          : '/catalog/smallArrowDown.svg'
      }
      alt=''
      onClick={props.onClick}
      className={s.sliderNextArrow}
    />
  )

  const settings = {
    slidesToShow: windowWidth >= 1023 ? 3 : 2,
    dots: windowWidth >= 1023 ? false : true,
    slidesToScroll: 1,
    prevArrow: <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: () => <div> </div>,
  }

  return (
    <Slider {...settings} className={s.sliderParent}>
      {data
        .filter((item) => !!item.img)
        .map((r) => (
          <div key={uuidv4()} className={s.sliderChild}>
            <Link href={r.link}>
              <a>
                <img src={r.img} alt='' className={s.sliderImg} />
              </a>
            </Link>
            <div className={s.sliderInfo}>
              <div>{r.title}</div>
              {/* <div>{r.text}</div> */}
            </div>
          </div>
        ))}
    </Slider>
  )
}
export default ThreeSlider
