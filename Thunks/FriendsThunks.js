import { getFriends, hasErrored } from '../Actions/index'

export const getUserFriendsThunk = key => {
  const url = `https://lets-hang-be.herokuapp.com/api/v1/user/friends?api_key=${key}`
  return async dispatch => {
    try{ 
      const response = await fetch(url)
      const friends = await response.json()
      dispatch(getFriends(friends))
      return friends
    }
    catch(error) {
      dispatch(hasErrored(error))
    }
  }
}

export const makeFriendRequest = (key, id) => {
  const url = `https://lets-hang-be.herokuapp.com/api/v1/friendships?api_key=${key}&friend_id=${id}`
  return async dispatch => {
    try{
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
      const response = await fetch(url, options)
      const request = await response.json()
      return request
    }
    catch(error) {
      dispatch(hasErrored(error.message))
    }
  }
}