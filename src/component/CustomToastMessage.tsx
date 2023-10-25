import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import { COLORS, Fonts } from "../utilits/GlobalAssets";

const CutomToastFail = (msg: any) => {
  return showMessage({
    message: msg == undefined ? "Somthing went wrong" : msg,
    type: "none",
    
  });
};

const CutomToastSuccess = (msg: any) => {
  return showMessage({
    message: msg == undefined ? "Somthing went wrong" : msg,
    type: "success",
    titleStyle:{fontFamily:Fonts.regular,fontSize:14,letterSpacing:1},
    style:{backgroundColor:'#00AB66'}
    
  });
};

const showPopupWithOkAndCancel = (
  title: string,
  message: string,
  okClicked: any,
  cancelClicked: any,
  button1: string,
  button2: string
) => {
  Alert.alert(title ? title : "Dating App", message ? message : "", [
    {
      text: button1 ? button1 : "Cancel",
      onPress: () => cancelClicked && cancelClicked(),
      style: "cancel",
    },
    {
      text: button2 ? button2 : "OK",
      onPress: () => okClicked && okClicked(),
    },
  ]);
};

export { CutomToastFail, CutomToastSuccess, showPopupWithOkAndCancel };
