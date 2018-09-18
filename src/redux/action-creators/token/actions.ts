// Dependencies
import { Erc20DeployParams } from 'computable/dist/interfaces'

// Local Dependencies
import {
  FSA,
  Deployed,
  Map,
  Approval,
  Transfer,
} from '../../../interfaces'

/* Action Types */
export const TOKEN_RESET = 'TOKEN_RESET'

export const TOKEN_DEPLOY_REQUEST = 'TOKEN_DEPLOY_REQUEST'
export const TOKEN_DEPLOY_OK = 'TOKEN_DEPLOY_OK'
export const TOKEN_DEPLOY_ERROR = 'TOKEN_DEPLOY_ERROR'

export const TOKEN_ADDRESS_OK = 'TOKEN_ADDRESS_OK'
export const TOKEN_ADDRESS_RESET = 'TOKEN_ADDRESS_RESET'

export const TOKEN_APPROVE_REQUEST = 'TOKEN_APPROVE_REQUEST'
export const TOKEN_APPROVE_OK = 'TOKEN_APPROVE_OK'
export const TOKEN_APPROVE_ERROR = 'TOKEN_APPROVE_ERROR'
export const TOKEN_APPROVE_RESET = 'TOKEN_APPROVE_RESET'

export const TOKEN_TRANSFER_REQUEST = 'TOKEN_TRANSFER_REQUEST'
export const TOKEN_TRANSFER_OK = 'TOKEN_TRANSFER_OK'
export const TOKEN_TRANSFER_ERROR = 'TOKEN_TRANSFER_ERROR'
export const TOKEN_TRANSFER_RESET = 'TOKEN_TRANSFER_RESET'

/* Actions */
// General
export const tokenReset = (): FSA => ({
  type: TOKEN_RESET,
  payload: {},
})

// Deploy
export const tokenDeployRequest = (value: Erc20DeployParams): FSA => ({
  type: TOKEN_DEPLOY_REQUEST,
  payload: value,
})

export const tokenDeployOk = (value: Erc20DeployParams): FSA => ({
  type: TOKEN_DEPLOY_OK,
  payload: value,
})

export const tokenDeployError = (value: Error): FSA => ({
  type: TOKEN_DEPLOY_ERROR,
  payload: value,
})

// Address
export const tokenAddressOk = (value: Deployed): FSA => ({
  type: TOKEN_ADDRESS_OK,
  payload: value,
})

export const tokenAddressReset = (): FSA => ({
  type: TOKEN_ADDRESS_RESET,
  payload: {},
})

// Approve
export const tokenApproveRequest = (value: Map): FSA => ({
  type: TOKEN_APPROVE_REQUEST,
  payload: value,
})

export const tokenApproveOk = (value: Approval): FSA => ({
  type: TOKEN_APPROVE_OK,
  payload: value,
})

export const tokenApproveError = (value: Error): FSA => ({
  type: TOKEN_APPROVE_ERROR,
  payload: value,
})

export const tokenApproveReset = (): FSA => ({
  type: TOKEN_APPROVE_RESET,
  payload: {},
})

// Transfer
export const tokenTransferRequest = (value: Map): FSA => ({
  type: TOKEN_TRANSFER_REQUEST,
  payload: value,
})

export const tokenTransferOk = (value: Transfer): FSA => ({
  type: TOKEN_TRANSFER_OK,
  payload: value,
})

export const tokenTransferError = (value: Error): FSA => ({
  type: TOKEN_TRANSFER_ERROR,
  payload: value,
})

export const tokenTransferReset = (): FSA => ({
  type: TOKEN_TRANSFER_RESET,
  payload: {},
})

