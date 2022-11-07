// import ImageGallery from 'react-image-gallery';
import CustomEditor from '@components/Editer';
import {useRouter} from 'next/router';
import Carousel from 'nuka-carousel';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { convertFromRaw, EditorState } from 'draft-js';

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
  const [index, setIndex] = useState(0); // 이미지 index
  // 무슨 데이터를 가져왔는지? 무슨 제품을 사용하는지 알아야 된다.
  const router = useRouter();
  const { id: productId } = router.query;
  const [editorState, setEditorState] = useState<EditorState | undefined>(undefined);

  useEffect(() => {
    // null 이랑 undefined 상황 둘 다 적용하고 싶으면 !== 대신 != 해주기
    if (productId != null) {
      fetch(`/api/get-product?id=${productId}`)
        .then(res => {
          res.json()
        })
        .then((data) => {
          console.log(data);
          if (data.items.contents) {
              setEditorState(
                EditorState.createWithContent(
                  convertFromRaw(JSON.parse(data.items.contents))
                )
              )
            }else { // 기존의 데이터가 없을 때 
              setEditorState(EditorState.createEmpty())
            }
          }
        ) 
    }
  }, [productId]);

  const handleSave = () => {
    alert('save!');
  }
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
      {
        editorState != null && (
        <CustomEditor
          editorState={editorState}
          // 변경이 있을 땐 이 친구를 클릭해주기
          onEditorStateChange={setEditorState}
          onSave={ handleSave } // 저장 기능
        />
      )}
      </>
    )
};

export default Products;