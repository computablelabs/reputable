import {
  EventEmitter as Web3EventEmitter,
  EventLog,
} from 'web3/types.d'

interface EventEmitter extends Web3EventEmitter {
  unsubscribe: Function
}

export {
  EventEmitter,
  EventLog,
}

