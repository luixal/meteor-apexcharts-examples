import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.onCreated(function() {
  let _self = this;

  // generate random series function:
  _self.generateRandomSeries = function(length = 12, max = 100) {
    let result = [
      { name: 'Series A', data: [] },
      { name: 'Series B', data: [] },
      { name: 'Series C', data: [] }
    ];
    result.map(obj => {
      for (let i = 0; i < length; i++) {
        obj.data.push(Math.floor(Math.random() * Math.floor(max)))
      }
    });
    return result;
  }

  // object to keep track of charts:
  _self.charts = {};
});

Template.main.helpers({
  optionsBar() {
    let template = Template.instance();
    return {
      containerId: 'bar',
      callbacks: {
        afterRender: function(chart, context) {
          template.charts.bar = chart;
        },
      },
      options: {
        chart: {
          height: 450,
          type: 'bar',
        },
        dataLabels: {
          enabled: false
        },
        series: template.generateRandomSeries(),
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
        },
      }
    }
  },

  optionsRadialBar() {
    let template = Template.instance();
    return {
      containerId: 'bar2',
      callbacks: {
        afterRender: function(chart, context) {
          template.radialBar = chart;
        },
      },
      options: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          circle: {
            dataLabels: {
              showOn: 'hover'
            }
          }
        },
        series: [44, 55, 67, 85, 96],
        labels: ['Series A', 'Series B', 'Series C', 'Series D', 'Series E'],
      }
    }
  },

  optionsLine() {
    let template = Template.instance();
    return {
      containerId: 'line',
      callbacks: {
        afterRender: function(chart, context) {
          template.charts.line = chart;
        },
      },
      options: {
        chart: {
          height: 450,
          type: 'line',
        },
        dataLabels: {
          enabled: false
        },
        series: template.generateRandomSeries(),
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
        },
      }
    }
  },

  optionsArea() {
    let template = Template.instance();
    return {
      containerId: 'area',
      callbacks: {
        afterRender: function(chart, context) {
          template.charts.area = chart;
        },
      },
      options: {
        chart: {
            height: 450,
            type: 'area',
        },
        dataLabels: {
            enabled: false
        },
        series: template.generateRandomSeries(),
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
        },
      }
    }
  },

  optionsHeatmap() {
    let template = Template.instance();
    return {
      containerId: 'heatmap',
      callbacks: {
        afterRender: function(chart, context) {
          template.charts.heatmap = chart;
        },
      },
      options: {
        chart: {
          height: 450,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false
        },
        series: template.generateRandomSeries(),
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
        },
      }
    }
  },

  optionsScatter() {
    let template = Template.instance();
    return {
      containerId: 'scatter',
      callbacks: {
        afterRender: function(chart, context) {
          template.charts.scatter = chart;
        },
      },
      options: {
            chart: {
                height: 450,
                type: 'scatter',
            },
            dataLabels: {
                enabled: false
            },
            series: template.generateRandomSeries(),
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
            },
        }
    }
  },
});

Template.main.events({
  'click #appendData'(event, template) {
    console.log(template.generateRandomSeries());
    Object.keys(template.charts).map(key => template.charts[key].updateSeries(template.generateRandomSeries()));
    template.radialBar.updateSeries([
      Math.floor(Math.random() * Math.floor(100)),
      Math.floor(Math.random() * Math.floor(100)),
      Math.floor(Math.random() * Math.floor(100)),
      Math.floor(Math.random() * Math.floor(100)),
      Math.floor(Math.random() * Math.floor(100))
    ]);
  }
});
