import React, { Component } from 'react';
import { Link } from 'react-router';

class DashboardMenu extends Component {
  render() {
    return (
      <div>
        <Link to={`/dashboard`}>Dashboard</Link>
        <Link to={`/dashboard/areas`}>Areas</Link>
        <Link to={`/dashboard/reports`}>Reports</Link>
        <Link to={`/dashboard/questionaires`}>Questionaires</Link>
      </div>
    );
  }
}

export default DashboardMenu;
