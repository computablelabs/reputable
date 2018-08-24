import * as ganache from 'ganache-cli'
import store from '../../src/redux/store'
import { State } from '../../src/interfaces'
import { deployDll, resetDll } from '../../src/redux/dispatchers/dll'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { getDllAddress } from '../../src/redux/selectors'
import { getWeb3 } from '../../src/initializers'

describe('deploying a dll contract', () => {
  const port: number = 8552
  const websocketAddress: string = `ws://localhost:${port}`

  let server:any
  let accounts:string[]

  beforeAll(async () => {
    server = ganache.server({ ws:true })
    server.listen(port)

    setWebsocketAddress(websocketAddress)
    const web3 = await getWeb3(websocketAddress, { force: true })
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

