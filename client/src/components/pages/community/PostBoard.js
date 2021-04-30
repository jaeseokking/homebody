import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import styled from 'styled-components';
import { communityUpload } from '../../../_actions/board_action'


function PostBoard() {
    
    
    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState("");
    const [image, setImage] = useState(null);
    const [text, setText] = useState();
    const [title, setTitle] = useState();

    const state = useSelector(state => state);
    const user = state.user.login ?? {};
    const writer = user.nickname ?? '';

    const resizeFile = (file) => new Promise(resolve => {
        //maxWidh 700 maxHeight 700 file jpeg quaulity 70%, format file
        Resizer.imageFileResizer(file, 700, 700, 'jpeg', 70, 0,
        uri => {
          resolve(uri);
        },
        'file'
        );
    });

    const handleChangeFile = async (event) => {
        let reader = new FileReader();

        reader.onloadend = () => {
           // console.log(reader.result)
          //읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          if (base64) {
            //미리보기를 위한 이미지
            setPreviewImage(base64.toString()); // 파일 base64 상태 업데이트
          }   
        }
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]); // 파일을 읽어 버퍼에 저장
            const image = await resizeFile(event.target.files[0]);
            setImage(image); // 파일 상태 업데이트 
      }
    }

    const onTextHandler = (event) => {
        setText(event.target.value);
    }

    
    const onTitleHandler = (event) => {
        setTitle(event.target.value);
    }

    const onUploadHandler = (event) => {
        event.preventDefault();

        const formData = new FormData(); 
        formData.append('text', text);
        formData.append('image', image);
        formData.append('writer', writer);
        formData.append('title', title);

        dispatch(communityUpload(formData)).then(response=> {
            if(!response.payload.Success){
                alert('업로드 실패')
            }else{
                alert('업로드 성공!')
                window.location.reload(false); 
            }
        })


    }


    return (
        <div>
            <PostDesign>
            <form encType="multipart/form-data">  
                <div className="upload row mx-2">               
                    <span className="preview" >
                        <img src={previewImage} alt="preview" width="300px"/>
                    <label htmlFor="file-input">
                        <i className="fa fa-upload" aria-hidden="true"></i>
                    </label> 
                    <input name="file-input" id="file-input" type="file" accept="image/*"
                    onChange={handleChangeFile}/>
                    </span>

                    <label htmlFor="title"></label>
                    <input type="text" className="form-control" name="title" id="title" value={title} 
                    placeholder="title" onChange={onTitleHandler}/>     
                    
                    <textarea className="form-control" rows="5" 
                    name="content" id="content"  placeholder="content" 
                    onChange={onTextHandler}/>

                    <button type="button" className="btn btn-outline-secondary text-uppercese" 
                    id="btnUpload" onClick={onUploadHandler}>Upload
                    </button>
                </div>
                       
               
            </form> 
            </PostDesign>
        </div>
    )
}

export default PostBoard;


const PostDesign = styled.header`
    lable {
        display: inline-block
    }

    .preview {
       
    }

    .image-upload {
        border : 1;
    }

    .preview>input {
        display: none;
    }

`   
    