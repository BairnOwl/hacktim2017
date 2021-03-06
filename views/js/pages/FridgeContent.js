import React from 'react';
import Webcam from 'react-webcam';
// var PieChart = require('react-d3-basic').PieChart;

import openSocket from 'socket.io-client';

export default class FridgeContent extends React.Component {

	// addFood(itemName) {
	// 	var oldList = this.state.foodItems;
	// 	var date = new Date();
	// 	oldList.push(
	// 		{name: itemName,
	// 		 exp: (date.getMonth() + 1).toString() + '/' + date.getDate().toString()
	// 		});
	// 	this.setState ({
	// 		foodItems: oldList
	// 	});
	// }


	constructor() {
		super();
		this.state = {
			foodItems: [], 
			socket: '', 
		}
		 // this.addFood = this.addFood.bind(this);
		// var socket = io.connect();
	}

	componentWillMount() {
		const socket = openSocket('http://localhost:8080');

		const addFoodHandler = (name) => {
	    	var oldList = this.state.foodItems;
			var date = new Date();
			oldList.push(
				{name: name,
				 exp: (date.getMonth() + 1).toString() + '/' + date.getDate().toString()
				});
			this.setState ({
				foodItems: oldList
			});
		};

		socket.on('addFood', addFoodHandler);

		this.setState ({
			socket: socket
		});
	}

	// buildPieChart() {
	// 	var wrapper = (<div id="myPie"><svg width="100%" height="100%" />);
	// 	var main = d3.select('myPie').append('g')
 //            .classed('main', true)
 //            .attr('transform', "translate(" + width/2 + ',' + height/2 + ')');
 //        var data = [];

 //        var pie = d3.layout.pie()
 //                .sort(null)
 //                .value(function(d) {
 //                    return d.value;
 //                });
 //        var pieData = pie(data);
 //        var radius = 100;
	// 	var arc = d3.svg.arc()
	// 	        .innerRadius(0)
	// 	        .outerRadius(radius);
	// 	main.selectAll('g')
 //        .data(pieData)
 //        .enter()
 //        .append('path')
 //        .attr('fill', function(d, i) {
 //            return getColor(i);
 //        })
 //        .attr('d', function(d){
 //            return arc(d);
 //        });	
 //        return wrapper;
	// }

	// buildPieChart() {



	// 	var generalChartData = [
	// 	    {age: '10', population: 983},
	// 	    {age: '20', population: 300},
	// 	];

	// 	  var width = 700,
	// 	    height = 400,
	// 	    value = function(d) {
	// 	      return [983, 300];
	// 	    },
	// 	    name = function(d) {
	// 	      return ['10', '20'];
	// 	    },
	// 	    chartSeries = [
	// 	      {
	// 	        "field": "10",
	// 	        "name": "10"
	// 	      },
	// 	      {
	// 	        "field": "20",
	// 	        "name": "20"
	// 	      },
	// 	    ],
	// 	    innerRadius = 10;

	//   	return <PieChart
	// 	      data= {generalChartData}
	// 	      width= {width}
	// 	      height= {height}
	// 	      chartSeries= {chartSeries}
	// 	      value = {value}
	// 	      name = {name}
	// 	      innerRadius = {innerRadius}
	// 	    />;
	// }

	// getFoodItem(name) {
	// 	return <div class="foodItem">
	// 					<div class="itemName">
	// 						name
	// 					</div>
	// 				<div class="expDate">3 Days</div></div>;
	// }

	render() {

		//var inputs = [{name: 'Apple', exp: '3 days'}, {name: 'Pear', exp: '1 day'}];

		const foodItemList = this.state.foodItems.map((val, i) => {
					return <div class="foodItem" key={i}>
						<div class="itemName">
							{val["name"]}
						</div>
						<div class="expDate">
							{val['exp']}
						</div>
						</div>;}
		);

		return (
			<div>
			<h1>Fridge Content</h1>
			<div class="foodList">
				{foodItemList}
			</div>
			</div>
		);
	}
}