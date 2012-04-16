organization := "com.katlex"

scalaVersion := "2.9.1"

version      := "0.1"

seq(coffeeSettings: _*)

seq(closureSettings:_*)

seq(jsBuildSettings:_*)

ClosureKeys.outAppend in (Compile, ClosureKeys.closure) <<= version(v => "%s".format(v))

resourceManaged in (Compile, CoffeeKeys.coffee) <<= target(_ / "js")

sourceDirectory in (Compile, ClosureKeys.closure) <<= target(_ / "js")

sourceDirectory in (Compile, JsBuildKeys.copyJs) <<= (sourceDirectory in Compile)(_ / "js")

target in (Compile, JsBuildKeys.copyJs) <<= target(_ / "js")

target in (Compile, JsBuildKeys.copyJsm) <<= target(_ / "js")

ClosureKeys.closure in Compile <<= (ClosureKeys.closure in Compile).dependsOn(
    JsBuildKeys.copyJsm in Compile, CoffeeKeys.coffee in Compile, JsBuildKeys.copyJs in Compile)

watchSources ~= { sources =>
  sources.filter { f =>
    f.getPath.indexOf("target") == -1
  }
}

(resourceManaged in (Compile, ClosureKeys.closure)) <<= (target in Compile)(x => x)

// to use for debug
ClosureKeys.prettyPrint in Compile := true