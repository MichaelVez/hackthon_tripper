import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import './LanguageSelect.css'
const languageOptions = [
  { key: 'عربيه', text: 'عربيه', value: 'عربيه' },
  { key: 'עברית', text: 'עברית', value: 'עברית' },
  { key: 'English', text: 'English', value: 'English' },
  { key: 'Русский', text: 'Русский', value: 'Русский' },
  { key: 'español', text: 'español', value: 'español' },
]

const DropdownExampleSearchDropdown = () => {

 const handleChangeLang = (event) => {
  const languageSelected = event.target.innerText;
 }

  return (
    <Dropdown
      button
      className='icon'
      floating
      labeled
      icon='world'
      options={languageOptions}
      search
      onChange={handleChangeLang}
      text='Select Language'
    />
  )
} 

export default DropdownExampleSearchDropdown