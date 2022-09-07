# repo-backup-ipfs

A GitHub Action that backs up your repository's source code to IPFS.

## How to use

Create a workflow file in your repository at `.github/workflows/repo-backup.yml` with the following contents:

```yaml
name: 'repo-backup'
on:
  push:
    branches:
      - main

jobs:
  repo-backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: repo-backup-ipfs
        uses: Dhaiwat10/repo-backup-ipfs@v0.3
```
