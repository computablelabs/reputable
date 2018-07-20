import * as ganache from 'ganache-cli'
import Web3 from 'web3'
import store from '../../src/redux/store'
import { State } from '../../src/interfaces'
import deployAttributeStore from '../../src/redux/dispatchers/attribute-store'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'

describe('deploying an attribute store contract', () => {

  let server:any,
    provider:any,
    web3:Web3,
    state:State,
    accounts:string[]

  beforeAll( async () => {
    server = ganache.server({ ws:true })
    server.listen(8558)
    // so that the provider is available to be re-created on demand
    setWebsocketAddress('ws://localhost:8558')
    // in actual use you'll put the ws host in the state tree, but not needed here
    web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8558'))
    accounts = await web3.eth.getAccounts()

    participate('Sir Admin Pants', accounts[0])
  })

  afterAll(() => {
    server.close()
    // tear it all down as the store is a singleton
    resetParticipants()
    resetWebsocketAddress()
  })

  it('does not have an attr store address', () => {
    const state:State = store.getState()
    expect(state.attributeStoreAddress).toBeFalsy()
  })

  it('has an attr store address', async () => {
    const storeAddress = await deployAttributeStore(accounts[0]),
     state:State = store.getState()
    expect(state.attributeStoreAddress).toBeTruthy()
    expect(state.attributeStoreAddress && state.attributeStoreAddress.length).toBe(42)
  })
})
