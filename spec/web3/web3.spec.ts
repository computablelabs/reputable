import store from '../../src/redux/store'
import { State } from '../../src/interfaces'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
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
    setWebsocketAddress('ws://localhost:8546')

    const state: State = store.getState()
    const websocketAddress: string = getWebsocketAddress(state)

    expect(websocketAddress).toBe('ws://localhost:8546')
  })

  it('has a functioning reset', () => {
    const state: State = store.getState()
    const websocketAddress: string = getWebsocketAddress(state)

    expect(websocketAddress).toBeFalsy()
  })
})
