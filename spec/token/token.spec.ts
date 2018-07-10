import * as ganache from 'ganache-cli'
import Web3 from 'web3'
import { TransactionReceipt } from 'web3/types.d'
import store from '../../src/redux/store'
import { DEPLOY_TOKEN, DEPLOYED_TOKEN } from '../../src/constants'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { deployToken, resetToken, approve } from '../../src/redux/dispatchers/token'
import subscriber from '../../src/redux/subscriber'
import { maybeParseInt } from 'computable/dist/helpers'
import Erc20 from 'computable/dist/contracts/erc-20'
import {
  State,
  Token,
  Selector,
  Void,
  Approval,
} from '../../src/interfaces'

fdescribe('token state', () => {
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
    state = store.getState()
    expect(state.token && state.token.address).toBeFalsy()
  })

  describe('deployment', () => {
    it('can deploy a token, placing the address in the state tree', async () => {
      // const tokenSelector = (state:State): Token|undefined => state.token,
        // redux will call this on stae changes, token as arg because of the use of the selector above
        // deployListener = (token:Token) => { console.log(token) },
        // unsubscribe:any = subscriber(deployListener, tokenSelector)

      // we could ref the returned address but we are more interested in the state tree as a user will be
      // using subscriptions to react on store changes...
      const tokenAddress = await deployToken(accounts[0], 1000000)
      state = store.getState()
      expect(state.token && state.token.address).toBeTruthy()
      // hashed addresses are always 42 chars
      expect(state.token && state.token.address && state.token.address.length).toBe(42)
    })

    it('has assigned the initial funds to the admin address', async () => {
      state = store.getState()

      const address = state.token && state.token.address,
        contract = address && new Erc20(accounts[0])

      contract && contract.at(web3, { address })

      const funds = contract && await contract.balanceOf(accounts[0]) || 0

      expect(maybeParseInt(funds)).toBe(1000000)
    })
  })

  describe('approvals', () => {
    it('lets admin approve other contract to spend', async () => {
      state = store.getState()

      const approvals = state.token && state.token.approvals

      expect(approvals && approvals.length).toBe(0)

      // observe the state tree in action with these
      // const approvalSelector = (state:State): Approval[]|undefined => state.token && state.token.approvals,
        // approvalListener = (approvals:Approval[]) => { console.log(approvals) },
        // unsubscribe:any = subscriber(approvalListener, approvalSelector)

      // we'll just use the 2nd account address in lieu of another deployed contract.
      // @ts-ignore:2532
      const tx:TransactionReceipt = await approve(accounts[1], 500000, accounts[0])
      expect(tx).toBeTruthy()
    })
  })

})
