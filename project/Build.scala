import sbt._
import Keys._

/**
 * Helper plugin to build the JS project with coffee-script and closure-compiler plugins
 */
object JsBuildPlugin extends Plugin {
  import JsBuildKeys._

  object JsBuildKeys {
    lazy val copyJsm = TaskKey[Set[File]]("copy-jsm", "Copies JS manifest files")
    lazy val copyJs = TaskKey[Set[File]]("copy-js", "Copies JS source files")
  }

  private def copy(from:File, to:File, extension:String) = IO.copy {
    println(from, to)
    for {
      file <- from.descendentsExcept("*." + extension, (".*" - ".") || HiddenFileFilter).get
    } yield (file, new File(to, IO.relativize(from, file).get))
  }

  def jsBuildSettings: Seq[Setting[_]] = inConfig(Compile) {
    Seq(
      copyJsm <<= (resourceDirectory in (Compile, copyJsm), target in (Compile, copyJsm)) map { (resourceDir, targetDir) =>
        copy(resourceDir, targetDir, "jsm")
      },
      copyJs <<= (sourceDirectory in (Compile, copyJs), target in (Compile, copyJs)) map { (sourceDir, targetDir) =>
        copy(sourceDir, targetDir, "js")
      }
    )
  }

}