import React from "react";
import {useFormikContext} from "formik";
import {Button} from "native-base";

const SubmitButton = ({title}) => {
    const {handleSubmit} = useFormikContext();
    return (
        <Button my={4} onPress={handleSubmit}>
            {title}
        </Button>
    )
};

export default SubmitButton;
