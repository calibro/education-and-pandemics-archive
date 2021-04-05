import {Component} from 'react'
import './ResourceView.sass';
import Airtable from 'airtable'
import {Spinner} from 'react-bootstrap'
import * as embedUtils from '../utils/embed'
import moment from 'moment'
import ResourcesSlider from '../components/ResourcesSlider'

export default class ResourceView extends Component {
  state = {
    resource: {},
    relatedResources: []
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
      base('Data Sample').select({
        view: 'Grid view',
        filterByFormula: 'FIND("'+record.fields['Type_name']+'",{Type})'
      }).firstPage(function(err, records) {
          if (err) { console.error(err); return; }
          self.setState({
            relatedResources: records,
          });
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
        code = <iframe width="100%" height="360"  title="content" src={'https://www.youtube.com/embed/' + youtubeId} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      }

      // VIMEO
      else if (source.hostname.includes('vimeo')) {
        let vimeoId = embedUtils.getVimeoId(source.href)
        code = <iframe width="100%" height="360" title="content" src={"https://player.vimeo.com/video/" + vimeoId} frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      }

      // Archive
      else if (source.hostname.includes('archive.org')) {
        let archiveUrl = embedUtils.getArchiveURL(source.href)
        code = <iframe width="100%" height="360" title="content" src={archiveUrl} frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      }

      // Spotify
      else if (source.hostname.includes('spotify')) {
        let spotifyUrl = embedUtils.getSpotifyUrl(source.href)
        code = <iframe width="100%" height="360" title="content" src={spotifyUrl} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      }
      // Soundcloud
      else if (source.hostname.includes('soundcloud')) {
        code = <iframe width="100%" height="300" title="content" scrolling="no" frameborder="no" allow="autoplay" src={'https://w.soundcloud.com/player/?url=' + encodeURIComponent(source.href) + '&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'}></iframe>
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
    let infoFields = [{
      field: 'Pandemic_name',
      label: 'Pandemic'
     },
     {
      field: 'Type_name',
      label: 'Type'
     },
     {
      field: 'Themes_name',
      label: 'Themes'
     },
     {
      field: 'Tags_name',
      label: 'Tags'
     },
     {
      field: 'Country_name',
      label: 'Country'
     },
     {
      field: 'City_name',
      label: 'City'
     },
     {
      field: 'Language_name',
      label: 'Language'
     },
     {
      field: 'Credits',
      label: 'Credits'
     },
     {
      field: 'Production date',
      label: 'Created',
      format: (v) => v ? moment(v, "YYYY-MM-DD").format('DD/MM/YYYY') : ''
     },
     {
      field: 'Publishing date',
      label: 'Published',
      format: (v) => v ? moment(v, "YYYY-MM-DD").format('DD/MM/YYYY') : ''
     },
     {
      field: 'Added in the archive (YYYY-MM-DD)',
      label: 'Archived',
      format: (v) => v ? moment(v, "YYYY-MM-DD").format('DD/MM/YYYY') : ''
     },
     {
      field: 'Contributor',
      label: 'Contributor'
     }]
    return <div className="resource-sideinfo">
              <div className="resource-title">
                {this.state.resource.fields['Title ID']}
                <div className="bookmark"></div>
              </div>
              <div className="resource-desc">
                {this.state.resource.fields['Summary (limit 500)']}
              </div>
              <div className="resource-metadata">
                {infoFields.map(info => {
                  return <div className="meta-row" key={info.field}>
                    <div className="meta-title">{info.label}</div>
                    <div className="meta-value">{
                      info.format ? info.format(this.state.resource.fields[info.field]) : (
                        Array.isArray(this.state.resource.fields[info.field]) ? this.state.resource.fields[info.field].join(', ') : this.state.resource.fields[info.field]
                      )}
                    </div>
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

  relatedResources () {
    return this.state.relatedResources.length > 0 ? <ResourcesSlider items={this.state.relatedResources}></ResourcesSlider> : <div>No related resources</div>
  }

  render() {
    return this.state.resource.fields ? 
      (
      <div className="resource-page">
        <div className="resource-view">
          <div className="resource-preview">
            {this.resourceMedia()}
          </div>
          <div className="resource-sideinfo-container">
            {this.resourceInfo()}
          </div>
        </div>
        <div className="related-resources">
          <div className="related-options">
            Explore other <b>{this.state.resource.fields['Type_name']}</b>
          </div>
          {this.relatedResources()}
        </div>
      </div>
      )
    :
    (<div className="loading"><Spinner animation="border" />Loading resource</div>)
  }
}