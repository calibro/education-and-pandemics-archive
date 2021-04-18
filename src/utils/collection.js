import * as React from 'react'
import createPersistedState from 'use-persisted-state';

const CollectionContext = React.createContext()

const useCollectionState = createPersistedState('collection');

function useCollection() {
  const context = React.useContext(CollectionContext)
  if (!context) {
    throw new Error(`useCount must be used within a CollectionContext`)
  }
  return context
}
function CollectionProvider(props) {
  const [collection, setCollection] = useCollectionState([])
  const value = React.useMemo(() => [collection, setCollection], [collection])
  return <CollectionContext.Provider value={value} {...props} />
}
export {CollectionProvider, useCollection}

/*
export function getCollection() {
  let collection = JSON.parse(localStorage.getItem(STORAGE_KEY)) 
  return collection ? collection.items : []
}

export function addToCollection(item) {
  var collection = {};
  var items = []
  collection.items = items;
  if (localStorage.getItem(STORAGE_KEY)) {
    collection = JSON.parse(localStorage.getItem(STORAGE_KEY))
  }
  collection.items.push(item)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(collection))
}

export function removeFromCollection(item) {
  // TODO
}
*/