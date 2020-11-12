import { useState } from 'react';
import './Photo.scss';

const Photo = ( {id, user, src, srcBigger} ) => {

  //state
  const [isBig, setIsBig] = useState(false);
  const [clientY, setClientY] = useState(0);
  const [photoDetails, setPhotoDetails] = useState('');

  //variables
  const key = "q8pGKlT0Khz6viOf9A5MXa-3XvXETz3f8xNcchKr9MY";

  //making bigger image after user click on it
  const handleMakeBigger = e => {
    //fetching details of photo
    fetch(`https://api.unsplash.com/photos/${id}/?client_id=${key}`)
    .then(resp => resp.json()
    .then(data => {
      //set state
      setPhotoDetails(data);
      setIsBig(true);
      setClientY(e.pageY - e.clientY + 40);
      //scroll to see image
      window.scrollTo(0, e.pageY - e.clientY);
    })
  )}

  //exit form big image view
  const handleMakeSmaller = e => {
    if (e.type === "keydown") {
      if (e.key !== "Escape") return;
      setIsBig(false);
    }
    if (e.target.dataset.tag === 'makeSmall') setIsBig(false);
  }

  return (
    <li className='photoGallery__list__elem' tabIndex="0" onKeyDown={handleMakeSmaller}>
      <img 
        className='list__elem__img'
        src={src} 
        alt='' 
        onClick={handleMakeBigger} 
      />
      {isBig && 
        <div className='list__elem__container' onClick={handleMakeSmaller} data-tag='makeSmall'>
          <div className='elem__container__box'  style={{'top': `${clientY}px`}}>
            <div className='container__box__header'>
              <div className='box__header__user'>
                <img src={user.profile_image.small} alt='' />
                <div>
                  <p>{user.name}</p>
                  {user.twitter_username && <p>@{user.twitter_username}</p>}
                </div>
              </div>
              <div className='box__header__delete' onClick={handleMakeSmaller} data-tag='makeSmall'>
                <i className="fas fa-times" data-tag='makeSmall'/>
              </div>
            </div>
            <img 
              className='container__box__img'
              src={srcBigger} 
              alt='' 
              onClick={handleMakeSmaller} 
              data-tag='makeSmall'
            />
            <div className='container__box__footer'>
              {photoDetails.location.name && <p>{photoDetails.location.name}</p>}
            </div>
          </div>
        </div>
      }
    </li>
  )
}

export default Photo;