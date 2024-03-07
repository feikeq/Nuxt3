//  formatNumber(46123456.789212)
export const { format: formatNumber } = Intl.NumberFormat('cmn-Hans-CN', {
    style: 'currency', //　显示前面的符号
    currency: 'CNY',
    currencyDisplay: 'name', //　显示后面的名字
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  