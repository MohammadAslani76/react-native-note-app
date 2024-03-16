import React from "react";
import { Formik } from "formik";

const NoteForm = ({
                          initialValues,
                          onSubmit,
                          validationSchema,
                          children,
                      }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {() => <>{children}</>}
        </Formik>
    );
};

export default NoteForm;
