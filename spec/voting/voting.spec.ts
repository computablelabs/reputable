import * as ganache from 'ganache-cli'
import store from '../../src/redux/store'
import { State } from '../../src/interfaces'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { resetToken } from '../../src/redux/dispatchers/token'
import { resetVoting } from '../../src/redux/dispatchers/voting'
import { resetDll } from '../../src/redux/dispatchers/dll'
import { resetAttributeStore } from '../../src/redux/dispatchers/attribute-store'
import { setWebsocketAddress } from '../../src/redux/action-creators/web3'
import { deployToken } from '../../src/redux/action-creators/token'
import { deployAttributeStore } from '../../src/redux/action-creators/attribute-store'
import { deployDll } from '../../src/redux/action-creators/dll'
import { deployVoting } from '../../src/redux/action-creators/voting'
import { getVotingAddress } from '../../src/redux/selectors'
import { getWeb3 } from '../../src/initializers'

describe('voting state', () => {
  const port: number = 8556
  const websocketAddress: string = `ws://localhost:${port}`

  let server:any
  let accounts:string[]
  let owner: string

  beforeAll(async () => {
    server = ganache.server({ ws:true })
    server.listen(port)

    store.dispatch(setWebsocketAddress(websocketAddress))
    const web3 = await getWeb3(websocketAddress, { force: true })
    accounts = await web3.eth.getAccounts()
    owner = accounts[0]

    participate('Admin, Pants III', owner)

    // expects a deployed token
    await store.dispatch(deployToken())
    // voting deploy demands that dll and attrStore be deployed first
    await store.dispatch(deployDll())
    await store.dispatch(deployAttributeStore())
  })

  afterAll(() => {
    server.close()
    // tear it all down as the store is a singleton
    resetParticipants()
    resetWebsocketAddress()
    resetToken()
    resetDll()
    resetAttributeStore()
    resetVoting()
  })

  it('begins with unhydrated voting', () => {
    const state: State = store.getState()
    const address: string = getVotingAddress(state)

    expect(address).toBeFalsy()
  })

  describe('deployment', () => {
    it('deploys the voting contract, placing address in the state tree', async () => {
      // that the actual ws->redux events are working...
      // const deployListener = (voting:Voting) => { console.log(voting) },
        // unsub:any = subscriber(deployListener, voting)

      await store.dispatch(deployVoting())

      const state: State = store.getState()
      const address: string = getVotingAddress(state)

      expect(address).toBeTruthy()
      // hashed addresses are always 42 chars
      expect(address && address.length).toBe(42)
    })
  })
})

