import React from 'react';
import { Feed, Message, Input, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addChat } from '../actions/pollView';
import globalStore from '../store';

const uuidv4 = require('uuid/v4');

let uniqueKey1;

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatName: '', chatMessage: '' };
  }

  handleChange = name => (e, { value }) => this.setState({ [name]: value });

  render() {
    const chatRoom = this.props.pollInfo.result.options[this.props.chatIndex].chat.map((item) => {
      uniqueKey1 = uuidv4();
      if (item.length === 0) return null;
      return (
        <Feed.Event>
          <Feed.Label icon="user circle" />
          <Feed.Content date={item.name} summary={item.message} />
        </Feed.Event>
      );
    });

    return (
      <Message>
        <Feed key={uniqueKey1}>{chatRoom}</Feed>
        <Input onChange={this.handleChange('chatName')} placeholder="Name" />
        <Input
          onChange={this.handleChange('chatMessage')}
          value={this.state.chatMessage}
          placeholder="Message"
        />
        <br />
        <Button
          onClick={() => {
            this.props.addChat(this.props.chatIndex, this.state.chatName, this.state.chatMessage);
            this.setState({ chatMessage: '' });
          }}
          primary
        >
          Send
        </Button>
      </Message>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addChat }, dispatch);

export default connect(globalStore, mapDispatchToProps)(ChatRoom);
