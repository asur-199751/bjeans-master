import React from 'react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

// const META_DATA_FOR_PAGES = {
//   '/product/': {
//     keys: ['{productTitle}', '({sku})', '{price}'],
//     title: '{productTitle} ({sku}) | B Jeans',
//     description:
//       '{productTitle} за {price} UZS. Купить {productTitle} в Ташкенте. Гарантия качества, только на B Jeans | {sku}',
//   },
//   '/help': {
//     title: 'У вас остались вопросы? Страница помощи | Bjeans',
//     description:
//       'Как заказать товар? Даёте ли гарантии? Политика возврата и обмена. Способы оплаты. Эти и другие ответы на вопросы, найдете в странице помощи.',
//   },
//   '/about': {
//     title: 'Узнайте больше о нас. Страница о компании Bjeans',
//     description:
//       'B Jeans - это не только готовая джинсовая одежда для мужчин и женщин, но и возможность улучшать жизнь людей с помощью наших продуктов.',
//   },
//   '/stores': {
//     title: 'Где найти наши магазины в Ташкенте? | Bjeans',
//     description:
//       'Не знайте где найти наши магазины в Ташкенте? На данной странице вы можете узнать где находятся наши филиалы и узнать локации магазинов.',
//   },
//   '/posts': {
//     title: 'Советы по уходу за джинсами, статьи о моде | Блог Bjeans',
//     description:
//       'Как подобрать базовый ремень к джинсам? С чем носить джинсы скинни? Гид по дениму: все, что нужно знать… Блог Bjeans - советы и секреты моды',
//   },
//   '/vacancy': {
//     title: 'Вступай в команду и становись частью команды B-JEANS!',
//     description:
//       'Хочешь работать с удовольствием и стать частью дружной команды B-Jeans? Тогда заполняй данную анкету и сделай первый шаг к своей карьере.',
//   },
//   '/partner': {
//     title: 'Хотите сотрудничать с B-Jeans? Заполните анкету здесь.',
//     description:
//       'Если вы заинтересованы в сотрудничестве с нашим брендом, заполните анкету и оставьте свои контактные данные. И мы обязательно свяжемся с вами.',
//   },
// }

const SITE_URL = 'https://bjeans.uz/';
const SITE_NAME = 'Bjeans';
const DEFAULT_TITLE = 'Джинсы и Джинсовая одежда в Ташкенте | Bjeans';
const DEFAULT_DESCRIPTION =
  'Мужская и женская джинсовая одежда - шорты, штаны и джинсовые куртки в Ташкенте. 10 дневная гарантия. Бесплатная доставка и отличный сервис.';

export const HeadData = ({ title, description, image, product }) => {
  return (
    <>
      <NextSeo
        title={title ? title : DEFAULT_TITLE}
        description={description ? description : DEFAULT_DESCRIPTION}
        openGraph={{
          images: [
            {
              url: image ? image : '/header/logo.svg',
            },
          ],
          url: SITE_URL,
          title: title ? title : DEFAULT_TITLE,
          site_name: SITE_NAME,
          locale: 'ru_RU',
          type: 'website',
          description: description ? description : DEFAULT_DESCRIPTION,
        }}
        twitter={{
          cardType: 'summary',
          handle: '@handle',
          site: '@site',
          title: title ? title : DEFAULT_TITLE,
          description: description ? description : DEFAULT_DESCRIPTION,
        }}
      />

      <Head>
        {process.env.NODE_ENV === 'production' ? (
          <>
            <link
              href='../styles/globals.scss'
              rel='stylesheet'
              type='text/css'
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '624485248709339');
                  fbq('track', 'PageView');
                  ${
                    product &&
                    `fbq('track', 'ViewContent', ${JSON.stringify({
                      content_ids: product.id,
                      content_type: 'product',
                      value: product.onSale
                        ? product.woocsSalePrice
                        : product.woocsRegularPrice,
                      currency: 'UZS',
                    })});`
                  }
                  `,
              }}
            />
            <noscript
              dangerouslySetInnerHTML={{
                __html: `
                  <img height="1" width="1" style="display:none"
                  src="https://www.facebook.com/tr?id=624485248709339&ev=PageView&noscript=1"/>
                  `,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MTX2CLT');
                  `,
              }}
            />
            <noscript
              dangerouslySetInnerHTML={{
                __html: `
                      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MTX2CLT"
                       height="0" width="0" style="display:none;visibility:hidden"></iframe>
                      `,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                      ym(73517479, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true,
                      webvisor:true
                      });
                        `,
              }}
            />
            <noscript
              dangerouslySetInnerHTML={{
                __html: `
                      <div><img src="https://mc.yandex.ru/watch/73517479" style="position:absolute; left:-9999px;" alt="" /></div>
                        `,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                      (function(d, w, c) {
                          w.ChatraID = 'yRGaT2N79ger8wCtk';
                          var s = d.createElement('script');
                          w[c] = w[c] || function() {
                              (w[c].q = w[c].q || []).push(arguments);
                          };
                          s.async = true;
                          s.src = 'https://call.chatra.io/chatra.js';
                          if (d.head) d.head.appendChild(s);
                      })(document, window, 'Chatra');
                        `,
              }}
            />
          </>
        ) : null}
      </Head>
    </>
  );
};
