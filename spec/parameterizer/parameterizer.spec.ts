import * as ganache from 'ganache-cli'
import Web3 from 'web3'
import { TransactionReceipt } from 'web3/types.d'
import store from '../../src/redux/store'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import subscriber from '../../src/redux/subscriber'
import { deployToken, resetToken } from '../../src/redux/dispatchers/token'
import { deployVoting, resetVoting } from '../../src/redux/dispatchers/voting'
import { deployParameterizer } from '../../src/redux/dispatchers/parameterizer'
import { Parameterizer } from '../../src/interfaces'
import { deployDll, resetDll } from '../../src/redux/dispatchers/dll'
import { deployAttributeStore, resetAttributeStore } from '../../src/redux/dispatchers/attribute-store'
import { parameterizer, address as parameterizerAddress } from '../../src/redux/selectors/parameterizer'
import {
  State,
  Token,
  Voting,
  Selector,
} from '../../src/interfaces'

describe('parameterizer state', () => {
  let server:any,
    provider:any,
    web3:Web3,
    state:State,
    accounts:string[]

  beforeAll(async () => {
    server = ganache.server({ ws:true })
    server.listen(8559)
    // so that the provider is available to be re-created on demand
    setWebsocketAddress('ws://localhost:8559')
    // in actual use you'll put the ws host in the state tree, but not needed here
    web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8559'))
    accounts = await web3.eth.getAccounts()

    participate('team admin', accounts[0])

    // p11r will want a token deployed
    await deployToken(accounts[0])
    // voting deploy demands that dll and attrStore be deployed
    await deployDll(accounts[0])
    await deployAttributeStore(accounts[0])
    await deployVoting(accounts[0])
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

  it('begins with unhydrated parameterizer', () => {
    expect(parameterizerAddress(store.getState())).toBeFalsy()
  })

  describe('deployment', () => {
    it('deploys the parameterizer contract, placing address in the state tree', async () => {
      // that the actual ws->redux events are working...
      const deployListener = (p11r:Parameterizer) => { console.log(p11r) },
        unsub:any = subscriber(deployListener, parameterizer)

      await deployParameterizer(accounts[0])

      const addr = parameterizerAddress(store.getState())

      expect(addr).toBeTruthy()
      // hashed addresses are always 42 chars
      expect(addr && addr.length).toBe(42)
    })
  })
})
