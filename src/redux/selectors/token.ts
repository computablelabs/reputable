import {
  State,
  Token,
} from '../../interfaces'

const token = (state:State): Token|undefined => state.token

const address = (state:State): string|undefined => state.token && state.token.address

export {
  token,
  address,
}
