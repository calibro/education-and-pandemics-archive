export function getYoutubeId(url) {
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  if(url[2]) {
    ID = url[2].split(/[^0-9a-z_\-]/i)
    ID = ID[0]
  }
  else {
    ID = url
  }
  return ID
}

export function getVimeoId (url) {
  var ID = '';
  var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
  var match = url.match(regExp);
  if (match){
    ID = match[2]
  }
  return ID
}

export function getArchiveURL (url) {
  return url.replace('details','embed')
}

export function getSpotifyUrl(url) {
  //TODO: Not always is "embed", check what happens with songs/album/podcasts
  let params = new URL(url)
  return params.origin + '/embed/' + params.pathname
}

