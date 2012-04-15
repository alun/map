###
  Helper function to make an exports to global namespace

  Sample usage:

<pre>
  exportGlobals({
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
  exportGlobals com: domain: logging {
    Log: -> Log
  }
</pre>

  After that contents of defined package is merged into global namespace.
###

merge = (source, target, path) ->
  for field, value of source
    curPath = (path ? []).concat(field)
    if typeof value == "object"
      target[field] ?= {}
      merge value, target[field], curPath
    else
      console.log "Caution! Overriding " + curPath.join(".") if target[field]? and console? and console.log?
      target[field] = value

exportGlobals = (packageContent) -> merge packageContent, window

# export export function to the window namespace
exportGlobals {
  exportGlobals: exportGlobals
  com: katlex: utils: mergeObjects: (source, target) -> merge source, target
}