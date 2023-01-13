import { useState } from 'react'
import Wrapper from '$layouts/Wrapper'
import Humburger from './Humburger'

const Header = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className={'bg-clr-9'}>
      <style>
        {isActive &&
          `html {
            overflow-y: scroll;
          }
          
          #Root {
            overflow: hidden !important;
          }`}
      </style>

      <Wrapper className={'flex justify-between items-center py-6 gap-24'}>
        <h3 className={'text-clr-5 font-dm'}>Brand</h3>

        <Humburger
          active={isActive}
          onClick={() => setIsActive((prev) => !prev)}
        />

        <div
          onClick={() => setIsActive(false)}
          className={$cn(
            'fixed inset-0 bg-clr-8/70 backdrop-blur-sm transition-opacity duration-300',
            'opacity-0 invisible',
            isActive && 'opacity-100 !visible',
            'md:hidden'
          )}
        ></div>

        <div
          className={$cn.tw(
            'w-full transition-[transform]',
            'max-md:(translate-x-full fixed right-0 top-0 bg-clr-8 bottom-0 max-w-lg p-8 pt-24)',
            isActive && 'max-md:(translate-x-0)',
            'md:(flex items-center justify-between)'
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
