import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import {TextArea} from "native-base";

const NoteTextInput = ({ name, textValue, ...otherProps }) => {
    const {
        handleChange,
        setFieldTouched,
        errors,
        touched,
    } = useFormikContext();

    return (
        <>
            <TextArea
                {...otherProps}
                h="60%"
                onChangeText={handleChange(name)}
                onBlur={() => setFieldTouched(name)}
                defaultValue={textValue}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
};

export default NoteTextInput;
