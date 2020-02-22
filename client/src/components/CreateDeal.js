import React from 'react';
import { createDeal } from '../apis/deals';
import { Formik, Form, Field } from 'formik';

import { Typography, Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import './CreateDeal.css';


class CreateDeal extends React.Component {

    handleFormSubmit(values) {
        createDeal(values);
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
            'dealTitle',
            'dealDescription',
            'dealVenue',
            'dealLocation'
        ];

        const errorMessages = {
            dealTitle: "Please add a deal title",
            dealDescription : "Type a short description",
            dealVenue: "Name the restaurant or bar",
            dealLocation: "Where is the deal?",
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

    render() {
        return (
            <div>
                <Typography variant="h5">
                    Fill in the form to add a new deal to the catalogue
                </Typography>

                <Formik
                    initialValues={{
                        dealTitle: '',
                        dealDescription: '',
                        dealVenue: '',
                        dealLocation: ''
                    }}
                    validate={this.validateForm}
                    onSubmit={this.handleFormSubmit}
                >
                    {({ submitForm, isSubmitting }) => (

                        <Form className="create-deal">
                            {/* Deal Title */}
                            <Field
                                component={TextField}
                                name="dealTitle"
                                type="text"
                                label="Deal Title"
                                className="form-input"
                            />
                            <br />

                            {/* Deal Description */}
                            <Field
                                component={TextField}
                                name="dealDescription"
                                type="text"
                                label="Description"
                                className="form-input"
                            />
                             <br />

                            {/* Deal Venue */}
                            <Field
                                component={TextField}
                                name="dealVenue"
                                type="text"
                                label="Venue Name"
                                className="form-input"
                            />
                             <br />

                            {/* Deal Location */}
                            <Field
                                component={TextField}
                                name="dealLocation"
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
                    )}
                </ Formik>
            </div>
        )
    }
    
}

export default CreateDeal;