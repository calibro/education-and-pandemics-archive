import React, { useEffect, useState } from "react";
import './ResourceView.sass';
import {base, MAIN_TABLE} from '../utils/airtable'
import {Spinner} from 'react-bootstrap'
import * as embedUtils from '../utils/embed'
import ResourceExtendedInfo from '../components/ResourceExtendedInfo'
import RelatedResources from '../components/RelatedResources'
import { useHistory } from "react-router-dom";

import arrow from '../assets/arrow.svg';

import ImageGallery from 'react-image-gallery';


const ResourceView = ({resourceId}) => {
  const [resource, setResource] = useState({});
  let viewRef = React.createRef()
  let history = useHistory();

  useEffect(() => {
    viewRef.current && viewRef.current.scrollTo(0, 0)
    setResource({})

    base(MAIN_TABLE).find(resourceId, function(err, record) {
      if (err) { console.error(err); return; }
      setResource(record)
    })
  }, [resourceId])

  const generateEmbedCode = () => {
    let code = <div></div>
    let source
    try {
      source = new URL(resource.fields['URL'])
    } catch (err) {
      code = <div>No url is defined</div>
    }
    if (source){
      // YouTube
      if (source.hostname.includes('youtu')) {
        let youtubeId = embedUtils.getYoutubeId(source.href)
        code = <iframe title="content" src={'https://www.youtube.com/embed/' + youtubeId} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      }

      // VIMEO
      else if (source.hostname.includes('vimeo')) {
        let vimeoId = embedUtils.getVimeoId(source.href)
        code = <iframe title="content" src={"https://player.vimeo.com/video/" + vimeoId} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
      }

      // Archive
      else if (source.hostname.includes('archive.org')) {
        let archiveUrl = embedUtils.getArchiveURL(source.href)
        code = <iframe width="100%" height="360" title="content" src={archiveUrl} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
      }

      // Spotify
      else if (source.hostname.includes('spotify')) {
        let spotifyUrl = embedUtils.getSpotifyUrl(source.href)
        code = <iframe width="100%" height="360" title="content" src={spotifyUrl} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      }
      // Soundcloud
      else if (source.hostname.includes('soundcloud')) {
        code = <iframe width="100%" height="300" title="content" scrolling="no" frameBorder="no" allow="autoplay" src={'https://w.soundcloud.com/player/?url=' + encodeURIComponent(source.href) + '&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'}></iframe>
      }
    }

    return <div className="iframe-container">{code}</div>
  }

  const ResourceMedia = () => {
    let resourceContent = <span>No item format defined</span>
    let isEmbed = resource.fields['Embed']
    if (isEmbed) {
      resourceContent = generateEmbedCode()
    } else {
      if (resource.fields['Attachments']){
        if (resource.fields['Attachments'].length > 1) {
          let images = resource.fields['Attachments'].map(att => {
            return {
              original: att.url,
              thumbnail: att.thumbnails.large.url
            }
          })
          resourceContent = <ImageGallery items={images} infinite={false} showNav={false} showFullscreenButton={false} showPlayButton={false}/>
        }
        else {
          resourceContent = <img src={resource.fields['Attachments'][0].url} alt={resource.fields['Title ID']}></img>
        }
      }
    }
    return resourceContent
  }
  
  return resource.fields ? 
    (
    <div className="resource-page" ref={viewRef}>
      <div className="resource-view">
        <div className="navigate-back" onClick={()=> history.goBack()}>
          <div className="arrow-icon" 
            style={{ backgroundImage: `url(${arrow})` }}
          ></div>
          <span>BACK TO THE RESULTS</span>
        </div>
        <div className="resource-preview">
          <ResourceMedia></ResourceMedia>
        </div>
        <div className="resource-sideinfo-container">
          <ResourceExtendedInfo resource={resource}></ResourceExtendedInfo>
          <a className="mailto" href="mailto:archive.project@ische.org">Contact us if you know more about this item</a>
        </div>
      </div>
      <div className="related-resources">
        <RelatedResources resource={resource}></RelatedResources>
      </div>
    </div>
    )
  :
  (<div className="loading"><Spinner animation="border" />Loading resource</div>)
}

export default ResourceView