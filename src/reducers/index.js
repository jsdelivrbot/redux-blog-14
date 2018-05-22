import { combineReducers } from 'redux';
import PostsReducer from './ReducerPosts';

const rootReducer = combineReducers({
  posts: PostsReducer,
});

export default rootReducer;
