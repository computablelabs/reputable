import { State } from '../../../interfaces';

const getList = ({
  state,
  model,
  ids,
  predicate = () => true,
}: any) => {
  const slice = state[model]
  if (!slice) {
    return []
  }

  const data = slice.data
  const list = ids ?
    ids.map((id: string) => data[id]).filter((item: any) => !!item) :
    Object.values(data)

  return list.filter(predicate)
}

const getItem = ({
  state,
  model,
  key,
  predicate = () => true,
}: any) => {
  const slice = state[model]
  if (!slice) {
    return undefined
  }

  const item = slice.data[key]

  return predicate(item) ?
    item : undefined
}

export default {
  getList,
  getItem,
}

