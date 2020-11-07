import { useState } from 'react';
import './Photo.scss';

const Photo = ( {user, src, srcBigger} ) => {

  const [isBig, setIsBig] = useState(false);
  const [clientY, setClientY] = useState(0);

  const handleMakeBigger = e => {
    setIsBig(true);
    setClientY(e.pageY);
    window.scrollTo(0, e.pageY + 50)
  }

  const handleMakeSmaller = e => {
    setIsBig(false);
  }

  return (
    <li className='photoGallery__list__elem'>
      <img 
        className='list__elem__img'
        src={src} 
        alt='' 
        onClick={handleMakeBigger} 
      />
      {isBig && 
        <div className='list__elem__container'>
          <div className='elem__container__box'  style={{'top': `${clientY}px`}}>
            <div className='container__box__header'>
              <div className='box__header__user'>
                <img src={user.profile_image.small} alt='' />
                <div>
                  <p>{user.name}</p>
                  {user.twitter_username && <p>@{user.twitter_username}</p>}
                </div>
              </div>
              <div className='box__header__delete' onClick={handleMakeSmaller}><i className="fas fa-times"/></div>
            </div>
            <img 
              className='container__box__img'
              src={srcBigger} 
              alt='' 
              onClick={handleMakeSmaller} 
            />
            <div className='container__box__footer'>
              <p>{user.location}</p>
            </div>
          </div>
        </div>
      }
    </li>
  )
}

export default Photo;