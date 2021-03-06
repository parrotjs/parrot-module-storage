'use strict'

do ->

  ## -- Private ---------------------------------------------------------------

  _partial = require 'fn-partial'
  _initStorage = do ->
    for key of localStorage
      parrot['local'][key] = _partial _get, 'local', key
    for key of sessionStorage
      parrot['session'][key] = _partial _get, 'session', key

  _storage = (type) ->
    if type is 'local' then localStorage else sessionStorage

  _get = (type, key) ->
    data = _storage(type).getItem key
    try
      data = JSON.parse data
    catch e
      data

  _add = (type, key, data) ->
    data = JSON.stringify data unless typeof data is 'string'
    _storage(type).setItem key, data
    parrot[type][key] = _partial _get, type, key

  _remove = (type, key) ->
    delete parrot[type][key]
    _storage(type).removeItem key

  _removeAll = (type) ->
    delete parrot[type][key] for key of _storage type
    _storage(type).clear()

  _size = (type) ->
    _storage(type).length

  _is = (type, key) ->
    _storage(type)[key]?

  ## -- Public ----------------------------------------------------------------

  parrot.local =
    add: (key, data) ->
      _add 'local', key, data
      this

    remove: ->
      _remove 'local', key for key in arguments
      this

    removeAll: ->
      _removeAll 'local'
      this

    size: ->
      _size 'local'

    isAvailable: (key) ->
      _is 'local', key

  parrot.session =
    get: ->
      _get 'session', 'session'

    add: ->
      if arguments.length is 1
        key  = 'session'
        data = arguments[0]
      else
        key  = arguments[0]
        data = arguments[1]

      _add 'session', key, data
      this

    remove: ->
      if arguments.length is 0
        _remove 'session', 'session'
      else
        _remove 'session', key for key in arguments
      this

    removeAll: ->
      _removeAll 'session'
      this

    size: ->
      _size 'session'

    isAvailable: ->
      key = if arguments.length is 0 then 'session' else arguments[0]
      _is 'session', key
