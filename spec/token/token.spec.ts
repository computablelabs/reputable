import * as ganache from 'ganache-cli'
import Web3 from 'web3'
import { TransactionReceipt } from 'web3/types.d'
import store from '../../src/redux/store'
import { DEPLOY_TOKEN, DEPLOYED_TOKEN } from '../../src/constants'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import subscriber from '../../src/redux/subscriber'
import { maybeParseInt } from 'computable/dist/helpers'
import Erc20 from 'computable/dist/contracts/erc-20'
import {
  deployToken,
  resetToken,
  approve,
  transfer,
} from '../../src/redux/dispatchers/token'
import {
  State,
  Token,
  Selector,
  Void,
  Approval,
  Transfer
} from '../../src/interfaces'
import {
  token,
  address,
  approvals,
  transfers,
} from '../../src/redux/selectors/token'

describe('token state', () => {
  let server:any,
    provider:any,
    web3:Web3,
    state:State,
    accounts:string[]

  beforeAll(async () => {
    server = ganache.server({ ws:true })
    server.listen(8544)
    // so that the provider is available to be re-created on demand
    setWebsocketAddress('ws://localhost:8544')
    // in actual use you'll put the ws host in the state tree, but not needed here
    web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8544'))
    accounts = await web3.eth.getAccounts()

    participate('Mr. Admin Pants', accounts[0])
  })

  afterAll(() => {
    server.close()
    // tear it all down as the store is a singleton
    resetParticipants()
    resetWebsocketAddress()
  })

  it('begins with unhydrated token', () => {
    expect(address(store.getState())).toBeFalsy()
  })

  describe('deployment', () => {
    it('can deploy a token, placing the address in the state tree', async () => {
        // redux will call this on stae changes, token as arg because of the use of the selector above
        // const deployListener = (token:Token) => { console.log(token) },
        // unsubscribe:any = subscriber(deployListener, token)

      // we could ref the returned address but we are more interested in the state tree as a user will be
      // using subscriptions to react on store changes...
      const tokenAddress = await deployToken(accounts[0], 1000000),
        addr = address(store.getState())

      expect(addr).toBeTruthy()
      // hashed addresses are always 42 chars
      expect(addr && addr.length).toBe(42)
    })

    it('has assigned the initial funds to the admin address', async () => {
      const addr = address(store.getState()) || '',
        contract = addr && new Erc20(accounts[0])

      contract && await contract.at(web3, { address:addr }) // will be same as tokenAddress

      const funds = contract && await contract.balanceOf(accounts[0]) || 0

      expect(maybeParseInt(funds)).toBe(1000000)
    })
  })

  describe('approvals', () => {
    it('lets admin approve other contract to spend', async () => {
      let apps = approvals(store.getState())

      expect(apps && apps.length).toBe(0)

      // observe the state tree in action with these
        // approvalListener = (approvals:Approval[]) => { console.log(approvals) },
        // unsubscribe:any = subscriber(approvalListener, approvals)

      // we'll just use the 2nd account address in lieu of another deployed contract.
      // @ts-ignore:2532
      const tx:TransactionReceipt = await approve(accounts[1], 500000, accounts[0])
      expect(tx).toBeTruthy()
      // console.log(tx)

      apps = approvals(store.getState())

      expect(approvals && approvals.length).toBe(1)
    })
  })

  describe('transfers', () => {
    it('fund another account from the tokens funds', async () => {
      state = store.getState()

      let trans = transfers(state)

      expect(trans && trans.length).toBe(0)

      // observe the state tree in action with these
        // transferListener = (transfers:Transfer[]) => { console.log(transfers) },
        // unsubscribe:any = subscriber(transferListener, transfers)

      // we'll just use the 3rd account address in lieu of another deployed contract.
      // @ts-ignore:2532
      const tx:TransactionReceipt = await transfer(accounts[2], 500000, accounts[0]) // to, amount, from
      expect(tx).toBeTruthy()

      trans = transfers(store.getState())

      expect(trans && trans.length).toBe(1)
    })

    it('actually transferred the funds to the other account', async () => {
      state = store.getState()

      const addr = address(state) || '',
        contract = addr && new Erc20(accounts[0])

      contract && await contract.at(web3, { address:addr })

      const funds2 = contract && await contract.balanceOf(accounts[2]) || 0
      expect(maybeParseInt(funds2)).toBe(500000)

      // account 0 has been subtracted from...
      const funds0 = contract && await contract.balanceOf(accounts[0]) || 0
      expect(maybeParseInt(funds0)).toBe(500000)
    })
  })

})
