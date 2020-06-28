import React from 'react';
import { connect } from 'react-redux';
import { createDeal } from '../actions';

import { Formik, Form, Field } from 'formik';
import { Typography, Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import './CreateDeal.css';


class CreateDeal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSubmitting: false,
            dealCount: props.dealCount
        };
      }

    handleFormSubmit = (values) => {
        this.props.createDeal(values);
    }

    renderLoadingBar(isSubmitting) {
        if (isSubmitting) {
            return <LinearProgress />;
        } else {
            return null;
        }
    }

    validateForm(values) {

        // this object is populated with any validation errors then returned 
        const errors = {};
        
        const requiredFields = [
            'title',
            'description',
            'venue',
            'location'
        ];

        const errorMessages = {
            title: "Please add a deal title",
            description : "Type a short description",
            venue: "Name the restaurant or bar",
            location: "Where is the deal?",
            DEFAULT: "Required Field"
        };
         
        // iterate over the required field names
        for (const field of requiredFields) {
            // check each entry against the submitted values object to ensure that each required field is present 
            if (!values[field]) {
                // if a required field wasn't entered, return the custom validation message or the default placeholder
                errors[field] = errorMessages[field] || errorMessages.DEFAULT;
            }
        }

        // formik will then automatically check this object to see if any fields were missed/invalid, and add it to the matching field name
        return errors;
    }

    // Formik passes a lot of info to this funciton, only a few key values are required
    renderForm = ({submitForm, isSubmitting}) => {

        // if the deal has been submit successfully, as there are now more deals than when we first loaded the form
        if (isSubmitting && this.props.dealCount > this.state.dealCount) {
            this.props.history.push('/');
        }
        // TODO: error when the deal creation fails

        return (
            <Form className="create-deal">

                {/* Deal Title */}
                <Field
                    component={TextField}
                    name="title"
                    type="text"
                    label="Deal Title"
                    className="form-input"
                />
                <br />

                {/* Deal Description */}
                <Field
                    component={TextField}
                    name="description"
                    type="text"
                    label="Description"
                    className="form-input"
                />
                <br />

                {/* Deal Venue */}
                <Field
                    component={TextField}
                    name="venue"
                    type="text"
                    label="Venue Name"
                    className="form-input"
                />
                <br />

                {/* Deal Location */}
                <Field
                    component={TextField}
                    name="location"
                    type="text"
                    label="Town/City"
                    className="form-input"
                />
                <br />
                {this.renderLoadingBar(isSubmitting)}
                <Button
                    className="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                >
                    Submit deal
                </Button>
            </Form>
        );
    }

    render() {
        return (
            <div>
                <Typography variant="h5">
                    Fill in the form to add a new deal to the catalogue
                </Typography>

                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        venue: '',
                        location: ''
                    }}
                    validate={this.validateForm}
                    validateOnChange={false}
                    validateOnBlur={true}
                    onSubmit={this.handleFormSubmit}
                >
                    {/* Formik as a HOC automatically passes useful parameters to this function */}
                    {this.renderForm}
                </ Formik>
            </div>
        )
    }
    
};

const mapStateToProps = (state) => {
    return {
        dealCount: Object.values(state.deals).length
    };
};

// This form does not currently require access to the redux state, only the createDeal action
export default connect(mapStateToProps, { createDeal })(CreateDeal);