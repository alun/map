globals {
  com: katlex: logAndAlert: (line) ->
    console.log(line) if console? && console.log?
    alert(line)
}