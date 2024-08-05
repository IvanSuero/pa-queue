import * as FlagIcons from './FlagIcons'
import LangWrapper from './Wrapper'
import LangList from './List'
import { IoMdArrowDropdown } from 'react-icons/io'

async function LangSelector({ selected }) {
    const FlagIcon = FlagIcons[selected.toUpperCase()]
    const LanguageList = <LangList />
    return (

        <LangWrapper localeList={LanguageList}>

            <FlagIcon className="mr-1 h-4   " /> <IoMdArrowDropdown className="h-8 w-6" color='white' />

        </LangWrapper>

    )
}

export default LangSelector