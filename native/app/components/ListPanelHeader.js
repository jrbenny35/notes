import color from 'color';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import { resetSelect, deleteNotes } from "../actions";

import { Appbar } from 'react-native-paper';
import { COLOR_APP_BAR, COLOR_NOTES_BLUE, COLOR_DARK_TEXT } from '../utils/constants';
import browser from '../browser';
class ListPanelHeader extends Component {

  constructor(props) {
    super(props);

    this._resetSelection =  () => {
      props.dispatch(resetSelect());
    };

    this._deleteSelection = () => {
      const state = this.props.state;
      const notes = state.notes.filter((note) => state.sync.selected.includes(note.id));

      if (state.sync.selected) {
        this.props.dispatch(deleteNotes(state.sync.selected, 'multi-delete'));
      }
      this.props.navigation.navigate('ListPanel', { deletedNote: notes });
    }
  }

  render() {
    const { navigation } = this.props;
    if (this.props.state.sync.selected) {
      return (
        <Appbar.Header style={styles.toolbarSelected}>
          <Appbar.Action
            size={20}
            style={{ paddingTop: 4 }}
            color={COLOR_DARK_TEXT}
            icon='clear'
            onPress={() => this._resetSelection()} />
          <Appbar.Content
            style={{ paddingLeft: 0,  }}
            titleStyle={{ fontSize: 18, color: COLOR_DARK_TEXT }}
            title={ browser.i18n.getMessage('noteListSelection') } />
          <Appbar.Action
            size={20}
            style={{ paddingTop: 4 }}
            color={COLOR_DARK_TEXT}
            icon='delete'
            onPress={() => this._deleteSelection()} />
        </Appbar.Header>
      );
    }

    return (
      <Appbar.Header style={styles.toolbar}>
        <Appbar.Action
          size={20}
          style={{ paddingTop: 4 }}
          color={COLOR_NOTES_BLUE}
          icon='menu'
          onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content
          style={{ paddingLeft: 0, paddingHorizontal: 0  }}
          titleStyle={{ fontSize: 18, color: COLOR_NOTES_BLUE }}
          title={ browser.i18n.getMessage('welcomeTitle4') }
          testID='listHeader' />
      </Appbar.Header>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: COLOR_APP_BAR,
    paddingTop: StatusBar.currentHeight
  },
  toolbarSelected: {
    backgroundColor: COLOR_NOTES_BLUE,
    paddingTop: StatusBar.currentHeight
  }
});

ListPanelHeader.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(ListPanelHeader)
