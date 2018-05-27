import axios from 'axios';

import database from '../firebase';

export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const DELETE_POST = 'DELETE_POST';

const ROOT_URL = 'https://reduxblog.herokuapp.com/api';
const API_KEY = '?key=blibbity-blabbity'

export function fetchPosts() {
  return (dispatch) => {
    return database.ref('/posts').on('value', (snapshot) => {
      dispatch({
        type: FETCH_POSTS,
        payload: snapshot.val(),
      });
    });
  };
}

export function createPost(values, callback) {
  return (dispatch) => {
    return database.ref('/posts').push(values)
      .then((response) => {
        // captures the firebase-generated unique ID
        const newPostKey = response.key;
        // updates the object ID with this key
        database.ref('/posts').child(newPostKey).update({'id': newPostKey})
          .then(() => {
            // updates the front-end state object
            values['id'] = newPostKey;
            dispatch({
              type: CREATE_POST,
              payload: values,
            });
          });
      })
      .finally(() => callback());
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return (dispatch) => {
    request
    .then(({data}) => {
      dispatch({
        type: FETCH_POST,
        payload: data,
      });
    });
  };
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)

  return (dispatch) => {
    request
    .then(({data}) => {
      dispatch({
        type: DELETE_POST,
        payload: data,
      });
    })
    .finally(() => callback());
  };
}
