import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Resizer from 'react-image-file-resizer';
import {communityUpdate} from '../../../_actions/board_action';

import styled from 'styled-components';

function CommunityUpdate({history}) {

    const board = useSelector(state => state.board);
    const detail = board.detail ?? {};
    const list = detail.list ?? [];
    console.log(list);

    const dispatch = useDispatch();
    const [originalImage, setOriginalImage] = useState()
    const [previewImage, setPreviewImage] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(list[0].description);
    const [title, setTitle] = useState(list[0].title);
    const [board_id, setBoardID] = useState();

    const resizeFile = (file) => new Promise(resolve => {
        //maxWidh 700 maxHeight 700 file jpeg quaulity 70%, format file
        Resizer.imageFileResizer(file, 700, 700, 'jpeg', 70, 0,
        uri => {
          resolve(uri);
        },
        'file'
        );
    });
  
    useEffect(()=> {   
        const base64Profile = btoa(String.fromCharCode(...new Uint8Array(list[0].image.data))) ;
        setPreviewImage(`data:image/png;base64,${base64Profile}`);
        setBoardID(list[0].board_id)
    },[])
    //읽기가 완료되면 아래코드가 실행됩니다.
    const handleChangeFile = async (event) => {
        let reader = new FileReader();

        reader.onloadend = () => {
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

    const onDescriptionHandler = (event) => {
        setDescription(event.target.value);
    }

    
    const onTitleHandler = (event) => {
        setTitle(event.target.value);
    }

    const onUpdateHandler = (event) => {
        event.preventDefault();

        const formData = new FormData(); 
        formData.append('description', description);
        formData.append('image', image);
        formData.append('title', title);
        formData.append('board_id', board_id);
        

        dispatch(communityUpdate(formData)).then(response=> {
            console.log(response.payload)
             if(response.payload.Success){
                alert('게시글 수정 성공')
                history.push(`/community/details/${board_id}`); 
             }else{
                alert('게시글 수정 실패')
             }
        })
    }

    return (
        <Styled>
        <div className="row my-5">
          <div className="cardbox shadow-lg col-md-10 mx-auto mb-3">  
          <form encType="multipart/form-data">  
                <div className="cardbox-heading">                   
                <input type="text" className="title-input" name="title" id="title" value={title} 
                    placeholder="title" onChange={onTitleHandler}/> 

                <div className="d-flex row">
                    <img className="img-fluid px-3" src={previewImage} alt="Image"/><br/>
                    <input name="file-input" id="file-input" type="file" accept="image/*" 
                    onChange={handleChangeFile}/>
                    <label className="inputimage" htmlFor="file-input">
                        <i className="fas fa-camera fa-2x mx-auto" ></i>
                    </label>
                </div>
                    
                <textarea className="form-control" rows="5" 
                        name="content" id="content"   placeholder="content" 
                        onChange={onDescriptionHandler} value={description}/>
                <button type="button" className="btn btn-outline-secondary text-uppercese my-2" 
                  id="btnUpload" onClick={onUpdateHandler}>Upload
                </button>
                <button type="button" className="btn btn-outline-secondary text-uppercese ml-2 my-2" 
                  id="btnCancle" onClick={() => history.push(`/community/details/${board_id}`)}>Cancle
                </button>
                </div>
               
            </form>
            </div>
        </div>
        </Styled>
    )
}

export default  withRouter(CommunityUpdate);

const Styled = styled.header`
  
  lable {
    display: inline-block;
    width : 100%;
  }

  .d-flex>input {
    display: none;
  }

  .title-input {
      font-weight : bold;
      width : 100%;
      text-align : center;
      font-size : 20px;
  }

  .cardbox {
   max-width : 720px;
   background : var(--white);
   border-radius: 10px;
  }

  .cardbox .cardbox-heading {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .d-flex {
    justify-content: center;
    align-items: center;
    display : inline-block;
  }
  
  .search button i {
   font-size: 20px;
   line-height: 5px;
   display: block;
  }
  
`