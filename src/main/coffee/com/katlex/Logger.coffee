class Logger
  Level = (name, value) -> name: name, value: value

  @DEBUG:     Level("DEBUG", 0)
  @INFO:      Level("INFO", 1)
  @WARNING:   Level("WARNING", 2)
  @ERROR:     Level("ERROR", 3)
  @FATAL:     Level("FATAL", 4)

  conf = root: Logger.FATAL

  realLog = (levelName, loggerName, msg) ->
    now = new Date().getTime()
    console.log [now, "[" + levelName + "]", loggerName, "-", msg].join(" ") if console? && console.log?

  @create: (name) -> new Logger(name)
  @setup: (newConf) -> com.katlex.utils.mergeObjects conf, newConf

  constructor: (name) -> @name = name.split(".")

  debug: (msg) -> @log Logger.DEBUG, msg
  info: (msg)  -> @log Logger.INFO, msg
  warn: (msg)  -> @log Logger.WARNING, msg
  error: (msg) -> @log Logger.ERROR, msg
  fatal: (msg) -> @log Logger.FATAL, msg

  log: (level, msg) -> realLog(level.name, @name.join("."), msg) if @hasLevel(level)

  hasLevel: (level) ->
    minLevel = conf.root
    for part in @name
      if !conf[part] then break
      minLevel = conf[part]
    level.value >= minLevel.value

exportGlobals com: katlex: Logger: Logger