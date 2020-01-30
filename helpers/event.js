class EventHelper {
  static formatDate(date) {
    date = date.toLocaleDateString()
    const array = date.split('/')
    const year = array[2]
    const month = +array[0] < 10 ? `0${array[0]}` : `${array[0]}`
    const day = +array[1] < 10 ? `0${array[1]}` : `${array[1]}`
    return `${day}-${month}-${year}`
  }

  static parseDate(date) {
    date = date.toLocaleDateString()
    const array = date.split('/')
    const year = array[2]
    const month = +array[0] < 10 ? `0${array[0]}` : `${array[0]}`
    const day = +array[1] < 10 ? `0${array[1]}` : `${array[1]}`
    return `${year}-${month}-${day}`
  }
}

module.exports = EventHelper