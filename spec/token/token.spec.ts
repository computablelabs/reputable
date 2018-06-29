import * as ganache from 'ganache-cli'
import store from '../../src/redux/store'
import { DEPLOY_TOKEN, DEPLOYED_TOKEN } from '../../src/constants'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWeb3 } from '../../src/redux/dispatchers/web3'
import { deployToken, resetToken } from '../../src/redux/dispatchers/token'
import { State, Token, Selector, Void } from '../../src/interfaces'
import subscriber from '../../src/redux/subscriber'

describe('token state', () => {
  let server:any,
    provider:any,
    state:State,
    accounts:string[]

  beforeAll(async () => {
    server = ganache.server({ ws:true })
    server.listen(8544)
    // we'll need web3 setup with a ws provider
    setWebsocketAddress('ws://localhost:8544')
    // we'll need web3's eth accounts
    state = store.getState()
    // @ts-ignore:2532
    accounts = await state.web3.eth.getAccounts()

    participate('Mr. Admin Pants', accounts[0])
  })

  afterAll(() => {
    server.close()
    // tear it all down as the store is a singleton
    resetParticipants()
    resetWeb3()
  })

  it('begins with unhydrated token', () => {
    state = store.getState()
    expect(state.token && state.token.address).toBeFalsy()
  })

  it('can deploy a token, placing the address in the state tree', async () => {
    // const tokenSelector = (state:State): Token|undefined => state.token,
      // redux will call this on stae changes, token as arg because of the use of the selector above
      // deployListener = (token:Token) => { console.log(token) },
      // unsubscribe:any = subscriber(deployListener, tokenSelector)

    // we could ref the returned address but we are more interested in the state tree as a user will be
    // using subscriptions to react on store changes...
    await deployToken(accounts[0], 1000000)
    state = store.getState()
    expect(state.token && state.token.address).toBeTruthy()
    // hashed addresses are always 42 chars
    expect(state.token && state.token.address && state.token.address.length).toBe(42)
  })

  it('has assigned the initial funds to the admin address', async () => {

  })
})
