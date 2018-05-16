// Create Accounts UI wrapper component.
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
    componentDidMount() {
        // Use Meteor Blaze to render logginn buttons
        this.view = Blaze.render(Template.loginButtons,
          ReactDOM.findDOMNode(this.refs.coitainer));
    }
    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    }
    render() {
        // Just render a placeholder cointaner that will be filled in
        return <span ref="cointaner" />;
    }
}