import { TNavList, navLists } from '../constants'
import { appleImg, bagImg, searchImg } from '../utils'

export default function Navbar() {
    return (
        <header className="flex w-full items-center justify-between px-5 py-5 sm:px-10">
            <nav className="screen-max-width flex w-full">
                <img src={appleImg} alt="Apple logo" width={14} height={14} />

                <div className="flex flex-1 justify-center max-sm:hidden">
                    {navLists.map((navList: TNavList) => (
                        <span
                            key={navList}
                            className="cursor-pointer px-5 text-sm text-gray transition-all hover:text-white"
                        >
                            {navList}
                        </span>
                    ))}
                </div>

                <div className="flex items-baseline gap-7 max-sm:flex-1 max-sm:justify-end">
                    <img src={searchImg} alt="Search" width={18} height={18} />
                    <img src={bagImg} alt="Bag" width={18} height={18} />
                </div>
            </nav>
        </header>
    )
}
