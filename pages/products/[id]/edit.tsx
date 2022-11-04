// import ImageGallery from 'react-image-gallery';
import CustomEditor from '@components/Editer';
import Carousel from 'nuka-carousel';
import Image from 'next/image';
import { useState } from 'react';

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
            <CustomEditor/>
      </>
    )
};

export default Products;