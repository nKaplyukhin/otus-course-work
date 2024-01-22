import { EOperation, IOperation } from 'interfaces/operation';

const productNames = ['AMD', 'INTEL', 'NVIDIA', 'ATI', 'MSI'];

const productCategories = ['CPU', 'RAM', 'videoСard', 'systemUnit', 'HDD', 'SSD', 'LAN'];

const productPrices = [1000, 2000, 3000, 1500, 2700];

function makeRandomString(length: number) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

const getRandomIndex = (length: number) => Math.floor(Math.random() * length);

export const createRandomOperation = (createdAt: string): IOperation => {
  const operationName = productNames[getRandomIndex(productNames.length)];
  const productCategory = productCategories[getRandomIndex(productCategories.length)];
  const productPrice = productPrices[getRandomIndex(productPrices.length)];
  const type = getRandomIndex(2) ? EOperation.Cost : EOperation.Profit;

  return {
    createdAt,
    type,
    id: makeRandomString(5),
    name: operationName,
    amount: productPrice,
    desc: `description to ${operationName}`,
    category: {
      id: makeRandomString(5),
      name: productCategory,
    },
  };
};
