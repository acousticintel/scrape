import { useState } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
//custom
import { FaTwitter } from 'react-icons/fa';


function NavTabDrop({ router, text, list, href }) {

  const [isOpen, setIsOpen] = useState(false)

  const handleClick = event => {
    event.preventDefault();
    router.push(href)
  }

  const isCurrentPath = router.pathname === href || router.asPath === href;

  return (
    <div className='flex flex-col items-center'>
      <div
        className={`navTab ${isCurrentPath && 'active'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="navTab-circle top" />
        <div className="navTab-box top" />
        <a>{text}</a>
        <div className="navTab-circle btm" />
        <div className="navTab-box btm" />
      </div>
      <div className='mx-4 p-2 rounded-lg bg-blue-900 flex'>
        <div className="flex flex-col">
          {
            list && list.length > 0 && list.map((l, i) => (
              <Link key={i} href={l.href}>
                <>
                  <FaTwitter size='1.5em' className='m-2' />
                </>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default withRouter(NavTabDrop)
