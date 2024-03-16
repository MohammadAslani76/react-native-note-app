import React from 'react';
import {Alert, HStack, Text, VStack} from "native-base";
import {StyleSheet} from "react-native";

const NoteAlert = ({status,title}) => {
    return (
        <Alert variant="subtle" w="100%" status={status} style={styles.alert}>
            <VStack space={2} flexShrink={1} w="100%">
                <HStack space={2} flexShrink={1} alignItems="center" justifyItems="space-between">
                    <HStack space={2} flexShrink={1} alignItems="center">
                        <Alert.Icon/>
                        <Text color="coolGray.800">{title}</Text>
                    </HStack>
                </HStack>
            </VStack>
        </Alert>
    );
};

const styles = StyleSheet.create({
    alert : {
        position: "absolute",
        bottom : 10,
    }
})

export default NoteAlert;