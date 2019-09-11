import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

export const RequestedFriend = ({ friend }) => {
  return(
    <View>
      <Text>{friend.name}</Text>
      <Text>{friend.phone_number}</Text>
      <Text>{friend.email}</Text>
    </View>
  )
}

export default connect(null, null)(RequestedFriend)