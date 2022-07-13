import React, { FC, useState } from "react"
import { text, themeSettings } from "../../lib/settings"

interface Props {
  value
  onSearch
  className
}

const SearchBox: FC<Props> = props => {
  const [value, setValue] = useState(props.value)
  const [hasFocus, setHasFocus] = useState(false)

  const { onSearch, className } = props

  const handleKeyPress = e => {
    if (e.keyCode === 13 || e.which === 13) {
      handleSearch()
    }
  }

  const handleKeyDown = e => {
    if (e.keyCode === 27) {
      handleClear()
    }
  }

  const handleSearch = () => {
    onSearch(value)
  }

  const handleClear = () => {
    setValue("")
    onSearch("")
  }

  const placeholderText =
    themeSettings.search_placeholder &&
    themeSettings.search_placeholder.length > 0
      ? themeSettings.search_placeholder
      : text.searchPlaceholder

  return (
    <div className={"search-box " + className + (hasFocus ? " has-focus" : "")}>
      <input
        className="search-input"
        type="text"
        placeholder={placeholderText}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      />
      <img
        className="search-icon-search"
        src="/assets/images/search.svg"
        alt={text.search}
        title={text.search}
        onClick={handleSearch}
      />
      {value && value !== "" && (
        <img
          className="search-icon-clear"
          src="/assets/images/close.svg"
          onClick={handleClear}
        />
      )}
    </div>
  )
}

export default SearchBox
