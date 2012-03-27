runTests = true

# Event dispatcher class (almost like AS3)
class EventDispatcher
  constructor: -> @listeners = {}

  addEventListener: (type, listener) =>
    @listeners[type] ?= []
    @listeners[type].push listener

  dispatchEvent: (event) =>
    targets = @listeners[event.type] ? []
    target.apply(null, [event]) for target in targets

  removeEventListener: (type, listener) =>
    typed = @listeners[type] ? []
    idx = typed.indexOf(listener)
    if idx != -1 then typed.splice(idx, 1)

  hasEventListener: (type) =>
    (@listeners[type] ? []).length != 0

@EventDispatcher = EventDispatcher