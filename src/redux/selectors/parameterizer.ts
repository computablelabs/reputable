import { State, Parameterizer } from '../../interfaces'

const parameterizer = (state:State): Parameterizer|undefined => state.parameterizer

const address = (state:State): string|undefined => state.parameterizer && state.parameterizer.address

export {
  parameterizer,
  address,
}
