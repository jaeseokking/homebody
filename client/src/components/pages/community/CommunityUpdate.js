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
        <UpdateStyle>
        <div className="row my-5">
          <div className="cardbox shadow-lg col-md-10  ml-auto mr-auto mb-3">  
          <form encType="multipart/form-data">  
                <div className="cardbox-heading">                   
                <input type="text" className="title-input" name="title" id="title" value={title} 
                    placeholder="title" onChange={onTitleHandler}/>     
                <div className="cardbox-ite d-flex my-auto">
                    <img className="img-fluid ml-auto mx-auto" src={previewImage} alt="Image"/>
                </div>
                    <input name="file-input" id="file-input" type="file" accept="image/*" 
                    onChange={handleChangeFile}/>
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
        </UpdateStyle>
    )
}

export default  withRouter(CommunityUpdate);

const UpdateStyle = styled.header`
  

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
   margin: 0;
  }

  .cardbox .cardbox-heading {
    padding: 16px;
    margin: 0;
  }


 
  .cardbox-comment {
    padding : 16px;
    margin-top : 2em;
    margin-bottom : 2em;
  }



  .media-body p{
    font-weight: 500 !important;
    font-size: 14px;
  }
  
  .media-body small span{
    font-size: 12px;
    color: #aaa;
    margin-right: 10px;
  }
  
  
  .cardbox .cardbox-item {
      position: relative;
     
  }

  .cardbox .cardbox-item img{
    
  }



  .cardbox-base ul{
   margin: 10px 0px 10px -20px!important; 
   font-size: 0px;	
    display: inline-block;
  }

  .cardbox-base li {
    list-style: none;
    margin: 0px 0px 0px -8px ;
    padding: 0px 0px 0px 0px ;
    display: inline-block;
  }
  
  
  .cardbox-base li a i{
   position: relative;
   top: 4px; 
   font-size: 16px;
   color: #8d8d8d;
  }

  .cardbox-base li a span{
   font-size: 14px;
   color: #8d8d8d;
   margin-left: 20px;
   position: relative;
   top: 5px; 
  }
  .cardbox-base li a em{
   font-size: 14px;
   color: #8d8d8d;
   position: relative;
   top: 3px; 
  }

  .cardbox-base li a img{
    width: 25px;
    height: 25px;
    border: 2px solid #fff;
  }
  
  
  .cardbox-comments{
    padding: 10px 40px 20px 40px !important;
    font-size: 0px;	
    text-align: left;
    margin-right: 10px
  }

  .cardbox-comments .comment-avatar img{
    margin-top: 2px;
    margin-left : -30px;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
  }
  
  table {
    width : 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
  }

 


  td {
    vertical-align:top;

  }


  
  .cardbox-comments .comment-body {
    
    overflow: auto;
  }

  .search {
   position: relative;
   right: -40px;
   top: -40px;
   margin-bottom: -40px;
   margin-right: 10px;
   border: 2px solid #f4f4f4;	
   width: 100%;
   overflow: hidden;
   display: inline-block;

  }

  .search input[type="text"] {
   background-color: #fff;
   line-height: 10px;
   padding: 15px 0px 20px 20px;
   border: none;
   border-radius: 4px;
   font-size: 14px;
   color: var(--FontGrey);
   font-weight: 700;
   display: inline-block;
   width : 100%;
  }



  .search button {
   position: absolute;
   right: 0;
   top: 0px;
   border: none;
   background-color: transparent;
   color: #bbbbbb;
   padding: 15px 25px;
   cursor: pointer;
  }
  
  
  .d-flex{
  justify-content: center;
  align-items: center;
  text-align: center;
  }
  
  .search button i {
   font-size: 20px;
   line-height: 5px;
   display: block;
  }
  
  

  .author a{
   font-size: 16px;
   color: #00C4CF;
  }
  .author p{
   font-size: 16px;
   color: #8d8d8d;
  }


  @media(max-width: 1500px)  {
   
  }
`