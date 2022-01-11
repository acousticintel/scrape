import { withRouter } from 'next/router';
import Link from 'next/link';

function NavTab({ router, text, href }) {

  const handleClick = event => {
    event.preventDefault();
    router.push(href)
  }

  const isCurrentPath = router.pathname === href || router.asPath === href;

  return (
    <Link href={href}>
      <div className={`navTab ${isCurrentPath && 'active'}`}>
        <div className="navTab-circle top" />
        <div className="navTab-box top" />
        <a className="text-center">{text}</a>
        <div className="navTab-circle btm" />
        <div className="navTab-box btm" />
      </div>
    </Link>
  )
}

export default withRouter(NavTab)
