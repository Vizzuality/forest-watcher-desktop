import { connect } from 'react-redux';

import TemplatesManage from './TemplatesManage';
import { LOCALES_LIST } from '../../../constants/locales';
import { TEMPLATE, QUESTION_TYPES } from '../../../constants/templates';
import { saveTemplate, deleteTemplate } from '../../../modules/templates';

const mapAreasToOptions = (areas) => {
    const areasOptions = [];
    const areasIds = areas.ids;
    areasIds.forEach((id) => {
        if (!areas.data[id].attributes.templateId || areas.data[id].attributes.templateId === '') {
            areasOptions.push({
                option: id,
                label: areas.data[id].attributes.name 
            });
        }
    });
    return areasOptions;
};

const mapQuestionType = (questionTypes) => {
    const questionOptions = questionTypes.map((type) => {
        return {
            value: type,
            label: type
        }
    });
    return questionOptions;
}

const mapLocalesToOptions = (locales) => {
    const localeOptions = locales.map((locale) => {
        return {
            option: locale.code,
            label: locale.name
        }
    });
    return localeOptions;
};

const mapStateToProps = (state, { match }) => {
    const areasOptions = mapAreasToOptions(state.areas);
    const templateId = match.params.templateId || null;
    const localeOptions = mapLocalesToOptions(LOCALES_LIST);
    const questionOptions = mapQuestionType(QUESTION_TYPES);
    const defaultTemplate = {
        ...TEMPLATE,
        name: {
            [state.app.locale]: ""       
        },
        languages: [state.app.locale],
        defaultLanguage: state.app.locale
    }
    return {
        templateId: match.params.templateId,
        mode: match.params.templateId ? 'manage' : 'create',
        template: state.templates.data[templateId] ? state.templates.data[templateId].attributes : defaultTemplate,
        loading: state.templates.loading,
        saving: state.templates.saving,
        error: state.templates.error,
        areasOptions,
        localeOptions,
        questionOptions
    }
};

function mapDispatchToProps(dispatch) {
  return {
    saveTemplate: (template, method) => {
      dispatch(saveTemplate(template, method));
    },
    deleteTemplate: (templateId) => {
      dispatch(deleteTemplate(templateId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesManage);
