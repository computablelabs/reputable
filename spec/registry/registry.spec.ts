import * as ganache from 'ganache-cli'
import Web3 from 'web3'
import { TransactionReceipt } from 'web3/types.d'
import store from '../../src/redux/store'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import subscriber from '../../src/redux/subscriber'
import { deployToken, resetToken } from '../../src/redux/dispatchers/token'
import { deployVoting, resetVoting } from '../../src/redux/dispatchers/voting'
import { deployParameterizer, resetParameterizer } from '../../src/redux/dispatchers/parameterizer'
import { deployRegistry, resetRegistry } from '../../src/redux/dispatchers/registry'
import { Registry } from '../../src/interfaces'
import { deployDll, resetDll } from '../../src/redux/dispatchers/dll'
import { deployAttributeStore, resetAttributeStore } from '../../src/redux/dispatchers/attribute-store'
import { registry, address as registryAddress } from '../../src/redux/selectors/registry'
import {
  State,
  Token,
  Voting,
  Selector,
} from '../../src/interfaces'

describe('registry state', () => {
  let server:any,
    provider:any,
    web3:Web3,
    state:State,
    accounts:string[]

  beforeAll(async () => {
    server = ganache.server({ ws:true })
    server.listen(8447)
    // so that the provider is available to be re-created on demand
    setWebsocketAddress('ws://localhost:8447')
    // in actual use you'll put the ws host in the state tree, but not needed here
    web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8447'))
    accounts = await web3.eth.getAccounts()

    participate('Admin, son of Pants', accounts[0])

    // p11r will want a token deployed
    await deployToken(accounts[0])
    // voting deploy demands that dll and attrStore be deployed
    await deployDll(accounts[0])
    await deployAttributeStore(accounts[0])
    await deployVoting(accounts[0])
    await deployParameterizer(accounts[0])
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
    resetParameterizer()
    resetRegistry()
  })

  it('begins with unhydrated registry', () => {
    expect(registryAddress(store.getState())).toBeFalsy()
  })

  describe('deployment', () => {
    it('deploys the registry contract, placing address in the state tree', async () => {
      // that the actual ws->redux events are working...
      // const deployListener = (reg:Registry) => { console.log(reg) },
        // unsub:any = subscriber(deployListener, registry)

      await deployRegistry('the registry', accounts[0])

      const addr = registryAddress(store.getState())

      expect(addr).toBeTruthy()
      // hashed addresses are always 42 chars
      expect(addr && addr.length).toBe(42)
    })
  })
})
