import store from '../../src/redux/store'
import { State } from '../../src/interfaces'
import { resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { setWebsocketAddress } from '../../src/redux/action-creators/web3'
import { getWebsocketAddress } from '../../src/redux/selectors'

describe('Instantiating a web3 with the provider address', () => {
  afterEach(() => {
    resetWebsocketAddress()
  })

  it('does not have a truthy web3', () => {
    const state: State = store.getState()
    const websocketAddress: string = getWebsocketAddress(state)

    expect(websocketAddress).toBeFalsy()
  })

  it('has a websocket address', () => {
    const address: string = 'ws://localhost:8546'

    store.dispatch(setWebsocketAddress(address))

    const state: State = store.getState()
    const websocketAddress: string = getWebsocketAddress(state)

    expect(websocketAddress).toBe(address)
  })

  it('has a functioning reset', () => {
    const state: State = store.getState()
    const websocketAddress: string = getWebsocketAddress(state)

    expect(websocketAddress).toBeFalsy()
  })
})

