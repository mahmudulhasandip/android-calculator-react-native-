/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	// Text,
	View,
	Button,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { Container, Header, Form, Item, Label, Input, Content, Text, StyleProvider, Body, Title } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

type Props = {};
export default class App extends Component<Props> {
	constructor() {
		super();
		this.operators = [ 'DEL', '/', '*', '-', '+' ];
		this.state = {
			resultText: '',
			calculationText: ''
		};
	}

	operate(operation) {
		switch (operation) {
			case 'DEL':
				let text = this.state.resultText.split('');
				text.pop();
				this.setState({
					resultText: text.join('')
				});

				break;

			case '+':
			case '-':
			case '*':
			case '/':

			default:
				const lastChar = this.state.resultText.split('').pop();
				if (this.operators.indexOf(lastChar) > 0) return;
				if (this.state.text == '') return;

				this.setState({
					resultText: this.state.resultText + operation
				});
				break;
		}
	}

	calculateResult() {
		const text = this.state.resultText;
		// BODMAS
		this.setState({
			calculationText: eval(text)
		});

		// now parse this text ex - 3+3*5^2/5+7 -->
	}

	validate() {
		const text = this.state.resultText;
		switch (text.slice(-1)) {
			case '+':
			case '-':
			case '*':
			case '/':
				return false;
		}
		return true;
	}

	buttonPressed(text) {
		if (text == '=') {
			return this.validate() && this.calculateResult();
		}
		this.setState({
			resultText: this.state.resultText + text
		});
	}

	render() {
		let nums = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ '.', 0, '=' ] ];
		let rows = [];
		for (let i = 0; i < 4; i++) {
			let row = [];
			for (let j = 0; j < 3; j++) {
				row.push(
					<TouchableOpacity
						key={nums[i][j]}
						style={styles.btn}
						onPress={() => this.buttonPressed(nums[i][j])}
					>
						<Text style={styles.btnText}>{nums[i][j]}</Text>
					</TouchableOpacity>
				);
			}
			rows.push(
				<View key={i} style={styles.row}>
					{row}
				</View>
			);
		}

		let ops = [];
		for (let k = 0; k < 5; k++) {
			ops.push(
				<TouchableOpacity
					key={this.operators[k]}
					style={styles.btn}
					onPress={() => this.operate(this.operators[k])}
				>
					<Text style={[ styles.opsText, styles.white ]}>{this.operators[k]}</Text>
				</TouchableOpacity>
			);
		}
		return (
			<View style={styles.container}>
				<View style={styles.result}>
					<Text style={styles.resultText}>{this.state.resultText}</Text>
				</View>
				<View style={styles.calculation}>
					<Text style={styles.calculationText}>{this.state.calculationText}</Text>
				</View>
				<View style={styles.buttons}>
					<View style={styles.numbers}>{rows}</View>
					<View style={styles.operations}>{ops}</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
		// justifyContent: "center"
		// alignItems: "center"
		// backgroundColor: "#F5FCFF"
	},
	btn: {
		flex: 1,
		alignItems: 'center',
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	white: {
		color: 'white'
	},
	btnText: {
		fontSize: 34,
		color: 'white'
	},
	opsText: {
		fontSize: 28,
		color: 'white'
	},
	row: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'stretch'
	},
	result: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'flex-end',
		backgroundColor: 'white'
	},
	resultText: {
		fontSize: 30,
		color: '#434343'
	},
	calculation: {
		flex: 1,
		backgroundColor: '#e8e5e5',
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	calculationText: {
		fontSize: 24,
		color: '#434343'
	},
	buttons: {
		flex: 7,
		flexDirection: 'row'
	},
	numbers: {
		flex: 3,
		backgroundColor: '#434343'
	},
	operations: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'stretch',
		backgroundColor: '#636363'
	}
});
