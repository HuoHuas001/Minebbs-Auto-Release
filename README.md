![Latest Tag](https://img.shields.io/github/v/tag/HuoHuas001/Minebbs-Auto-Release?label=LATEST%20TAG&style=for-the-badge)
<<<<<<< HEAD
![GitHub Releases (by Asset)](https://img.shields.io/github/downloads/HuoHuas001/Minebbs-Auto-Release/latest/total?style=for-the-badge)
](https://github.com/HuoHuas001/Minebbs-Auto-Release/releases/latest)
# Minebbs-Auto-Release - 自动发布Minebbs资源的版本
=======

# Minebbs-Auto-Release - Automatic release of versions of Minebbs resources
>>>>>>> 1c1a9ecdebe112ebba1a0da80fffb6da22f69476
![Minebbs-Auto-Release](https://socialify.git.ci/HuoHuas001/Minebbs-Auto-Release/image?description=1&forks=1&issues=1&language=1&name=1&owner=1&pulls=1&stargazers=1&theme=Light)
👉[English](README.md)👈 👉简体中文👈

# 使用方法

**NOTE:** `HuoHuas001/Minebbs-Auto-Release@v1` 是分支，总是有最新的`v1.x.x`版本。  

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

# 例子

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
