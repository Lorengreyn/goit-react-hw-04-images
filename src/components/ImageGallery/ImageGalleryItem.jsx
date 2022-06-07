import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

function ImageGalleryItem({ src, tags, dataSrc, onClick }) {
  return (
    <li className={css.imageGalleryItem} onClick={onClick}>
      <img
        src={src}
        data-src={dataSrc}
        alt={tags}
        className={css.imageGalleryItemPic}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  dataSrc: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;