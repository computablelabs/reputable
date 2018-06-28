import store from '../../src/redux/store'
import { DEPLOY_TOKEN, DEPLOYED_TOKEN } from '../../src/constants'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWeb3 } from '../../src/redux/dispatchers/web3'
import { deployToken, resetToken } from '../../src/redux/dispatchers/token'
import { State, Token, Selector, Void } from '../../src/interfaces'
import subscriber from '../../src/redux/subscriber'

describe('token state', () => {
  // const mnemonic = 'protect lemon rather regret else gallery parent kite truth inject rebuild witness'
  const adminAddress = '0x3dd6f8bbace2e39200c603fece4e8a3bd7d1387e'
  // let server:any

  beforeAll(() => {
    // we'll need at least an admin and web3
    participate('Mr. Admin Pants', adminAddress)
    // use the same port as you told the server to listen on
    setWebsocketAddress('ws://localhost:8546')
  })

  afterAll(() => {
    // tear it all down as the store is a singleton
    resetParticipants()
    resetWeb3()
  })

  it('begins with unhydrated token', () => {
    const state:State = store.getState()
    expect(state.token && state.token.address).toBeFalsy()
  })

  xit('can deploy a token, placing the address in the state tree', async () => {
    // given the state, return just the token TODO create /selectors
    const tokenSelector = (state:State): Token|undefined => state.token,
      // redux will call this on stae changes, token as arg because of the use of the selector above
      deployListener = (token:Token) => { console.log(token) },
      unsubscribe:any = subscriber(deployListener, tokenSelector)

    deployToken(adminAddress, 1000000)
  })
})
