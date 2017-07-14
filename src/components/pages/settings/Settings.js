import React from 'react';
import PropTypes from 'prop-types';

import Hero from '../../layouts/Hero';
import TeamsShow from './TeamsShowContainer';
import TeamsForm from './TeamsFormContainer';
import LayersManager from '../../LayersManager/LayersManager';
import Loader from '../../ui/Loader';

class Settings extends React.Component {
  constructor() {
    super();
    this.firstLoad = true;
  }

  componentWillMount() {
    if (this.firstLoad){
      this.props.getTeam(this.props.userId);
      this.props.getGFWLayers();
      this.props.getLayers();
      this.firstLoad = false;
    }
  }

  render() {
    const { team, editing, loading, saving, isManager } = this.props;
    return (
      <div>
        {isManager && !editing? 
          <Hero
            title={"settings.name"}
            action={{name: "common.edit", callback: () => this.props.setEditing(true)}}
          />
        : 
          <Hero title={"settings.name"} />
        }
        <div className="l-content">
          {!loading &&
            <div>
              {(team && !editing) ?
                <div>
                  <TeamsShow />
                </div>
                : 
                <TeamsForm team={team}/>
              }
              <Loader isLoading={saving} />
              <LayersManager />
            </div>}
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  team: PropTypes.object,
  getTeam: PropTypes.func.isRequired,
  isManager: PropTypes.bool,
  userId: PropTypes.string.isRequired
};

export default Settings;
