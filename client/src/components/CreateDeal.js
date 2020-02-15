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
        // required inputs are:
        //     - dealTitle
        //     - dealDescription
        //     - dealVenue
        //     - dealLocation

        // this object is gradually built up with 
        const errors = {};
        const errorMessages = {
            dealTitle: "Please add a deal title",
            dealDescription : "Type a short description",
            dealVenue: "Name the restaurant or bar",
            dealLocation: "Where is the deal?"
        }
        
        errors.dealTitle = values.dealTitle ? undefined : errorMessages.dealTitle;
        errors.dealDescription = values.dealDescription ? undefined : errorMessages.dealDescription;
        errors.dealVenue = values.dealVenue ? undefined : errorMessages.dealVenue;
        errors.dealLocation = values.dealLocation ? undefined : errorMessages.dealLocation;

        // formik will automatically check this object to see if any fields were missed/invalid
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