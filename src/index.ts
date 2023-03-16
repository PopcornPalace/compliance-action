import * as core from '@actions/core';
import * as fs from 'fs';

async function run() {
  try {
    const dir = fs.realpathSync(process.cwd());

    const licenseRegex = /^license.*$/i;
    const licenseFile = fs.readdirSync(dir).find(fileName => licenseRegex.test(fileName));
    if (!licenseFile) {
      throw new Error('License file not found');
    }
    const licenseContent = fs.readFileSync(`${dir}/${licenseFile}`).toString();
    if (!/MIT License|BSD License|Double Good/.test(licenseContent)) {
      throw new Error('Only MIT, BSD and Double Good licenses are allowed');
    }

    const cocRegex = /^code.*conduct.*$/i;
    const cocFile = fs.readdirSync(dir).find(fileName => cocRegex.test(fileName));
    if (!cocFile) {
      throw new Error('Code of Conduct file not found');
    }

    const readmeRegex = /^readme.*$/i;
    const readmeFile = fs.readdirSync(dir).find(fileName => readmeRegex.test(fileName));
    if (!readmeFile) {
      throw new Error('README file not found');
    }
    await core.summary.addRaw("✅ Your repository is compliant.").write();
    core.info('All required files exist');
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
      if (/GPL License|AGPL License|LGPL License/.test(error.message)) {
        core.setFailed(`GPL licenses are not allowed.`);
        await core.summary.addHeading(`❌ GPL licenses are not allowed.`).write();
      } else {
        core.setFailed("error: " + error)
        await core.summary.addRaw(`❌ Error: ${error}`).write();
      }
    } else {
      core.setFailed("error: " + error)
      await core.summary.addRaw(`❌ Error: ${error}`).write();
    }
  }
}

run();
