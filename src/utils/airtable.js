import Airtable from 'airtable'

export const base = new Airtable({
  apiKey:process.env.REACT_APP_AIRTABLE_API_KEY
}).base('appyRkLfkVtG84rMU');

export const MAIN_TABLE = "Data test";