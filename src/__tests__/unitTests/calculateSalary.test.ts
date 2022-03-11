import { calculateSalary } from '../../utils/calculateSalary';

const paramsMock = [
  {
    salary: 3000,
    discount: 0,
    dependents: 0,
  },
];

const expectedValues = [
  {
    salary: {
      grossSalary: 'R$ 3.000,00',
      netSalary: 'R$ 2.668,99',
    },
    irrf: {
      aliquot: '15%',
      value: '-R$ 62,02',
    },
    inss: {
      aliquot: '12%',
      value: '-R$ 268,99',
    },

    otherDiscounts: '-R$ 0,00',
  },
];

describe('tests the function calculateSalary', () => {
  it('tests if the function returns the corret values for each param', () => {
    for (let index = 0; index < paramsMock.length; index += 1) {
      const result = calculateSalary(paramsMock[index]);

      expect(result.salary.netSalary).toEqual(
        expectedValues[index].salary.netSalary
      );
    }
  });
});
