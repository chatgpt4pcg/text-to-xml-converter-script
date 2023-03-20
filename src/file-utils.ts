import fs from 'fs'
import path from 'path'

export async function directoryWalk(sourceFolder: string, callback: (path: string, fileName: string) => void) {
  const files = await fs.promises.readdir(sourceFolder);
  for (const file of files) {
    const fPath = path.posix.join(sourceFolder, file)
    const stats = await fs.promises.stat(fPath)

    if (stats.isDirectory()) {
      const nextFolder = path.posix.join(sourceFolder, file)
      directoryWalk(nextFolder, callback)
    } else {
      callback(fPath, file)
    }
  }
}

export async function replicateFolderStructure(filePath: string, targetFolder: string) {
  const outputPath = filePath.replace(targetFolder, '').split('/').slice(2).join('/');
  
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  outputPath.split('/').slice(-3, -1).reduce((acc, curr) => {
    const folder = path.posix.join(acc, curr)
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    return folder
  }, targetFolder)
}