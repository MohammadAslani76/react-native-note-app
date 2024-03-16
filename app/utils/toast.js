import Toast from "react-native-tiny-toast";

export const successToast = (message) => {
    Toast.showSuccess(message, {
        position: Toast.position.CENTER,
        textStyle: {
            fontFamily: "vazir",
            fontSize : 14
        },
        shadow: true,
    });
};

export const loadingToast = (message) => {
    Toast.showLoading(message, {
        position: Toast.position.CENTER,
        textStyle: {
            fontFamily: "vazir",
            fontSize : 14
        },
        shadow: true,
    });
};

export const customToast = (message) => {
    Toast.show(message, {
        position: Toast.position.BOTTOM,
        textStyle: {
            fontFamily: "vazir",
            fontSize : 14
        },
        shadow: true,
    });
};
