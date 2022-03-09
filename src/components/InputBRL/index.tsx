import React, { InputHTMLAttributes, useCallback, useEffect } from 'react';
import { RiQuestionLine } from 'react-icons/ri';

import styles from './style.module.scss';

interface InputBrlProps extends InputHTMLAttributes<HTMLInputElement> {
  questionText: string;
  infoText: string;
}

export default function InputBRL({
  infoText,
  questionText,
  ...props
}: InputBrlProps) {
  // const handlekeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
  //   let { value } = e.currentTarget;
  //   value = value.replace(/\D/g, '');
  //   value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  //   value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

  //   e.currentTarget.value = value;
  // }, []);

  // useEffect(() => {
  //   console.log('FUNÇÃO RECRIADA');
  // }, [handlekeyUp]);

  return (
    <div className={styles.formControl}>
      <span className={styles.questionText}>{questionText}</span>
      <div className={styles.inputContainer}>
        <div className={styles.currency}>
          <span>R$</span>
        </div>
        <input type="text" maxLength={12} {...props} />
      </div>
      <div className={styles.infoText}>
        <RiQuestionLine />
        <span>{infoText}</span>
      </div>
    </div>
  );
}
