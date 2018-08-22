import * as ganache from 'ganache-cli'
import store from '../../src/redux/store'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { deployToken, resetToken } from '../../src/redux/dispatchers/token'
import { deployVoting, resetVoting } from '../../src/redux/dispatchers/voting'
import { deployParameterizer, resetParameterizer } from '../../src/redux/dispatchers/parameterizer'
import { deployRegistry, resetRegistry } from '../../src/redux/dispatchers/registry'
import { deployDll, resetDll } from '../../src/redux/dispatchers/dll'
import { deployAttributeStore, resetAttributeStore } from '../../src/redux/dispatchers/attribute-store'
import { dispatcher } from '../../src/redux/dispatchers'
import { approve } from '../../src/redux/action-creators/token/approve'
import { transfer } from '../../src/redux/action-creators/token/transfer'
import { apply } from '../../src/redux/action-creators/registry/apply'
import { State } from '../../src/interfaces'
import { getRegistryAddress } from '../../src/redux/selectors'
import { getWeb3 } from '../../src/helpers'

describe('registry state', () => {
  describe('deployment', () => {
    const port: number = 8447
    const websocketAddress: string = `ws://localhost:${port}`

    let server:any
    let accounts:string[]

    beforeAll(async () => {
      server = ganache.server({ ws:true })
      server.listen(port)

      setWebsocketAddress(websocketAddress)
      const web3 = await getWeb3(websocketAddress, { force: true })
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
      const state: State = store.getState()
      const registryAddress: string = getRegistryAddress(state)

      expect(registryAddress).toBeFalsy()
    })

    it('deploys the registry contract, placing address in the state tree', async () => {
      // that the actual ws->redux events are working...
      // const deployListener = (reg:Registry) => { console.log(reg) },
        // unsub:any = subscriber(deployListener, registry)

      await deployRegistry('the registry', accounts[0])

      const state: State = store.getState()
      const registryAddress: string = getRegistryAddress(state)

      expect(registryAddress).toBeTruthy()
      // hashed addresses are always 42 chars
      expect(registryAddress && registryAddress.length).toBe(42)
    })
  })

  describe('with a deployed registry', () => {
    const port: number = 8448
    const websocketAddress: string = `ws://localhost:${port}`

    let server:any
    let accounts:string[]

    beforeAll(async () => {
      server = ganache.server({ ws:true })
      server.listen(port)

      setWebsocketAddress(websocketAddress)
      const web3 = await getWeb3(websocketAddress, { force: true })
      accounts = await web3.eth.getAccounts()

      const owner = accounts[0]
      const user = accounts[1]

      participate('Admin, son of Pants', owner)

      // p11r will want a token deployed
      await deployToken(owner)
      // voting deploy demands that dll and attrStore be deployed
      await deployDll(owner)
      await deployAttributeStore(owner)
      await deployVoting(owner)
      await deployParameterizer(owner)

      const registryAddress = await deployRegistry('the registry', owner)

      // transfer funds to the spender
      await dispatcher(transfer(user, 100 * 1000))

      // approve the registry to spend on behalf of the spender
      await dispatcher(approve(registryAddress, 100 * 1000, user))
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

    describe('apply', () => {
      it('applies a listing to a registry', async () => {
        const state: State = store.getState()
        const registryAddress: string = getRegistryAddress(state)
        const userAddress = accounts[1]
        const listingData = 'foo listing'

        const txValues = await dispatcher(apply(registryAddress, listingData, userAddress, 100))

        expect(txValues.applicant).toBe(userAddress)
        expect(txValues.deposit).toBe('100')
        expect(txValues.appEndDate).toBeGreaterThan(0)
        expect(txValues.listing).toBe(listingData)
      })
    })
  })
})

