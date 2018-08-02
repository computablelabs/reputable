import store from '../../src/redux/store'
import { PARTICIPATE } from '../../src/constants'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { State } from '../../src/interfaces'

import { getParticipants } from '../../src/redux/selectors'

describe('Participants state', () => {
  afterEach(() => {
    resetParticipants()
  })

  it('has the correct default state', () => {
    const state:State = store.getState()
    const participants = getParticipants(state)

    expect(Array.isArray(participants)).toBe(true)
    expect(participants && participants.length).toBe(0)
  })

  it('will add a participant', () => {
    participate('team awesome', '0x4242424242424242424242424242424242424242')

    const state:State = store.getState()
    const participants = getParticipants(state)
    const admin = participants && participants[0]

    expect(admin).toBeTruthy()
    expect(admin && admin.owner).toBe(true)
  })

  it('resets the participants', () => {
    const state:State = store.getState()
    const participants = getParticipants(state)

    expect(Array.isArray(participants)).toBe(true)
    expect(participants && participants.length).toBe(0)
  })

  it('only sets the first participant as owner', () => {
    participate('team awesome', '0x123')
    participate('team awesomer', '0x456')

    const state:State = store.getState()
    const participants = getParticipants(state)
    const admin = participants && participants[0]
    const notAdmin = participants && participants[1]

    expect(admin).toBeTruthy()
    expect(admin && admin.owner).toBe(true)
    expect(admin && admin.name).toBe('team awesome')
    expect(notAdmin).toBeTruthy()
    expect(notAdmin && notAdmin.name).toBe('team awesomer')
    expect(notAdmin && notAdmin.owner).toBe(false)
  })

})
