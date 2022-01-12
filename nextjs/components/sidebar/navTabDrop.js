import { useState, useEffect } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

function NavTabDrop({ router, text, list, href, icon }) {

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event, link) => {
    event.preventDefault();
    router.push(link)
  }

  const checkOpen = () => {
    let loc = window.location.pathname;
    if (loc.match(text.toLowerCase()) !== null) {
      setIsOpen(true);
    }
  }

  useEffect(() => {
    checkOpen();
    return () => setIsOpen(false)
  }, [window?.location.pathname, checkOpen])

  return (
    <>
      <div
        className={`navTab ${isOpen && 'active'}`}
      >
        <div className='navTab-circle top' />
        <div className='navTab-box top' />
        <div className='navTab-content'>
          {icon}
          <a className='text-center hidden md:block'>{text}</a>
        </div>
        <div className='navTab-circle btm' />
        <div className='navTab-box btm' />
      </div>
      <div className='mx-auto mt-2 p-2 rounded-lg bg-blue-900 flex'>
        <div className='flex flex-col'>
          {
            list && list.length > 0 && list.map((l, i) => {
              console.log(l.href)
              return (
                <div key={i} onClick={(e) => handleClick(e, l.href)}>
                  <>{l.icon}</>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default withRouter(NavTabDrop)
