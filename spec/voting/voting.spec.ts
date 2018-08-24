import * as ganache from 'ganache-cli'
import store from '../../src/redux/store'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { resetToken } from '../../src/redux/dispatchers/token'
import { deployVoting, resetVoting } from '../../src/redux/dispatchers/voting'
import { deployDll, resetDll } from '../../src/redux/dispatchers/dll'
import { deployAttributeStore, resetAttributeStore } from '../../src/redux/dispatchers/attribute-store'
import { deployToken } from '../../src/redux/action-creators/token'
import { address as votingAddress } from '../../src/redux/selectors/voting'
import { getWeb3 } from '../../src/initializers'

describe('voting state', () => {
  const port: number = 8556
  const websocketAddress: string = `ws://localhost:${port}`

  let server:any
  let accounts:string[]

  beforeAll(async () => {
    server = ganache.server({ ws:true })
    server.listen(port)

    setWebsocketAddress(websocketAddress)
    const web3 = await getWeb3(websocketAddress, { force: true })
    accounts = await web3.eth.getAccounts()

    participate('Admin, Pants III', accounts[0])

    // expects a deployed token
    await store.dispatch(deployToken())
    // voting deploy demands that dll and attrStore be deployed first
    await deployDll(accounts[0])
    await deployAttributeStore(accounts[0])
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
    expect(votingAddress(store.getState())).toBeFalsy()
  })

  describe('deployment', () => {
    it('deploys the voting contract, placing address in the state tree', async () => {
      // that the actual ws->redux events are working...
      // const deployListener = (voting:Voting) => { console.log(voting) },
        // unsub:any = subscriber(deployListener, voting)

      await deployVoting(accounts[0])

      const addr = votingAddress(store.getState())

      expect(addr).toBeTruthy()
      // hashed addresses are always 42 chars
      expect(addr && addr.length).toBe(42)
    })
  })
})
