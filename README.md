[![status](https://img.shields.io/github/workflow/status/HuoHuas001/Minebbs-Auto-Release/build-test?style=for-the-badge)](https://github.com/HuoHuas001/Minebbs-Auto-Release/actions)
[
![Latest Tag](https://img.shields.io/github/v/tag/HuoHuas001/Minebbs-Auto-Release?label=LATEST%20TAG&style=for-the-badge)
![GitHub Releases (by Asset)](https://img.shields.io/github/downloads/HuoHuas001/Minebbs-Auto-Release/latest/total?style=for-the-badge)
](https://github.com/HuoHuas001/Minebbs-Auto-Release/releases/latest)
# Minebbs-Auto-Release - Automatic release of versions of Minebbs resources
![Minebbs-Auto-Release](https://socialify.git.ci/HuoHuas001/Minebbs-Auto-Release/image?description=1&forks=1&issues=1&language=1&name=1&owner=1&pulls=1&stargazers=1&theme=Light)
👉English👈 👉[简体中文](README-zh.md)👈

# Usage

**NOTE:** `HuoHuas001/Minebbs-Auto-Release@v1` is branch which always has latest `v1.x.x` version.

```yml
- name: 'test'
  uses: ./
  with: 
    resources: '1'
    token: ${{ secrets.MINEBBSKEY }}
    title: ${{ github.ref_name }}
    new_version: ${{ github.ref_name }}
    description_file: './CHANGELOG.md'
    file_url: 'https://github.com/HuoHuas001/Minebbs-Auto-Release/releases/latest'
```

# Example

```yml
  release: 
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v2
      - name: 'test'
        uses: ./
        with: 
          resources: '1'
          token: ${{ secrets.MINEBBSKEY }}
          title: ${{ github.ref_name }}
          new_version: ${{ github.ref_name }}
          description_file: './CHANGELOG.md'
          file_url: 'https://github.com/HuoHuas001/Minebbs-Auto-Release/releases/latest'
```