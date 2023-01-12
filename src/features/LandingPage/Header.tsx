import { useState } from 'react'
import Wrapper from '$layouts/Wrapper'

const Header = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className={'bg-clr-9'}>
      <Wrapper className={'flex justify-between items-center py-6 gap-24'}>
        <h3 className={'text-clr-5 font-dm'}>Brand</h3>

        <button
          className={$cn.tw('relative z-50', 'md:(hidden flex grid)')}
          onClick={() => setIsActive((o) => !o)}
        >
          Toggle me
        </button>

        <div
          className={$cn(
            'fixed right-0 top-0 bg-clr-8 bottom-0 w-full max-w-lg transition-[transform] translate-x-full'
          )}
        >
          <div>Links</div>
          <div>Cta</div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Header
