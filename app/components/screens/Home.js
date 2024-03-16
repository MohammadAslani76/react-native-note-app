import React, {useContext, useEffect, useState} from 'react';
import {Button, Text} from "native-base";
import {DeleteModal, Screen} from "../index";
import {Entypo} from '@expo/vector-icons';
import {useNavigationState} from "@react-navigation/native";
import {BackHandler, FlatList, StyleSheet, TouchableOpacity, View} from "react-native"
import {customToast, successToast} from "../../utils/toast";
import {DataContext} from "../../context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({navigation}) => {

    const screenIndex = useNavigationState((state) => state.index);
    const value = useContext(DataContext)
    const [notes, setNotes] = value.notes;

    const [showModal, setShowModal] = useState(false)
    const [noteId, setNoteId] = useState(null)

    const getNotes = async () => {
        const initialNote = await AsyncStorage.getItem("notes");
        if (initialNote === null) {
            setNotes([])
        } else {
            setNotes(JSON.parse(initialNote))
        }
    }

    useEffect(() => {

        getNotes()

        let currentCount = 0;

        if (screenIndex <= 0) {
            BackHandler.addEventListener("hardwareBackPress", () => {
                if (currentCount === 1) {
                    BackHandler.exitApp();
                    return true;
                }

                currentCount += 1;
                customToast("برای خروج دوباره دکمه برگشت را لمس بنمایید")

                setTimeout(() => {
                    currentCount = 0;
                }, 1500);

                return true;
            });
        }
    }, [screenIndex]);

    const closeModal = () => {
        setShowModal(false);
        setNoteId(null)
    }

    const handleDelete = async () => {
        const filterNotes = notes.filter(n => n.id != noteId)
        setNotes(filterNotes)
        await AsyncStorage.setItem("notes", JSON.stringify(filterNotes))
        setShowModal(false)
        setNoteId(null)
        successToast("یادداشت حذف شد")
    }

    return (
        <>
            <Screen>
                <Button variant="solid" mb={5}
                        leftIcon={<Entypo name="plus" size={20} color="white"/>}
                        onPress={() => navigation.navigate("Add")}>
                    افزودن یادداشت
                </Button>
                <FlatList
                    data={notes}
                    keyExtractor={(note) => note.id.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onLongPress={() => {
                                setShowModal(true)
                                setNoteId(item.id)
                            }}
                            onPress={() => navigation.navigate("Edit", item)}>
                            <View style={styles.note}>
                                <Text>{item.text}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </Screen>
            <DeleteModal showModal={showModal} closeModal={closeModal} handleDelete={handleDelete}/>
        </>
    );
};

const styles = StyleSheet.create({
    note: {
        padding: 8,
        borderWidth: 1,
        borderColor: "#287fa9",
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: "#eae9e9"
    }
})

export default Home;