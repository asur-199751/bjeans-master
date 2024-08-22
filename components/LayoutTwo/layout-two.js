import s from './layout-two.module.scss'
import HeaderTwo from '../HeaderTwo'
import FooterTwo from '../FooterTwo'

const LayoutTwo = ({ children, orderPage }) => (
  <>
    <HeaderTwo orderPage={orderPage} />
    {children}
    <FooterTwo />
  </>
)
export default LayoutTwo
