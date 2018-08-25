import * as ganache from 'ganache-cli'
import store from '../../src/redux/store'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { resetToken } from '../../src/redux/dispatchers/token'
import { deployVoting, resetVoting } from '../../src/redux/dispatchers/voting'
import { resetParameterizer } from '../../src/redux/dispatchers/parameterizer'
import { resetRegistry } from '../../src/redux/dispatchers/registry'
import { deployDll, resetDll } from '../../src/redux/dispatchers/dll'
import { deployAttributeStore, resetAttributeStore } from '../../src/redux/dispatchers/attribute-store'
import { deployToken, approve, transfer } from '../../src/redux/action-creators/token'
import { deployRegistry, apply } from '../../src/redux/action-creators/registry'
import { deployParameterizer } from '../../src/redux/action-creators/parameterizer'
import { State } from '../../src/interfaces'
import { getRegistryAddress } from '../../src/redux/selectors'
import { getWeb3 } from '../../src/initializers'

describe('registry state', () => {
  describe('deployment', () => {
    const port: number = 8447
    const websocketAddress: string = `ws://localhost:${port}`

    let server:any
    let accounts:string[]
    let owner: string

    beforeAll(async () => {
      server = ganache.server({ ws:true })
      server.listen(port)

      setWebsocketAddress(websocketAddress)
      const web3 = await getWeb3(websocketAddress, { force: true })
      accounts = await web3.eth.getAccounts()
      owner = accounts[0]

      participate('Admin, son of Pants', owner)

      // p11r will want a token deployed
      await store.dispatch(deployToken())
      // voting deploy demands that dll and attrStore be deployed
      await deployDll(owner)
      await deployAttributeStore(owner)
      await deployVoting(owner)
      await store.dispatch(deployParameterizer())
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

      await store.dispatch(deployRegistry('the registry'))

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
    let owner: string
    let user: string

    beforeAll(async () => {
      server = ganache.server({ ws:true })
      server.listen(port)

      setWebsocketAddress(websocketAddress)
      const web3 = await getWeb3(websocketAddress, { force: true })
      accounts = await web3.eth.getAccounts()

      owner = accounts[0]
      user = accounts[1]

      participate('Admin, son of Pants', owner)

      // p11r will want a token deployed
      await store.dispatch(deployToken())
      // voting deploy demands that dll and attrStore be deployed
      await deployDll(owner)
      await deployAttributeStore(owner)
      await deployVoting(owner)
      await store.dispatch(deployParameterizer())

      const registryAddress = await store.dispatch(
        deployRegistry('the registry')
      )

      // transfer funds to the spender
      await store.dispatch(
        transfer({ to: user, amount: 100 * 1000 })
      )

      // approve the registry to spend on behalf of the spender
      await store.dispatch(
        approve({ address: registryAddress, amount: 100 * 1000, from: user })
      )
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
      it('a listing to a registry', async () => {
        const listing = 'foo listing'

        const txValues = await store.dispatch(
          apply({ listing, userAddress: user, deposit: 100 })
        )

        expect(txValues.listing).toBe(listing)
        expect(txValues.owner).toBe(user)
        expect(txValues.unstakedDeposit).toBe('100')
        expect(txValues.applicationExpiry).toBeGreaterThan(0)
      })
    })
  })
})

