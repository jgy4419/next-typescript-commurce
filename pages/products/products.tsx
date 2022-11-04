// import ImageGallery from 'react-image-gallery';
import Carousel from 'nuka-carousel';
import Image from 'next/image';
import { useState } from 'react';
import Head from 'next/head';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/'
  },
];

const Products = () => {
  const [index, setIndex] = useState(0);
  <Head>
    <meta
      property="og:url"
      content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
    <meta
      property="og:type"
      content="article" />
    <meta
      property="og:title"
      content="When Great Minds Don’t Think Alike" />
    <meta
      property="og:description"
      content="How much does culture influence creative thinking?" />
    <meta
      property="og:image"
      content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
  </Head>
  return (
      <>
        <Carousel animation="fade"
          slideIndex={index}
          autoplay
          wrapAround
        >
          {
            images.map((item, index) => {
              return (
                <Image
                  key={item.original}
                  src={item.original}
                  alt="image"
                  width={1000}
                  height={300}
                  layout="responsive"
                />
              )
            })
          }
      </Carousel>
      <div style={{
        display: "flex",
        
      }}>
        {images.map((item, idx) => {
          return (
            <div key={item.original}>
              <Image
                src={item.original}
                alt="image"
                width={100}
                height={50}
                onClick={ () => {setIndex(idx)}}
              />

            </div> 
          )
        })}
      </div>
      </>
    )
};

export default Products;