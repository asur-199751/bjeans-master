import s from './one-slider.module.scss'

const OneSlider = ({ data }) => (
  <div
    style={{ backgroundImage: `url(${data.img})` }}
    className={s.bannerStyle}
  >
    <span>
      <img src="/home/map.svg" alt="" /> {data.title}
    </span>
  </div>
)
export default OneSlider
