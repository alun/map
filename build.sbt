seq(coffeeSettings: _*)

seq(closureSettings:_*)

seq(copyJsmSettings:_*)

(resourceManaged in (Compile, CoffeeKeys.coffee)) <<= (target in Compile)(_ / "js")

(sourceDirectory in (Compile, ClosureKeys.closure)) <<= (target in Compile)(_ / "js")

(classDirectory in (Compile, CopyJsmKeys.copyJsm)) <<= (target in Compile)(_ / "js")

(ClosureKeys.closure in Compile) <<= (ClosureKeys.closure in Compile).dependsOn(
    CopyJsmKeys.copyJsm in Compile, CoffeeKeys.coffee in Compile)

(resourceManaged in (Compile, ClosureKeys.closure)) <<= (target in Compile)(x => x)

ClosureKeys.outAppend in (Compile, ClosureKeys.closure) <<= version(v => "%s-min".format(v))

organization := "com.katlex"

scalaVersion := "2.9.1"

version      := "0.1"

// to use for debug
//ClosureKeys.prettyPrint in Compile := true
