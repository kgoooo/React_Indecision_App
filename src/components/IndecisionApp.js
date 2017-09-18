import React from 'react'
import AddOption from './AddOption'
import Header from './Header'
import Action from './Action'
import Options from './Options'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
	state = {
		options: [],
		selectedOption: undefined
	};
	handleDeleteOptions = () => {
		this.setState(() => ({ options: [] }))
	};
	handleDeleteOption = (optionToRemove) => {
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => optionToRemove !== option)
		}))
	};
	handlePick = () => {
		const randomNumber = Math.floor(Math.random() * this.state.options.length)
		const decision = this.state.options[randomNumber];
		this.setState(() => ({ selectedOption: decision}))
	};
	handleAddOption = (option) => { //This exists down in AddOption as well.  thats where data flow starts, then comes here to change the state.
		if (!option) {
			return 'Enter valid option to add';
		} else if (this.state.options.indexOf(option) > -1) {
			return 'This option already exists!'
		}
		this.setState((prevState) => ({ options: prevState.options.concat(option) }))
	};
	handleClearSelectedOption = () => {
		this.setState(() => ({ selectedOption: undefined }))
	}
	componentDidMount() {
		try {
			const json = localStorage.getItem('options')
			const options = JSON.parse(json);

			if (options) {
				this.setState(() => ({ options }))
			}
		} catch (e) {

		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options)
			localStorage.setItem('options', json)
		}
	}
	
	render() {
		const subTitle = "Put your life in the hands of a computer!"
		return (
			<div>
				<Header subTitle={subTitle} />
				<Action
					hasOptions={this.state.options.length > 0}
					handlePick={this.handlePick}
				/>
				<Options
					options={this.state.options}
					handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteOption={this.handleDeleteOption}
				/>
				<AddOption
					handleAddOption={this.handleAddOption}
				/>
				<OptionModal 
					selectedOption={this.state.selectedOption}
					handleClearSelectedOption={this.handleClearSelectedOption}
				/>
			</div>
		)
	}
}
