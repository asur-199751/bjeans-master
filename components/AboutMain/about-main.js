import React from 'react'
import s from './about-main.module.scss'
import Link from 'next/link'

const AboutMain = () => (
  <div className={s.wrapper}>
    <div className={s.first}>
      <div className={s.firstInner}>
        <img src="/about/about.jpg" alt="" />
        <div>О нас</div>
        <div>
          Мы, B Jeans, говорим, что наша работа – не только готовая одежда, но и
          возможность улучшать жизнь людей с помощью наших продуктов. Поэтому в
          любом нашем магазине мы предлагаем все вместе: ИННОВАЦИИ, СТИЛЬ и
          КАЧЕСТВО.
          <br />
          <br />
          Благодаря инновациям мы создаем экологически чистые, прочные продукты
          без вреда для окружающей среды. СТИЛЬ дарит привлекательные коллекции,
          которые подойдут вам в любых жизненных ситуациях и подарят вам
          ощущение комфорта. КАЧЕСТВО обеспечивается модным дизайном,
          современными тканями и фурнитурой, а также отличным пошивом. Мы
          отражаем постоянное мастерство, использование высококачественных
          джинсовых тканей “BCT”, оригинальную кройку, добротное шитье и
          внимание к каждой детали во всех процессах производства.
          <br />
          <br />
          Торговая Марка B Jeans основана в сентябре 2020 года компанией Bukhara
          Cotton Textile (BCT). BCT является единственной в Центральной Азии
          полностью вертикально интегрированной текстильной компанией, которая
          управляет всеми процессами от посева семян до производства одежды.
          <br />
          <br />
          Фабрика начала свою деятельность в 2019 году с использованием самого
          современного оборудования и технологий. Многонациональная команда
          джинсовой ткани с более чем 15-летним опытом работы синхронизирует
          динамичную организационную структуру, включающую в себя продажи,
          производство, инновации и IT.
          <br />
          <br />
          Подробности о фабрике на официальном сайте{' '}
          <Link href="https://www.bctdenim.com/">
            <a>www.bctdenim.com</a>
          </Link>
        </div>
      </div>
    </div>
    {/* <div className={s.second}>
      <div className={`${s.secondText} ${s.secondTextChange} `}>
        <div>We are creators</div>
        <div>
          You are out on a pleasant motorcycle ride. It’s a warm, sunny afternoon, your bike is in good condition and
          you are in good condition. You’re wearing a full-face helmet, a jacket, jeans, gloves, and boots. You are
          prepared for the worst, but so far, this ride is the best. You are out on a pleasant motorcycle ride. It’s a
          warm, sunny afternoon, your bike is in good condition and you are in good condition. You’re wearing a
          full-face helmet, a jacket, jeans, gloves, and boots. You are prepared for the worst, but so far, this ride is
          the best. You are prepared for the worst.
        </div>
      </div>
      <div className={`${s.secondImg} ${s.secondImgChange} `}>
        <img src='/about/about2.jpg' alt='' />
      </div>
      <div className={s.secondImg}>
        <img src='/about/about3.jpg' alt='' />
      </div>
      <div className={s.secondText}>
        <div>From the heart of Central Asia</div>
        <div>
          You are out on a pleasant motorcycle ride. It’s a warm, sunny afternoon, your bike is in good condition and
          you are in good condition. You’re wearing a full-face helmet, a jacket, jeans, gloves, and boots. You are
          prepared for the worst, but so far, this ride is the best. You are out on a pleasant motorcycle ride. It’s a
          warm, sunny afternoon, your bike is in good condition and you are in good condition. You’re wearing a
          full-face helmet, a jacket, jeans, gloves, and boots. You are prepared for the worst, but so far, this ride is
          the best. You are prepared for the worst.
        </div>
      </div>
    </div> */}
  </div>
)

export default AboutMain
