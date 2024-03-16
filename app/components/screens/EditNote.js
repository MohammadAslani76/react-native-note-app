import React,{useContext, useEffect, useState} from 'react';
import {Box, Button} from "native-base";
import {DeleteModal, NoteForm, NoteTextInput, Screen, SubmitButton} from "../index";
import {useNavigationState} from "@react-navigation/native";
import {DataContext} from "../../context/context";
import {BackHandler} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import {successToast} from "../../utils/toast";

const validationSchema = Yup.object().shape({
    text: Yup.string().required("متن یادداشت الزامی می باشد")
});

const EditNote = ({navigation,route}) => {

    const screenIndex = useNavigationState((state) => state.index);

    const value = useContext(DataContext)
    const [notes] = value.notes;

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (screenIndex > 0) {
            BackHandler.addEventListener("hardwareBackPress", () => {
                navigation.goBack()
                return true
            })
        }
    },[])

    const closeModal = () => {
        setShowModal(false)
    }

    const handleDelete = async () => {
        const filterNotes = notes.filter(n => n.id != route.params.id)
        await AsyncStorage.setItem("notes", JSON.stringify(filterNotes))
        setShowModal(false)
        successToast("یادداشت حذف شد")
        navigation.navigate("Home")
    }

    return (
        <Screen>
            <Box w="100%">
                <NoteForm
                    initialValues={{
                        text: route.params.text
                    }}
                    onSubmit={async (note) => {
                        const backupNotes = [...notes]
                        const findNoteIndex = notes.findIndex(n => n.id == route.params.id)
                        backupNotes[findNoteIndex].text = note.text
                        await AsyncStorage.setItem("notes", JSON.stringify(backupNotes))
                        successToast("یادداشت ویرایش شد")
                        navigation.navigate("Home")
                    }}
                    validationSchema={validationSchema}
                >
                    <NoteTextInput placeholder="تایپ کنید ..." name="text"
                                   textValue={route.params.text} />
                    <SubmitButton title="ویرایش"/>
                </NoteForm>
                <Button colorScheme="error" onPress={() => setShowModal(true)}>
                    حذف
                </Button>
                <DeleteModal showModal={showModal} closeModal={closeModal} handleDelete={handleDelete}/>
            </Box>
        </Screen>
    );
};

export default EditNote;