import { useSelector } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '../../features/themeSlice';

import iconClose from '../../assets/icon-cross.svg';
import './text-field.scss';

export const TextField = ({ multiline, type, error, closable, className, onClick, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('text-field', {
    'text-field--multiline': multiline,
    'text-field--error': error,
    'text-field--d-mode': darkMode
  }, className);

  const _type = type ?? 'text';

  const field = multiline
    ? <textarea { ...props } />
    : <input { ...props } type={ _type } />;

  return (
    <div className="text-field__control">
      <label className={ _className }>
        { field }
        { error && <span className="text-field--feedback">Can't be empty</span> }
      </label>
      { closable && <img className="text-field--close" src={ iconClose } alt="Close icon" onClick={ onClick } /> }
    </div>
  );
};
