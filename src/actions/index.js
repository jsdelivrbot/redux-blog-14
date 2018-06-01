import database from '../firebase';

export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const SELECT_POST = 'SELECT_POST';
export const DESELECT_POST = 'DESELECT_POST';

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
  return (dispatch) => {
    return database.ref('/posts').child(id).on('value', (snapshot) => {
      dispatch({
        type: FETCH_POST,
        payload: snapshot.val(),
      });
    });
  };
}

export function deletePost(id, callback) {
  return (dispatch) => {
    return database.ref('/posts').child(id).remove()
      .then(() => {
        dispatch({
          type: DELETE_POST,
          payload: id,
        })
      })
      .finally(() => callback());
  };
}

export function selectPost(id) {
  return {
    type: SELECT_POST,
    payload: id,
  };
}

export function deselectPost(id) {
  return {
    type: DESELECT_POST,
    payload: id,
  };
}
