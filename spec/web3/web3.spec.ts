import store from '../../src/redux/store'
import { State } from '../../src/interfaces'
import { setWebsocketAddress, resetWeb3 } from '../../src/redux/dispatchers/web3'

describe('Instantiating a web3 with the provider address', () => {
  afterEach(() => {
    resetWeb3()
  })

  it('does not have a truthy web3', () => {
    const state:State = store.getState()
    expect(state.web3).toBeFalsy()
  })

  it('has an instantiated web3', () => {
    setWebsocketAddress('ws://localhost:8546')

    const state:State = store.getState()
    expect(state.web3).toBeTruthy()
  })

  it('has a functioning reset', () => {
    const state:State = store.getState()
    expect(state.web3).toBeFalsy()
  })
})
