import { CalcParameters } from '../types';
import { getINSSaliquot, getINSSdiscount } from './inss';
import { getIRRFAliquot, getIRRFdiscount } from './irrf';

const PER_CENT = 100;

export const calculateSalary = ({
  salary,
  dependents,
  discount,
}: CalcParameters) => {
  const INSSaliquot = getINSSaliquot(salary);

  const INSSdiscount = getINSSdiscount(salary);

  const IRRFaliquot = getIRRFAliquot(salary);

  const IRRFdiscount = getIRRFdiscount(
    salary,
    discount,
    dependents,
    INSSdiscount
  );

  const netSalary = salary - INSSdiscount - IRRFdiscount - discount;

  return {
    salary: {
      // grossSalary: Intl.NumberFormat('pt-BR', {
      //   style: 'currency',
      //   currency: 'BRL',
      // }).format(salary),

      grossSalary: salary.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),

      // netSalary: Intl.NumberFormat('pt-BR', {
      //   style: 'currency',
      //   currency: 'BRL',
      // }).format(netSalary),

      netSalary: netSalary.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    },
    irrf: {
      aliquot: Intl.NumberFormat('pt-BR', {
        style: 'percent',
        maximumFractionDigits: 2,
      }).format(IRRFaliquot / PER_CENT),

      value: Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(-IRRFdiscount),
    },
    inss: {
      aliquot: INSSaliquot
        ? Intl.NumberFormat('pt-BR', {
            style: 'percent',
            maximumFractionDigits: 2,
          }).format(INSSaliquot / PER_CENT)
        : null,
      value: Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(-INSSdiscount),
    },

    otherDiscounts: Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(-discount),
  };
};
