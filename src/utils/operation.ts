import { EOperation, IOperation } from "interfaces/operation";

interface IsortedOnTypeOperation extends Record<EOperation, IOperation[]> { }
interface IsortedOnCategoryOperation extends Record<string, IOperation[]> { }

export const getOperationsSortedOnType = (operations: IOperation[]) => {
  const sortedOperation: IsortedOnTypeOperation = {
    [EOperation.Cost]: [],
    [EOperation.Profit]: []
  }

  operations.forEach(operation => {
    sortedOperation[operation.type].push(operation)
  })

  return sortedOperation
}

export const getOperationsListSortedOnCategory = (operations: IOperation[]) => {
  const sortedOperation: IsortedOnCategoryOperation = {}

  operations.forEach(operation => {
    const categoryId = operation.category?.id
    if (sortedOperation[categoryId]) {
      sortedOperation[categoryId].push(operation)
      return
    }
    sortedOperation[categoryId] = [operation]
  })

  return Object.values(sortedOperation)
}

export const getSumFromOperations = (operations: IOperation[]) => operations.reduce((acc, operation) => acc + operation.amount, 0)

export const getSortedNamesAndAmountListOfOperations = (operations: IOperation[]) => {
  const sortedOnTypeOperations = getOperationsListSortedOnCategory(operations)

  const convertedOperations = sortedOnTypeOperations.map(operationsList => ({
    name: operationsList[0].category?.name || "Неизвестно",
    value: getSumFromOperations(operationsList)
  }))


  return convertedOperations.sort((a, b) => b.value - a.value)
}