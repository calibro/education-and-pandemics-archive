import Airtable from 'airtable'

const baseID = 'appVmbOc3ARWos22X' // TEST
//const baseID = 'appyRkLfkVtG84rMU' // PRODUCTION

export const base = new Airtable({
  apiKey:process.env.REACT_APP_AIRTABLE_API_KEY
}).base(baseID);

export const MAIN_TABLE = "Data";