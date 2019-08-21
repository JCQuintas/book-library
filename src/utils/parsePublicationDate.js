import moment from 'moment'
export default (y, m, d) => {
  if (!y) return 0
  const month = m ? m : '01'
  const day = d ? d : '01'
  const year = y
  if (year && month && day) return moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').valueOf()
}
