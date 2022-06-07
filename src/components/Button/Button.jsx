import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ handleClickBtn }) {
  return (
    <div className={css.wrap_button}>
    <button className={css.button} onClick={handleClickBtn} type="button">
      Load more
      </button>
    </div>
  );
}
Button.propTypes = {
  handleClickBtn: PropTypes.func.isRequired,
};

export default Button;