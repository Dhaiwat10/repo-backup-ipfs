# repo-backup-ipfs

A GitHub Action that backs up your repository's source code to IPFS.

## How to use

1. Create a workflow file in your repository at `.github/workflows/repo-backup.yml` with the following contents:

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
        uses: Dhaiwat10/repo-backup-ipfs@v0.4
        with:
          web3storage_token: ${{ secrets.WEB3STORAGE_TOKEN }}
```

2. Add your web3.storage API token as a secret in your repository as a repository secret. You can get your API token from [web3.storage](https://web3.storage/).
