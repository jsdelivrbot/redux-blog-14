import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts } from '../actions';
import Post from './Post';
import SelectedPostsList from './SelectedPostsList';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Favorite Posts</h3>
        <SelectedPostsList />
        <hr />
        <h3>Posts</h3>
        <ul className="list-group">
          {
            _.map(this.props.posts, (post) => {
              return <Post post={post} key={post.id} />;
            })
          }
        </ul>
      </div>
    );
  }
}

PostsIndex.defaultProps = {
  selectedPostIds: []
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
    selectedPostIds: state.selectedPostIds,
  };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
