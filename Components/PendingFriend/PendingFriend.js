import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { acceptFriendRequestThunk, removeFriendThunk } from '../../Thunks/FriendsThunks'

export const PendingFriend = ({ friend, acceptRequest, removeFriend, userKey }) => {
  const [accepted, setAccepted] = useState(false)
  const [declined, setDeclined] = useState(false)

  const handleAcceptRequest = async (id, key) => {
    await acceptRequest(id, key)
    setAccepted(true)
  }
  const handleRemoveFriend = async (id, key) => {
    await removeFriend(id, key)
    setDeclined(true)
  }
  return (
    <View style={styles.pendingFriendContainer}>
      <View style={styles.pendingFriendContent}>
        <View style={styles.pendingFriendWrapper}>
          <Text style={styles.pendingFriendName}>{friend.name}</Text>
          <Text style={styles.phone}>{friend.phone_number}</Text>
          <Text style={styles.email}>{friend.email}</Text>
          {!accepted && !declined && <TouchableOpacity
            onPress={() => removeFriend(friend.id, userKey)}
          >
            <Text>Decline</Text>
          </TouchableOpacity>}
          {!accepted && !declined && <TouchableOpacity
            onPress={() => handleAcceptRequest(friend.id, userKey)}
          >
            <Text>Accept</Text>
          </TouchableOpacity>}
          {accepted && <Text>Friend Request Accepted!</Text>}
          {declined && <Text>Friend Request Declined</Text>}
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  pendingFriendContainer: {
    backgroundColor: "#fff",
    minHeight: 150,
    borderRadius: 4,
    margin: 10,
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 20,
    elevation: 2
  },
  pendingFriendContent: {
    flexDirection: "column",
    height: 50,
    paddingTop: 10
  },
  pendingFriendWrapper: {
    marginTop: 4,
    marginLeft: 24,
    marginBottom: 4,
    marginRight: 24
  },
  email: {
    color: "#767676",
    fontSize: 20,
    marginTop: 4
  },
  phone: {
    color: "#767676",
    fontSize: 20,
    marginTop: 4
  },
  pendingFriendName: {
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 4
  }
});
const mapStateToProps = store => ({
  userKey: store.currentUser.attributes.api_key,
})

const mapDispatchToProps = dispatch => ({
  acceptRequest: (id, key) => dispatch(acceptFriendRequestThunk(id, key)),
  removeFriend: (id, key) => dispatch(removeFriendThunk(id, key))
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingFriend);
