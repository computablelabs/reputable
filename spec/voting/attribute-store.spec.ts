import * as ganache from 'ganache-cli'
import store from '../../src/redux/store'
import { State } from '../../src/interfaces'
import { deployAttributeStore, resetAttributeStore } from '../../src/redux/dispatchers/attribute-store'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { getAttributeStoreAddress } from '../../src/redux/selectors'
import { getWeb3 } from '../../src/helpers'

describe('deploying an attribute store contract', () => {
  let server:any,
    accounts:string[]

  beforeAll( async () => {
    server = ganache.server({ ws:true })
    server.listen(8558)
    // in actual use you'll put the ws host in the state tree, but not needed here
    const web3 = await getWeb3({
      force: true,
      address: 'ws://localhost:8558',
    })
    accounts = await web3.eth.getAccounts()

    participate('Sir Admin Pants', accounts[0])
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
    await deployAttributeStore(accounts[0])
    const state: State = store.getState()
    const attributeStoreAddress = getAttributeStoreAddress(state)

    expect(attributeStoreAddress).toBeTruthy()
    expect(attributeStoreAddress && attributeStoreAddress.length).toBe(42)
  })
})
