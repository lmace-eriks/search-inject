import React, { useEffect } from 'react';

// Styles
import styles from "./styles.css";

interface SearchInjectProps {

}

const SearchInject: StorefrontFunctionComponent<SearchInjectProps> = ({ }) => {

  return (
    <div>Hello World</div>
  )
}

SearchInject.schema = {
  title: 'editor.SearchInject.title',
  description: 'editor.SearchInject.description',
  type: 'object',
  properties: {}
}

export default SearchInject;