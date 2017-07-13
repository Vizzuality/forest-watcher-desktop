import { connect } from 'react-redux';
import LayersManager from './LayersManager';
import { getGFWLayers, getLayers, createLayer, toggleLayer } from '../../../modules/layers';


const mapStateToProps = ({ layers, teams }) => {
  const selectedLayers = layers.selectedLayerIds.map((id) => layers.selectedLayers[id]);
    return { 
      team: teams.data,
      GFWLayers: layers.gfw,
      selectedLayers
    };
  };

 function mapDispatchToProps(dispatch) {
   return {
     getGFWLayers: () => {
       dispatch(getGFWLayers());
     },
     getLayers: () => {
       dispatch(getLayers());
     },
    createLayer: (layer, teamId) => {
       dispatch(createLayer(layer, teamId));
     },
    toggleLayer: (layer, value) => {
       dispatch(toggleLayer(layer, value));
     }
   }
 }

export default connect(mapStateToProps, mapDispatchToProps)(LayersManager);
