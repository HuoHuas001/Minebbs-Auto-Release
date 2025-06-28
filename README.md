# Minebbs-Auto-Release - 自动发布Minebbs资源
[![GitHub Release](https://img.shields.io/github/v/release/HuoHuas001/Minebbs-Auto-Release?style=for-the-badge)](https://github.com/HuoHuas001/Minebbs-Auto-Release/releases)
[![License](https://img.shields.io/github/license/HuoHuas001/Minebbs-Auto-Release?style=for-the-badge)](https://github.com/HuoHuas001/Minebbs-Auto-Release/blob/main/LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/HuoHuas001/Minebbs-Auto-Release/test.yml?style=for-the-badge)](https://github.com/HuoHuas001/Minebbs-Auto-Release/actions)


![Minebbs-Auto-Release](https://socialify.git.ci/HuoHuas001/Minebbs-Auto-Release/image?description=1&forks=1&issues=1&language=1&name=1&owner=1&pulls=1&stargazers=1&theme=Light)


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
