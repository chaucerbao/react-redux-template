// Dependencies
import produce from 'immer'
import React from 'react'
import {
  ChangeEvent,
  Checkbox,
  Input,
  Radio,
  Select,
  TextArea,
  fieldValue
} from 'components/form'
import DefaultLayout from './layouts/default'

// Type definitions
interface State {
  input: string
  textarea: string
  select: string
  multipleSelect: string[]
  checkbox: boolean
  radio: string
}

// Page
class Form extends React.Component<{}, State> {
  options = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
    { label: 'Four', value: '4' },
    { label: 'Five', value: '5' }
  ]

  constructor(props: {}) {
    super(props)

    this.state = {
      input: '',
      textarea: '',
      select: '',
      multipleSelect: [],
      checkbox: false,
      radio: ''
    }
  }

  updateField = (e: ChangeEvent) => {
    const key = e.currentTarget.name as keyof State
    const value = fieldValue(e)

    this.setState(produce((draft: State) => (draft[key] = value)))
  }

  render() {
    return (
      <DefaultLayout>
        <h1>Form</h1>

        <Input
          label="Input field"
          name="input"
          value={this.state.input}
          onChange={this.updateField}
        />
        <TextArea
          label="Text area"
          name="textarea"
          value={this.state.textarea}
          onChange={this.updateField}
        />
        <Select
          label="Select field"
          name="select"
          value={this.state.select}
          options={this.options}
          onChange={this.updateField}
        />
        <Select
          label="Multiple select field"
          name="multipleSelect"
          value={this.state.multipleSelect}
          options={this.options}
          multiple={true}
          onChange={this.updateField}
        />
        <Checkbox
          label="Checkbox field"
          name="checkbox"
          value={1}
          checked={this.state.checkbox}
          onChange={this.updateField}
        />
        <Radio
          label="Radio field"
          name="radio"
          value={this.state.radio}
          options={this.options}
          onChange={this.updateField}
        />
      </DefaultLayout>
    )
  }
}

export default Form
