import * as core from '@actions/core'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    core.info(`Hello World`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
