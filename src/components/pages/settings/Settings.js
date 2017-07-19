import React from 'react';
import PropTypes from 'prop-types';

import Hero from '../../layouts/Hero';
import Article from '../../layouts/Article';
import TeamsShow from '../../teams-show/TeamsShowContainer';
import TeamsForm from '../../teams-manager/TeamsFormContainer';
import LayersManager from '../../layers-manager/LayersManager';
import LayersShow from '../../layers-show/LayersShowContainer';
import Loader from '../../ui/Loader';
import Tab from '../../ui/Tab';

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
    const { team, editing, loading, saving, isManager } = this.props;
    
    const renderHero = () => {
      const action = (isManager && !editing) && {name: "common.edit", callback: () => this.props.setEditing(true)};
      const tabStyle = !(isManager && !editing) && "-no-action";
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
                      <LayersShow isManager={isManager}/>
                    }
                  </Article>
                </div>
                : 
                <div className="settings-edit">
                  { this.state.tabIndex === 0 ? 
                    <TeamsForm team={team}/> :
                    <LayersManager isManager={isManager}/>
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
  userId: PropTypes.string.isRequired
};

export default Settings;
