import { Action, FSA, DeployedToken } from '../../interfaces'
import { Nos } from 'computable/dist/types'
import { Erc20DeployParams } from 'computable/dist/interfaces'
import Erc20 from 'computable/dist/contracts/erc-20'
import {
  DEPLOY_TOKEN,
  DEPLOY_TOKEN_ERROR,
  DEPLOYED_TOKEN,
  RESET_TOKEN,
  TokenDefaults,
} from '../../constants'

const deployToken = (address:string, supply?:Nos): FSA => {
  const payload:Erc20DeployParams = {
    address,
    supply: supply || TokenDefaults.SUPPLY,
  }

  return { type: DEPLOY_TOKEN, payload }
}

const deployedToken = (address:string, contract:Erc20): FSA => {
  const payload:DeployedToken = {address, contract}
  return { type: DEPLOYED_TOKEN, payload }
}

const tokenDeployError = (err:Error): FSA => (
  { type: DEPLOY_TOKEN_ERROR, payload: err }
)

const resetToken = (): Action => ({ type: RESET_TOKEN })

export {
  deployToken,
  deployedToken,
  tokenDeployError,
  resetToken,
}
