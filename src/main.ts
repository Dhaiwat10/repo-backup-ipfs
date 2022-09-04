import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from 'fs';
import fetch from 'node-fetch';
import { Web3Storage, getFilesFromPath, Filelike } from 'web3.storage';
import { token } from './creds';

const web3StorageClient = new Web3Storage({
  token
});

async function run(): Promise<void> {
  try {
    const repoOwner = github.context.repo.owner;
    const repoName = github.context.repo.repo;

    const repoContents = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/zipball`
    );

    const repoBuffer = await repoContents.buffer();
    fs.writeFileSync('./repo.zip', repoBuffer);

    // log the newly created zip file's size in megabytes
    const stats = fs.statSync('./repo.zip');
    const fileSizeInMegabytes = stats.size / 1000000.0;
    core.debug(`repo.zip size: ${fileSizeInMegabytes} MB`);

    const files = await getFilesFromPath('./repo.zip');
    const cid = await web3StorageClient.put(files as Iterable<Filelike>);

    core.debug(`cid: ${cid}`);

    core.setOutput('cid', cid);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
