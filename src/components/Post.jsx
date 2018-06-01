import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectPost, deselectPost } from '../actions';

class Post extends Component {
  toggle({ id }, event) {
    const { selectPost, deselectPost } = this.props;
    event.target.checked ? selectPost(id) : deselectPost(id);
  }

  render() {
    return (
      <li className="list-group-item">
        <input
          type="checkbox"
          checked={_.includes(this.props.selectedPostIds, this.props.post.id)}
          onChange={this.toggle.bind(this, this.props.post)}
        />
        <Link to={`/posts/${this.props.post.id}`}>
          {this.props.post.title}
        </Link>
      </li>
    );
  }
}

function mapStateToProps({posts, selectedPostIds}) {
  return ({posts, selectedPostIds});
}

export default connect(mapStateToProps, { selectPost, deselectPost })(Post);
