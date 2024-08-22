export const getPrice = (product) => {
  const normalPrice = product.woocsRegularPrice
  const salePrice = product.woocsSalePrice
  return {
    normalPrice,
    salePrice,
  }
}

export const getFormat = (
  number,
  floatingDigits = 0,
  splitBy = 3,
  splitter = ' ',
  floatingSplitter = '.'
) => {
  const re = `\\d(?=(\\d{${splitBy}})+${floatingDigits > 0 ? '\\D' : '$'})`
  const num = (typeof number === 'number' ? number : parseInt(number)).toFixed(
    Math.max(0, ~~floatingDigits)
  )

  return (floatingSplitter ? num.replace('.', floatingSplitter) : num).replace(
    new RegExp(re, 'g'),
    `$&${splitter}`
  )
}

export const getDiscount = (normalPrice, salePrice) =>
  Math.round(
    ((parseInt(normalPrice) - parseInt(salePrice)) * 100) /
      parseInt(normalPrice)
  )

/**
 * Plural forms for russian words
 * @param  {Integer} count quantity for word
 * @param  {Array} words Array of words. Example: ['депутат', 'депутата', 'депутатов'], ['коментарий', 'коментария', 'комментариев']
 * @return {String}        Count + plural form for word
 */
export const pluralize = (count, words) => {
  const cases = [2, 0, 1, 1, 1, 2]

  return (
    count +
    ' ' +
    words[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ]
  )
}

export const addZero = (number) =>
  String(number).length === 1 ? `0${number}` : String(number)

export const formatDate = (date) => {
  const day = addZero(date.getDate())
  const month = addZero(date.getMonth() + 1)
  const year = date.getFullYear()

  return [day, month, year].join('.')
}

export const formatOrder = (order) => {
  const statusesMap = {
    CANCELLED: 'Отменен',
    COMPLETED: 'Выполнен',
    COURIER: 'Передан курьеру',
    FAILED: 'Не удался',
    ON_HOLD: 'На удержании',
    PAID: 'Оплачено',
    PENDING: 'В ожидании оплаты',
    PROCESS: 'В обработке',
    PROCESSING: 'Обрабатывается',
    REFUNDED: 'Возвращен',
  }

  return {
    id: order.databaseId,
    date: formatDate(new Date(order.date.replace('+00:00', '+05:00'))),
    total: getFormat(order.total || '100000'),
    status: statusesMap[order.status.toUpperCase()] || order.status,
    lineItems: (order.lineItems && order.lineItems.nodes) || [],

    subtotal: order.subtotal && formatPrice(reformatPrice(order.subtotal)),
    shippingTotal:
      order.shippingTotal && formatPrice(reformatPrice(order.shippingTotal)),
    firstName: order.billing && order.billing.firstName,
    phone: order.billing && order.billing.phone,
    address: order.shipping && order.shipping.address1,
    customerNote: order.customerNote,
  }
}
