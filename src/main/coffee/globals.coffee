###
  Package - global

  Exports globals export helper function.

  Sample usage:

<pre>
  globals({
    com: {
      domain: function() {
        this.a = 1;
      }
    }
  });
</pre>

  Or in coffee:

<pre>
  class Log
  globals com: domain: logging {
    Log: -> Log
  }
</pre>

  After that contents of defined package is merged into global namespace.
###

merge = (source, target, path) ->
  for field, value of source
    pushField = (_) -> _.slice(); _.push(field); _
    path = pushField path ?= []
    if typeof value == "function"
      console.log "Caution! Overriding " + path.join(".") if target[field]? and console? and console.log?
      target[field] = source[field]
    else
      target[field] ?= {}
      merge(source[field], target[field], path)

globals = (packageContent) -> merge packageContent, window

# export globals function to the window namespace
globals {
  globals: globals
}