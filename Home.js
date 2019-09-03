import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, AppRegistry, ScrollView } from "react-native";
import { MockEvents, MockUserEvents, MockUser } from "./MockData";
import { Events } from "./Events";
import { Ionicons } from "@expo/vector-icons";
import { connect } from 'react-redux'
import { EventReducer } from './Reducers/EventReducer'
import { getEvents } from './Actions/index'
import styled from "styled-components";

const Home = (props) => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({});
  console.log(props)

  useEffect(() => {
    props.getEvents(MockEvents.events)
    setEvents(MockEvents.events);
    setUser(MockUser);
  }, []);

  const allEvents = events.map(event => {
    return (
      <Events
        title={event.title}
        time={event.time}
        address={event.address}
        description={event.description}
        key={event.id}
      />
    );
  });
  return (
    <>
      <ScrollView>
        <Cover>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <Name>Welcome, {user.name}!</Name>
            <Avatar source={require("./assets/main-user.png")} />
          </View>
        </Cover>
        <View style={styles.container}>{allEvents}</View>
      </ScrollView>
    </>
  );
};

const Avatar = styled.Image`
  top: 15;
  left: 15;
  border-radius: 20px;
  width: 48px;
  height: 48px;
  margin-right: 16px;
`;

const Name = styled.Text`
  color: black;
  font-size: 32px;
  font-weight: bold;
  margin-top: 20px;
  margin-right: 44px;
  text-align: center;
`;

const Cover = styled.View`
  width: 100%;
  height: 150px;
  overflow: hidden;
  padding-top: 40px;
  background-color: #f7f7f7;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "center"
    }
  })

const mapStateToProps = store => ({
  ...store
})

const mapDispatchToProps = dispatch => ({
  getEvents: (event) => dispatch(getEvents(event))
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)