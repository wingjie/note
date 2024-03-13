import { resolve, join } from 'path'

export const rootDir = resolve(__dirname, '../src')
export const rootDirFn = (dirName: string = 'src') => {
  return resolve(__dirname, `../${dirName}`)
}


// 获取docs目录的完整名称(从根目录一直到docs目录)
export const docsDirFullPath = join(__dirname, '../')

// 获取docs目录的完整长度
export const docsDirFullPathLen = docsDirFullPath.length
