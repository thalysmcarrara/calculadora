import React, { useCallback, useState } from 'react';

import { InputBRL, DependentsInput } from '../../components';
import styles from './style.module.scss';

interface CalcParameters {
  salary: number;
  discount: number;
  dependents: number;
}

const initialValue = {
  salary: 0,
  discount: 0,
  dependents: 0,
};

export default function Home() {
  const [params, setParams] = useState<CalcParameters>(initialValue);

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

  const handleIncrease = () => {
    setParams({
      ...params,
      dependents: params.dependents + 1,
    });
  };

  const handleDecrease = () => {
    setParams((prevState) => {
      if (prevState.dependents === 0) {
        return { ...prevState };
      }
      return {
        ...prevState,
        dependents: prevState.dependents - 1,
      };
    });
  };

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
        <DependentsInput
          infoText="Dependentes declarados no Imposto de Renda"
          questionText="Quantos dependentes você tem?"
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          dependentsValue={params.dependents}
        />
      </form>
    </main>
  );
}
