import * as ganache from 'ganache-cli'
import store from '../../src/redux/store'
import { State } from '../../src/interfaces'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/action-creators/web3'
import { addParticipant, resetParticipants } from '../../src/redux/action-creators/participants'
import { deployToken, resetToken } from '../../src/redux/action-creators/token'
import { deployAttributeStore, resetAttributeStore } from '../../src/redux/action-creators/attribute-store'
import { deployDll, resetDll } from '../../src/redux/action-creators/dll'
import { deployVoting, resetVoting } from '../../src/redux/action-creators/voting'
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

    await store.dispatch(
      addParticipant('Admin, Pants III', owner)
    )

    // expects a deployed token
    await store.dispatch(deployToken())
    // voting deploy demands that dll and attrStore be deployed first
    await store.dispatch(deployDll())
    await store.dispatch(deployAttributeStore())
  })

  afterAll(async () => {
    server.close()
    // tear it all down as the store is a singleton
    await store.dispatch(resetParticipants())
    await store.dispatch(resetWebsocketAddress())
    await store.dispatch(resetToken())
    await store.dispatch(resetDll())
    await store.dispatch(resetAttributeStore())
    await store.dispatch(resetVoting())
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

