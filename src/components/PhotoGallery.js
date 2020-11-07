import './PhotoGallery.scss';
import Photo from './Photo';
import { useEffect, useState } from 'react';

const PhotoGallery = ( {photos, savedValue, handleClickTag} ) => {

  const [sortedTags, setSortedTags] = useState([]);

  useEffect(() => {
    let arrayTags = [];

    photos.map(photo => {
      return photo.tags.map((tag => {
        return arrayTags.push(tag.title);
      }));
    })

  const tagsCount = arrayTags.reduce((obj, item) => {
    const searched = savedValue.toLowerCase();
    if (item === searched) return obj;
      if (!obj[item]) obj[item] = 0;
      obj[item]++;
      return obj;
    }, {});

    const tagsCountSorted = Object.fromEntries(Object.entries(tagsCount).sort(([,a],[,b]) => b - a));

    setSortedTags(Object.keys(tagsCountSorted));

  }, [photos])

  return (
    <section className='container photoGallery'>
      <div className='row photoGallery__description'>
        <h2 className='photoGallery__description__title'>{savedValue}</h2>
      </div>
      <div className='row photoGallery__description'>
        {sortedTags && 
          sortedTags.map((sortedTag, idx) => {
            return <div key={idx} className='photoGallery__description__tag' onClick={e => handleClickTag(e, sortedTag)}>{sortedTag}</div>
          })
        }
      </div>
      <ul className='row photoGallery__list'>
        {photos.map(photo =>
            <Photo key={photo.id} id={photo.id} src={photo.urls.small} srcBigger={photo.urls.regular} user={photo.user}/>
        )}
      </ul>
    </section>
  )
}

export default PhotoGallery;