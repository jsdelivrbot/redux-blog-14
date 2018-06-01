import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import PostsReducer from './ReducerPosts';
import SelectedPostsReducer from './ReducerSelectedPosts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer,
  selectedPostIds: SelectedPostsReducer,
});

export default rootReducer;
