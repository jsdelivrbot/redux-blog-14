import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions';

const required = (field) => (value) => (value ? undefined : `${field} is required.`)

const FIELDS = [
  {
    name: 'title',
    label: 'Title for Post',
    type: 'input',
    validation: required('Title'),
  },
  {
    name: 'category',
    label: 'Category',
    type: 'input',
    validation: required('Category'),
  },
  {
    name: 'content',
    label: 'Post Content',
    type: 'textarea',
    validation: required('Content'),
  },
];

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <field.type
          className='form-control'
          type={field.type}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {
          FIELDS.map((field) => {
            return (
              <Field
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                validate={field.validation}
                component={this.renderField}
              />
            );
          })
        }
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

export default reduxForm({
  form: 'PostsNew',
})(
  connect(null, { createPost })(PostsNew)
);
