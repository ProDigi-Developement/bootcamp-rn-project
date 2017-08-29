import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import API from './api';
import Input from './Input';

const extractKey = ({id}) => id

export default class App extends React.Component {
  api = null;
  state = {
    username: 'tharshan',
    messages: []
  }
  componentDidMount() {
    this.api = new API();
    this.api.login(resp => {
      this.loadMessages();
    })
  }
  loadMessages() {
    this.api.getMessages(resp => {
      this.setState({messages:Object.values(resp).reverse()});
    });
  }
  renderItem = ({item}) => {
    return (
      <Text style={styles.row} key={item.text}>
        {item.username}: {item.text}
      </Text>
    )
  }
  handleSubmit(text) {
    this.api.addMessage(this.state.username, text, cb => {
      this.loadMessages();
      this.setState({msg:''});
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Chatting as {this.state.username}</Text>
        </View>
        <Input
          placeholder={'Type a message, then hit enter!'}
          onSubmitEditing={this.handleSubmit.bind(this)}
        />
        <FlatList
          style={styles.container}
          data={this.state.messages}
          renderItem={this.renderItem}
          keyExtractor={extractKey}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
  },
  header: {
    backgroundColor: 'skyblue',
    padding: 15,
    paddingTop:25,
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
});
