import _ from 'lodash';

import { createSelector } from 'reselect';

const postsSelector = state => state.posts;
const selectedPostsSelector = state => state.selectedPostIds;

const getSelectedPosts = (posts, selectedPostIds) => {
  return _.filter(posts, (post) => {
    return _.includes(selectedPostIds, post.id);
  });
};

export default createSelector(
  postsSelector, // first state provider
  selectedPostsSelector, // second state provider
  getSelectedPosts, // the method by which the two states are reconciled
)
