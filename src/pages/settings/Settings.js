import React from 'react';
import PropTypes from 'prop-types';

import Hero from '../../components/layouts/Hero';
import Article from '../../components/layouts/Article';
import TeamsShow from '../../components/teams-show/TeamsShowContainer';
import TeamsForm from '../../components/teams-manager/TeamsFormContainer';
import LayersManager from '../../components/layers-manager/LayersManager';
import LayersShow from '../../components/layers-show/LayersShow';
import Loader from '../../components/ui/Loader';
import Tab from '../../components/ui/Tab';

class Settings extends React.Component {
  constructor() {
    super();
    this.firstLoad = true;
    this.state = {
      tabIndex: 0
    }
  }

  componentWillMount() {
    if (this.firstLoad){
      this.props.getTeam(this.props.userId);
      this.props.getGFWLayers();
      this.props.getLayers();
      this.firstLoad = false;
    }
  }

  handleTabIndexChange = (tabIndex) => {
    this.setState({ tabIndex });
  }

  render() {
    const {
      team,
      editing,
      loading,
      saving,
      isManager,
      publicLayers,
      teamLayers,
      userLayers,
      setEditing
    } = this.props;

    const renderHero = () => {
      const canEdit = !editing && (isManager || this.state.tabIndex === 1);
      const action = (canEdit) ? {name: "common.edit", callback: () => this.props.setEditing(true)} : null;
      const tabStyle = !(canEdit) ? "-no-action" : "";
      return (
        <Hero
          title={"settings.name"}
          action={action}
        >
          <Tab
            pill
            style={tabStyle}
            options={["settings.myTeam", "settings.layers"]}
            selectedIndex={this.state.tabIndex}
            handleTabIndexChange={this.handleTabIndexChange}
          />
        </Hero>
      )
    }

    return (
      <div>
        {renderHero()}
        <div className="l-content">
          {!loading &&
            <div>
              {(team && !editing) ?
                <div className="settings-show">
                  <Article>
                    { this.state.tabIndex === 0 ?
                      <TeamsShow /> :
                      <LayersShow
                        isManager={isManager}
                        publicLayers={publicLayers}
                        teamLayers={teamLayers}
                        userLayers={userLayers}
                      />
                    }
                  </Article>
                </div>
                :
                <div className="settings-edit">
                  { this.state.tabIndex === 0 ?
                    <TeamsForm setEditing={setEditing} editing={editing} team={team}/> :
                    <LayersManager
                      editing={editing}
                      setEditing={setEditing}
                      isManager={isManager}
                      publicLayers={publicLayers}
                      teamLayers={teamLayers}
                      userLayers={userLayers}
                    />
                  }
                </div>
              }
              <Loader isLoading={saving} />
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
  publicLayers: PropTypes.array.isRequired,
  teamLayers: PropTypes.array.isRequired,
  userLayers: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired
};

export default Settings;