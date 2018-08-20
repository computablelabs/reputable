import * as ganache from 'ganache-cli'
import store from '../../src/redux/store'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { deployToken, resetToken } from '../../src/redux/dispatchers/token'
import { deployVoting, resetVoting } from '../../src/redux/dispatchers/voting'
import { deployDll, resetDll } from '../../src/redux/dispatchers/dll'
import { deployAttributeStore, resetAttributeStore } from '../../src/redux/dispatchers/attribute-store'
import { address as votingAddress } from '../../src/redux/selectors/voting'
import { getWeb3 } from '../../src/helpers'

describe('voting state', () => {
  let server:any,
    accounts:string[]

  beforeAll(async () => {
    server = ganache.server({ ws:true })
    server.listen(8556)
    // in actual use you'll put the ws host in the state tree, but not needed here
    const web3 = await getWeb3({
      force: true,
      address: 'ws://localhost:8556',
    })
    accounts = await web3.eth.getAccounts()

    participate('Admin, Pants III', accounts[0])

    // expects a deployed token
    await deployToken(accounts[0])
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
