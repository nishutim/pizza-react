import React, { ChangeEvent, FC } from 'react';

import s from './styles.module.scss';

interface Props {
   customStyle?: string;
   label?: string;
   type?: string;
   id: string;
   name: string;
   value: string;
   error?: string;
   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
   onBlur?: (e: React.FocusEvent<any, Element>) => void;
   placeholder?: string;
}

const Input: FC<Props> = React.memo(({
   customStyle = '',
   label = 'Имя поля',
   type = 'text',
   id,
   name,
   value,
   error,
   onChange,
   onBlur,
   placeholder = ''
}) => {
   return (
      <div className={`${s.input} ${customStyle}`}>
         <label
            htmlFor={id}
            className={`${s.label} ${error ? s.labelError : ''}`}
         >
            {error ? error : label}
         </label>
         <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder} />
      </div>
   );
});

export default Input;