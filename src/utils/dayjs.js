import dayjs from 'dayjs'
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn')
// import 'dayjs/locale/zh-cn' // ES 2015

dayjs.locale('zh-cn') // 全局使用
export default dayjs
