import * as ganache from 'ganache-cli'
import store from '../../src/redux/store'
import { State } from '../../src/interfaces'
import { resetAttributeStore } from '../../src/redux/dispatchers/attribute-store'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { setWebsocketAddress } from '../../src/redux/action-creators/web3'
import { deployAttributeStore } from '../../src/redux/action-creators/attribute-store'
import { getAttributeStoreAddress } from '../../src/redux/selectors'
import { getWeb3 } from '../../src/initializers'

describe('deploying an attribute store contract', () => {
  const port: number = 8558
  const websocketAddress: string = `ws://localhost:${port}`

  let server:any
  let accounts:string[]
  let owner: string

  beforeAll( async () => {
    server = ganache.server({ ws:true })
    server.listen(port)

    store.dispatch(setWebsocketAddress(websocketAddress))
    const web3 = await getWeb3(websocketAddress, { force: true })
    accounts = await web3.eth.getAccounts()
    owner = accounts[0]

    participate('Sir Admin Pants', owner)
  })

  afterAll(() => {
    server.close()
    // tear it all down as the store is a singleton
    resetParticipants()
    resetWebsocketAddress()
    resetAttributeStore()
  })

  it('does not have an attr store address', () => {
    const state: State = store.getState()
    const attributeStoreAddress = getAttributeStoreAddress(state)

    expect(attributeStoreAddress).toBeFalsy()
  })

  it('has an attr store address', async () => {
    await store.dispatch(deployAttributeStore())
    const state: State = store.getState()
    const attributeStoreAddress = getAttributeStoreAddress(state)

    expect(attributeStoreAddress).toBeTruthy()
    expect(attributeStoreAddress && attributeStoreAddress.length).toBe(42)
  })
})

