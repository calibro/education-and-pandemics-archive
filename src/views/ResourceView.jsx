import {Component} from 'react'
import './ResourceView.sass';
import Airtable from 'airtable'
import {Spinner} from 'react-bootstrap'
import * as embedUtils from '../utils/embed'

export default class ResourceView extends Component {
  state = {
    resource: {}
  }
  componentDidMount() {
    var self = this
		var base = new Airtable({
			apiKey:process.env.REACT_APP_AIRTABLE_API_KEY
		}).base('appyRkLfkVtG84rMU');

    base('Data Sample').find(this.props.resourceId, function(err, record) {
      if (err) { console.error(err); return; }
      self.setState({
        resource: record
      })
    })
  }
  generateEmbedCode () {
    let code = <div></div>
    let source
    try {
      source = new URL(this.state.resource.fields['URL'])
    } catch (err) {
      code = <div>No url is defined</div>
    }
    if (source){
      // YouTube
      if (source.hostname.includes('youtu')) {
        let youtubeId = embedUtils.getYoutubeId(source.href)
        code = <iframe width="640" height="360"  title="content" src={'https://www.youtube.com/embed/' + youtubeId} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      }

      // VIMEO
      else if (source.hostname.includes('vimeo')) {
        let vimeoId = embedUtils.getVimeoId(source.href)
        code = <iframe width="640" height="360" title="content" src={"https://player.vimeo.com/video/" + vimeoId} frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      }

      // Archive
      else if (source.hostname.includes('archive.org')) {
        let archiveUrl = embedUtils.getArchiveURL(source.href)
        code = <iframe width="640" height="360" title="content" src={archiveUrl} frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      }

      // Spotify
      else if (source.hostname.includes('spotify')) {
        let spotifyUrl = embedUtils.getSpotifyUrl(source.href)
        code = <iframe width="640" height="360" title="content" src={spotifyUrl} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      }
      // Soundcloud
      else if (source.hostname.includes('soundcloud')) {
        code = <div>Soundcloud - work in progress</div>
      }
    }

    return code
  }
  resourceMedia() {
    let resourceContent = <span>No item format defined</span>
    let format = this.state.resource.fields['item_format']
    if (format === 'Website') {
      resourceContent = <img src={this.state.resource.fields['Attachments'][0].url} alt={this.state.resource.fields['Title ID']}></img>
    } 
    else if (format === 'Image') {
      // Here maybe a gallery?
      resourceContent = <img src={this.state.resource.fields['Attachments'][0].url} alt={this.state.resource.fields['Title ID']}></img>
    }
    else if (format === 'Embed') {
      // Here maybe a gallery?
      resourceContent = this.generateEmbedCode()
    }
    return resourceContent
  }
  resourceInfo() {
    return <div className="resource-sideinfo">
              <div className="resource-title">
                {this.state.resource.fields['Title ID']}
                <div className="bookmark"></div>
              </div>
              <div className="resource-desc">
                {this.state.resource.fields['Summary (limit 500)']}
              </div>
              <div className="resource-metadata">
                {['Pandemics', 'Type_name', 'Themes_name', 'Tags', 'Country', 'City', 'Language', 'Credits', 'Created', 'Published', 'Archived', 'Contributor'].map(key => {
                  return <div className="meta-row" key={key}>
                    <div className="meta-title">{key}</div>
                    <div className="meta-value">{Array.isArray(this.state.resource.fields[key]) ? this.state.resource.fields[key].join(', ') : this.state.resource.fields[key]}</div>
                  </div>
                  }
                )}
              </div>
              {this.state.resource.fields['URL'] && <div className="resource-source">
                <a href={this.state.resource.fields['URL']}>GO TO THE SOURCE</a>
              </div>
              }

          </div>
  }

  render() {
    return this.state.resource.fields ? 
      (<div className="resource-view">
        <div className="resource-preview">
          {this.resourceMedia()}
        </div>
        <div className="resource-sideinfo-container">
          {this.resourceInfo()}
        </div>
      </div>)
    :
    (<div className="loading"><Spinner animation="border" />Loading resource</div>)
  }
}