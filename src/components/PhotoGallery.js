import './PhotoGallery.scss';
import Photo from './Photo';

const PhotoGallery = ( {photos} ) => {
  return (
    <section className='container photoGallery'>
      <ul className='row photoGallery__list'>
        {photos.map(photo =>
            <Photo key={photo.id} src={photo.urls.regular}/>
        )}
      </ul>
    </section>
  )
}

export default PhotoGallery;