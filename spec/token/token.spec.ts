// Dependencies
import * as ganache from 'ganache-cli'
import Web3 from 'web3'
import Erc20 from 'computable/dist/contracts/erc-20'

// Local Dependencies
import store from '../../src/redux/store'
import { maybeParseInt } from 'computable/dist/helpers'
import { setWebsocketAddress } from '../../src/redux/action-creators/web3'
import { addParticipant } from '../../src/redux/action-creators/participants'
import { deployToken, approve, transfer } from '../../src/redux/action-creators/token'
import ContractObserver from '../../src/redux/observer'
import { State, Participant } from '../../src/interfaces'
import {
  getWebsocketAddress,
  getOwner,
  getParticipants,
  getTokenAddress,
  getApprovals,
  getTransfers,
} from '../../src/redux/selectors'
import { getWeb3 } from '../../src/initializers'
import { deployContracts, resetContracts } from '../helpers'

describe('token state', () => {
  describe('without a deployed contract', () => {
    const port: number = 8544
    const websocketAddress: string = `ws://localhost:${port}`

    let server: any
    let web3: Web3
    let accounts: string[]

    beforeAll(async () => {
      server = ganache.server({ ws:true })
      server.listen(port)

      store.dispatch(setWebsocketAddress(websocketAddress))
      web3 = await getWeb3(websocketAddress, { force: true })
      accounts = await web3.eth.getAccounts()

      await store.dispatch(
        addParticipant('Mr. Admin Pants', accounts[0])
      )
    })

    afterAll(async () => {
      await resetContracts(store, server)
    })

    it('begins with unhydrated token', () => {
      expect(getTokenAddress(store.getState())).toBeFalsy()
    })

    describe('deployment', () => {
      it('can deploy a token, placing the address in the state tree', async () => {
          // redux will call this on stae changes, token as arg because of the use of the selector above
          // const deployListener = (token:Token) => { console.log(token) },
          // unsubscribe:any = subscriber(deployListener, token)

        // we could ref the returned address but we are more interested in the state tree as a user will be
        // using subscriptions to react on store changes...
        await store.dispatch(deployToken(1000000))
        const addr = getTokenAddress(store.getState())

        expect(addr).toBeTruthy()
        // hashed addresses are always 42 chars
        expect(addr && addr.length).toBe(42)
      })

      // TODO this test is not idempotent
      //   It relies on the token contract deployment in the previous test
      it('has assigned the initial funds to the admin address', async () => {
        const state: State = store.getState()
        const owner: Participant|undefined = getOwner(state)
        const address: string = getTokenAddress(state)
        const contract = new Erc20(owner && owner.address)
        await contract.at(web3, { address })
        const funds = contract && await contract.balanceOf(accounts[0]) || 0

        expect(maybeParseInt(funds)).toBe(1000000)
      })
    })
  })

  describe('with a deployed token', () => {
    let server: any
    let web3: Web3
    let participants: Participant[]
    let owner: Participant

    beforeAll(async () => {
      server = await deployContracts(store)

      const state: State = store.getState()

      const websocketAddress: string = getWebsocketAddress(state)
      web3 = getWeb3(websocketAddress)

      owner = getOwner(state) as Participant
      participants = getParticipants(state)
    })

    afterAll(async () => {
      await resetContracts(store, server)
    })

    beforeEach(async () => {
      await ContractObserver.subscribe(store.dispatch, store.getState)
    })

    afterEach(async () => {
      await ContractObserver.unsubscribe()
    })

    describe('approvals', () => {
      it('lets admin approve other contract to spend', async () => {
        const amount = 500 * 1000
        const spender = participants[1]

        let state: State = store.getState()
        let approvals = getApprovals(state)

        expect(approvals && approvals.length).toBe(0)

        // observe the state tree in action with these
          // approvalListener = (approvals:Approval[]) => { console.log(approvals) },
          // unsubscribe:any = subscriber(approvalListener, approvals)

        // we'll just use the 2nd account address in lieu of another deployed contract.
        // @ts-ignore:2532
        await store.dispatch(
          approve({ address: spender.address, amount, from: owner.address })
        )

        state = store.getState()
        approvals = getApprovals(state)
        const approval = approvals[approvals.length - 1]

        expect(approvals.length).toBe(1)
        expect(approval.address).toBe(spender.address)
        expect(approval.from).toBe(owner.address)
        expect(approval.amount).toBe(amount.toString())
      })
    })

    describe('transfers', () => {
      it('fund another account from the tokens funds', async () => {
        const amount = 500 * 1000
        const user = participants[2]

        let state: State = store.getState()
        let transfers = getTransfers(state)

        expect(transfers.length).toBe(0)

        await store.dispatch(
          transfer({ to: user.address, amount, from: owner.address })
        )

        state = store.getState()
        transfers = getTransfers(state)
        const newTransfer = transfers[transfers.length - 1]

        expect(transfers.length).toBe(1)
        expect(newTransfer.to).toBe(user.address)
        expect(newTransfer.from).toBe(owner.address)
        expect(newTransfer.amount).toBe(amount.toString())
      })

      // TODO (geoff) This test is not idempotent...
      //   It relies on the state configured in the spec above.
      it('actually transferred the funds to the other account', async () => {
        const state: State = store.getState()
        const user = participants[2]
        const address: string = getTokenAddress(state)
        const contract: Erc20 = new Erc20(owner.address)
        await contract.at(web3, { address })

        const funds2 = await contract.balanceOf(user.address) || 0
        expect(maybeParseInt(funds2)).toBe(500000)

        // account 0 has been subtracted from...
        const funds0 = await contract.balanceOf(owner.address) || 0
        expect(maybeParseInt(funds0)).toBe(500000)
      })
    })
  })
})

