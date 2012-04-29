class Logger
  class Level
    constructor: (@name, @value) ->

  @DEBUG:     new Level("DEBUG", 0)
  @INFO:      new Level("INFO", 1)
  @WARNING:   new Level("WARNING", 2)
  @ERROR:     new Level("ERROR", 3)
  @FATAL:     new Level("FATAL", 4)

  conf = root: Logger.FATAL

  realLog = (levelName, loggerName, msg) ->
    now = new Date().getTime()
    console.log [now, "[" + levelName + "]", loggerName, "-", msg].join(" ") if console? && console.log?

  @create: (name) -> new Logger(name)
  @setup: (newConf) -> com.katlex.utils.mergeObjects newConf, conf, (v) -> v instanceof Level

  constructor: (name) -> @name = name.split(".")

  debug: (msg) -> @log Logger.DEBUG, msg
  info: (msg)  -> @log Logger.INFO, msg
  warn: (msg)  -> @log Logger.WARNING, msg
  error: (msg) -> @log Logger.ERROR, msg
  fatal: (msg) -> @log Logger.FATAL, msg

  log: (level, msg) -> realLog(level.name, @name.join("."), msg) if @hasLevel(level)

  hasLevel: (level) ->
    confVisitor = conf
    minLevel = confVisitor.root
    for part in @name
      confVisitor = confVisitor[part]
      if !confVisitor then break
      minLevel = confVisitor if confVisitor instanceof Level
    level.value >= minLevel.value

exportGlobals com: katlex: Logger: Logger