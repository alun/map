import sbt._
import Keys._

object CopyJsmPlugin extends Plugin {
  import CopyJsmKeys._

  object CopyJsmKeys {
    lazy val copyJsm = TaskKey[Seq[File]]("copy-jsm", "Copies JS manifest files")
  }

  def copyJsmSettings: Seq[Setting[_]] = {
    inConfig(Compile)(Seq(
    copyJsm <<= (resourceDirectory, target) map {
      (resourceDir, targetDir) =>
        val copyTuples = for {
          manifest <- resourceDir.descendentsExcept("*.jsm", (".*" - ".") || HiddenFileFilter).get
        } yield (manifest, new File(targetDir / "js", IO.relativize(resourceDir, manifest).get))
        IO.copy(copyTuples).toSeq
    }))
  }

}