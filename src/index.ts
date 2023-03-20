import { directoryWalk, replicateFolderStructure } from './file-utils';

import { convertTextToXML } from 'chatgpt4pcg'
import fs from 'fs'
import parseArgs from 'minimist'
import path from 'path'

const outputFolder = path.posix.resolve('./level/');
const dateTimeString = new Date().toISOString().replaceAll(':', '_')

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const argv = process.platform === 'win32' ? args['_'] : args['s']
  if (argv === undefined) {
    throw Error('Insufficient parameters to work with.')
  }

  const sourceFolder = argv + '/'
  const sFolder = path.posix.resolve(sourceFolder)
  await directoryWalk(sFolder, processFile)
}

async function processFile(filePath: string, file: string) {
  const outputPath = filePath.replace(file, '').split('/').slice(2).join('/');

  if (file.indexOf('.txt') === -1 && file.indexOf('.md') === -1) {
    return
  }

  await replicateFolderStructure(outputPath, outputFolder)

  const raw = await fs.promises.readFile(filePath)
  const text = raw.toString('utf-8')

  const xmlLevel = convertTextToXML(text)
  const logMessage = `${new Date()} - ${file} - File created.`

  console.log(logMessage)

  const finalOutputFolder = outputPath.split('/').slice(-3, -1).join('/')

  await fs.promises.appendFile(path.posix.join(outputFolder, finalOutputFolder, `_log_${dateTimeString}.txt`), logMessage + '\n')
  await fs.promises.writeFile(path.posix.join(outputFolder, finalOutputFolder, file.split('.').slice(0, -1).join('.') + '.xml'), xmlLevel.trim())
}

main()