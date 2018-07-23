import * as ganache from 'ganache-cli'
import Web3 from 'web3'
import { TransactionReceipt } from 'web3/types.d'
import store from '../../src/redux/store'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import subscriber from '../../src/redux/subscriber'
import { maybeParseInt } from 'computable/dist/helpers'
import Erc20 from 'computable/dist/contracts/erc-20'
import { deployToken } from '../../src/redux/dispatchers/token'
import { deployVoting } from '../../src/redux/dispatchers/voting'
import deployDll from '../../src/redux/dispatchers/dll'
import deployAttributeStore from '../../src/redux/dispatchers/attribute-store'
import { token, address as tokenAddress } from '../../src/redux/selectors/token'
import { voting, address as votingAddress } from '../../src/redux/selectors/voting'
import {
  State,
  Token,
  Voting,
  Selector,
} from '../../src/interfaces'

describe('voting state', () => {
  let server:any,
    provider:any,
    web3:Web3,
    state:State,
    accounts:string[]

  beforeAll(async () => {
    server = ganache.server({ ws:true })
    server.listen(8556)
    // so that the provider is available to be re-created on demand
    setWebsocketAddress('ws://localhost:8556')
    // in actual use you'll put the ws host in the state tree, but not needed here
    web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8556'))
    accounts = await web3.eth.getAccounts()

    participate('Admin, Pants III', accounts[0])

    // voting deploy demands that dll and attrStore be deployed first
    await deployDll(accounts[0])
    await deployAttributeStore(accounts[0])
  })

  afterAll(() => {
    server.close()
    // tear it all down as the store is a singleton
    resetParticipants()
    resetWebsocketAddress()
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
