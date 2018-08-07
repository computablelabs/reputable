import * as ganache from 'ganache-cli'
import Web3 from 'web3'
import store from '../../src/redux/store'
import { State } from '../../src/interfaces'
import { deployDll, resetDll } from '../../src/redux/dispatchers/dll'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { getDllAddress } from '../../src/redux/selectors'

describe('deploying a dll contract', () => {
  let server:any,
    web3:Web3,
    accounts:string[]

  beforeAll(async () => {
    server = ganache.server({ ws:true })
    server.listen(8552)
    // so that the provider is available to be re-created on demand
    setWebsocketAddress('ws://localhost:8552')
    // in actual use you'll put the ws host in the state tree, but not needed here
    web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8552'))
    accounts = await web3.eth.getAccounts()

    participate('Mrs. Admin Pants', accounts[0])
  })

  afterAll(() => {
    server.close()
    // tear it all down as the store is a singleton
    resetParticipants()
    resetWebsocketAddress()
    resetDll()
  })

  it('does not have a dll address', () => {
    const state: State = store.getState()
    const address: string = getDllAddress(state)
    expect(address).toBeFalsy()
  })

  it('has a dll address', async () => {
    await deployDll(accounts[0])

    const state: State = store.getState()
    const address = getDllAddress(state)

    expect(address).toBeTruthy()
    expect(address && address.length).toBe(42)
  })
})

