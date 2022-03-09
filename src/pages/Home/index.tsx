import React, { useCallback, useState } from 'react';

import { InputBRL } from '../../components';
import styles from './style.module.scss';

interface CalcParameters {
  salary: number;
  discount: number;
}

export default function Home() {
  const [params, setParams] = useState<CalcParameters>({} as CalcParameters);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      const onlyNumbers = value.replace(/\D/g, '');
      console.log(Number(onlyNumbers) / 100);
      setParams({
        ...params,
        [e.currentTarget.name]: Number(onlyNumbers) / 100,
      });
    },
    [params]
  );

  return (
    <main className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="./assets/logo.png" className={styles.logo} alt="logo" />
      </div>
      <h1 className={styles.title}>Calculadora de salário líquido</h1>

      <form className={styles.form}>
        <InputBRL
          infoText="Salário bruto sem descontos"
          questionText="Qual seu salário bruto?"
          onChange={handleChange}
          name="salary"
          placeholder="0,00"
        />
        <InputBRL
          infoText="Pensão alimentícia, plano de saúde..."
          questionText="Total de descontos"
          onChange={handleChange}
          name="discount"
          placeholder="0,00"
        />
      </form>
    </main>
  );
}
