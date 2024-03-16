import React,{useEffect,useContext} from 'react';
import {Box} from "native-base";
import {NoteForm, NoteTextInput, Screen, SubmitButton} from "../index";
import * as Yup from "yup";
import {useNavigationState} from "@react-navigation/native";
import {BackHandler} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShortUniqueId from 'short-unique-id';
import {DataContext} from "../../context/context";
import {successToast} from "../../utils/toast";

const validationSchema = Yup.object().shape({
    text: Yup.string().required("متن یادداشت الزامی می باشد")
});

const AddNote = ({navigation}) => {

    const screenIndex = useNavigationState((state) => state.index);
    const { randomUUID } = new ShortUniqueId();

    const value = useContext(DataContext)
    const [notes] = value.notes;

    useEffect(() => {
        if (screenIndex > 0) {
            BackHandler.addEventListener("hardwareBackPress", () => {
                navigation.goBack()
                return true
            })
        }
    },[])

    return (
        <Screen>
            <Box w="100%">
                <NoteForm
                    initialValues={{
                        text: ""
                    }}
                    onSubmit={async (note) => {
                        const backupNotes = [...notes]
                        backupNotes.unshift({...note,id: randomUUID()})
                        await AsyncStorage.setItem("notes", JSON.stringify(backupNotes))
                        successToast("یادداشت افزوده شد")
                        navigation.navigate("Home")
                    }}
                    validationSchema={validationSchema}
                >
                    <NoteTextInput placeholder="تایپ کنید ..." name="text"
                                   textValue="" />
                    <SubmitButton title="افزودن"/>
                </NoteForm>
            </Box>
        </Screen>
    );
};

export default AddNote;