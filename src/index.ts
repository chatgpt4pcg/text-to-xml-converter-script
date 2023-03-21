import { appendLog, createLogFolder, createOutputFolder, listAllDirs, listAllFiles, listCharactersDirs } from './file-utils';

import { convertTextToXML } from 'chatgpt4pcg';
import fs from 'fs'
import parseArgs from 'minimist'
import path from 'path'

const STAGE = 'intermediate'
const OUTPUT_NAME = 'levels'

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const argv = process.platform === 'win32' ? args['_'] : args['s']
  if (argv === undefined) {
    throw Error('Insufficient parameters to work with.')
  }

  const sourceFolder = argv + '/'
  const sFolder = path.posix.resolve(sourceFolder)

  const logFolderPath = await createLogFolder(sFolder)
  const teamFolders = await listAllDirs(sFolder)
  for (const team of teamFolders) {
    const teamLog = `[${new Date().toISOString().replaceAll(':', '_')}] Processing - team: ${team}`
    await appendLog(logFolderPath, teamLog)
    const path1 = path.posix.join(sFolder, team)
    let characters = [] as string[]
    try {
      characters = await listCharactersDirs(path1, STAGE)
    } catch (e) {
      const teamLog = `[${new Date().toISOString().replaceAll(':', '_')}] Processing - team: ${team} - Failed`
      if (e instanceof Error) {
        await appendLog(logFolderPath, `${teamLog} - ${e.message.toString()}`)
      } else if (typeof e === 'string') {
        await appendLog(logFolderPath, `${teamLog} - ${e}`)
      }
    }

    if (characters.length !== 0) {
      for (const character of characters) {
        const characterLog = `[${new Date().toISOString().replaceAll(':', '_')}] Processing - team: ${team} - character: ${character}`
        await appendLog(logFolderPath, characterLog)
        const path2 = path.posix.join(path1, STAGE, character)
        const trials = await listAllFiles(path2)
        if (trials.length !== 0) {
          for (const trial of trials) {
            const trialLog = `[${new Date().toISOString().replaceAll(':', '_')}] Processing - team: ${team} - character: ${character} - trial: ${trial}`
            await appendLog(logFolderPath, trialLog)
            const filePath = path.posix.join(path2, trial)
            const intermediateFileContent = await fs.promises.readFile(filePath)
            const rawResult = intermediateFileContent.toString('utf-8')
            try {
              const fileLog = `[${new Date().toISOString().replaceAll(':', '_')}] Processing - team: ${team} - character: ${character} - trial: ${trial} - Successed`
              const xmlFileResult = convertTextToXML(rawResult)
              const outputPath = await createOutputFolder(path2, OUTPUT_NAME, STAGE)
              const finalFileName = trial.split('.').slice(0, -1).join('.')
              const outputFile = path.posix.join(outputPath, `${finalFileName}.xml`)
              await fs.promises.writeFile(outputFile, xmlFileResult)
              await appendLog(logFolderPath, fileLog)
            } catch (e) {
              const fileLog = `[${new Date().toISOString().replaceAll(':', '_')}] Processing - team: ${team} - character: ${character} - trial: ${trial} - Failed`
              if (e instanceof Error) {
                await appendLog(logFolderPath, `${fileLog} - ${e.message.toString()}`)
              } else if (typeof e === 'string') {
                await appendLog(logFolderPath, `${fileLog} - ${e}`)
              }
            }
          }
        }
      }
    }
  }
}

main()