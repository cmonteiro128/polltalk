/* eslint no-underscore-dangle: ["error", { "allow": ["__NEXT_DATA__"] }] */
/* global window */

import React from 'react';
import { Button, Form, Grid, Header, Segment, Input, Message } from 'semantic-ui-react';
import { css } from 'emotion';
import { hydrate, injectGlobal } from 'react-emotion';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import Head from '../components/head';
import globalStore from '../store';

import { addPollOption, createPoll } from '../actions/createPoll';

// Centering style for grid, need to inject globally
injectGlobal`body > div, body > div > div, body > div > div > div {height: 100%}`; // eslint-disable-line

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids);
}

class CreatePoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pollText: '', pollName: '' };
  }

  handleChange = name => (e, { value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    createPoll(this.props.pollOptions, this.state.pollName);
    console.log(`${this.props.pollID}`);
  };

  render() {
    // Dispatchers
    const { addPollOption } = this.props;
    // State
    const { pollOptions } = this.props;

    const pollList = pollOptions.map((item, i) => (
      <Message size="small">
        <Message.Header key={i}>{item}</Message.Header>
      </Message>
    ));

    return (
      <div>
        <Head title="PollTalk | Create Poll" />
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column
            className={css`
              max-width: 450px;
            `}
          >
            <Header as="h2" color="blue" textAlign="center">
              Create a new poll
            </Header>
            <Form size="large">
              <Input
                className={css`
                  text-align: center;
                `}
                fluid
                onChange={this.handleChange('pollName')}
                placeholder="Enter poll name"
              />
              <Segment stacked>
                {pollList}
                <Form.Field>
                  <Input
                    fluid
                    icon="checkmark box"
                    iconPosition="left"
                    placeholder="Poll Question"
                    onChange={this.handleChange('pollText')}
                    value={this.state.pollText}
                    action={
                      <Button
                        id="add-button"
                        icon="plus"
                        style={{
                          borderTopRightRadius: '0.285714rem',
                          borderBottomRightRadius: '0.285714rem',
                        }}
                        onClick={() => {
                          if (this.state.pollText !== '') {
                            addPollOption(this.state.pollText);
                            console.log(`test${this.state.pollText}`); // eslint-disable-line
                            this.setState({ pollText: '' });
                          }
                        }}
                      />
                    }
                  />
                </Form.Field>
                <Button color="blue" fluid size="large" onClick={this.handleSubmit}>
                  Create Poll
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  pollOptions: state.CreatePoll.pollOptions,
  pollID: state.CreatePoll.obtainedPollID,
});

const mapDispatchToProps = dispatch => bindActionCreators({ addPollOption, createPoll }, dispatch);

export default withRedux(globalStore, mapStateToProps, mapDispatchToProps)(CreatePoll);
