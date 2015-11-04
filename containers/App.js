import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../components/LineChart';
import RadialHeatmap from '../components/RadialHeatmap';
import * as ChartAppActions from '../actions/ChartAppActions';

class App extends Component {
  constructor() {
    super();

    this._handleNewDataClick = this._handleNewDataClick.bind(this);
  }

  componentWillMount() {
    const { actions } = this.props;

    // initialize the chart data to some random numbers
    actions.setChartData(this._generateData());
  }

  _generateData() {
    const data = [];
    for (var i = 0; i <= 30; i++) {
      data.push({ _id: i, distance: i, value: Math.random() * 10 + i });
    }

    return data;
  }

  // handler to change the chart data to a new set of random numbers
  _handleNewDataClick() {
    const { actions } = this.props;
    actions.setChartData(this._generateData());
  }

  render() {
    const { actions, chartData, highlightedPoint } = this.props;

    return (
      <div>
        <button onClick={this._handleNewDataClick}>New Data</button>
        <LineChart data={chartData} onHighlight={actions.highlightChart} highlightedPoint={highlightedPoint} />
        <RadialHeatmap data={chartData} onHighlight={actions.highlightChart} highlightedPoint={highlightedPoint} />
      </div>
    );
  }
}

App.propTypes = {
  chartData: PropTypes.array.isRequired,
  highlightedPoint: PropTypes.object,
  actions: PropTypes.object.isRequired
};

// take the subset of relevant state (in this case, everything) to be used in this component
function mapStateToProps(state) {
  return {
    chartData: state.chartApp.chartData,
    highlightedPoint: state.chartApp.highlightedPoint
  };
}

// helper to bind dispatch to the actions to simplify calling them
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChartAppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
