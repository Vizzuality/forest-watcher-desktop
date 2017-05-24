import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function GridGallery(props) {
  const { Component, collection, columns, before, after } = props;
  const gridClasses = classnames(['column', {
    [`small-${columns.small}`]: columns.small,
    [`medium-${columns.medium}`]: columns.medium,
    [`large-${columns.large}`]: columns.large
  }]);
  return (
    <div className="row">
      {before && <div className={gridClasses}>{before}</div>}
      {collection.map(item => (
        <div className={gridClasses} key={item}>
          <Component id={item} />
        </div>
      ))}
      {after && <div className={gridClasses}>{after}</div>}
    </div>
  );
}

GridGallery.propTypes = {
  before: PropTypes.element,
  after: PropTypes.element,
  Component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(React.Component)
  ]).isRequired,
  collection: PropTypes.array,
  columns: PropTypes.shape({
    small: PropTypes.number,
    medium: PropTypes.number,
    large:PropTypes.number
  })
};

export default GridGallery;