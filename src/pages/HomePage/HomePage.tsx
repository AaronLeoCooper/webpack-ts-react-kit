import * as React from 'react';
import { Location } from 'history';

interface Props {
  location: Location;
}

export default class HomePage extends React.Component<Props> {
  render() {
    const { location } = this.props;

    return <div>You're at: {location.pathname}</div>;
  }
}
