import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
container: {
    // flex: 1,
    // backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
},
title: {
    fontSize: 20,
    fontWeight: "bold",
},
text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
},
containerFrist: {
    marginVertical: 30,
    height: 1,
    width: "80%",
},
mainContainer: {
    // flex: 1,
    height: 750,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: COLORS.white,
    borderRadius: 20,
},
textCreate: {
    fontSize: 24,
    // marginTop: 25,
    color: "#070A1C",
    fontWeight: 500,
},
textNameCreate: {
    fontFamily: "System",
    // marginTop: 50,
    marginBottom: 0,
    fontSize: 16,
}, 
inputName: {
    // marginBottom: 30,
    borderColor: COLORS.black
},
buttonPublish: {
    flexDirection: "row",
    gap: 8,
    width: 130,
    // marginLeft: 20
    height: 52,
    borderRadius: 1234,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.plum,
    color: COLORS.white,
},
button: {
    width: 100,
},
inputTopic: {

},
containerName: {
    // paddingTop: 20
},
containerSettings: {
    // flex: 1,
    flexDirection: "column",
    gap: 16
},
textTopiceCreate: {
    fontSize: 16,
},
inputDescription: {
    height: 400,
},
// inputBoxDescription: {
//   flexDirection: "column",
    // // alignItems: "center",
    // paddingHorizontal: 10,
    // borderRadius: 10,
    // backgroundColor: COLORS.white,
    // borderWidth: 1,
    // borderColor: COLORS.blue20,
// height: 140
// },
inputBoxDescriptionContainer: {

},
inputUrl: {

},
textUrlCreate: {
    marginTop: 5,
},
TextColor: {
    color: COLORS.white,
    // fontSize: 14
},
iconButton: {
    borderWidth: 1,
    borderColor: COLORS.plum,
    borderRadius: 50,
    padding: 0,
    marginLeft: 10,
},
closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
},
footerButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
},
inputBoxDescription: {
    borderWidth: 1,
    borderColor: COLORS.blue20,
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
},
tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    gap: 8,
},
tagChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: COLORS.grayLight, 
},
tagChipSelected: {
    backgroundColor: COLORS.plum,
},
tagText: {
    color: COLORS.black,
    fontSize: 14,
},
tagTextSelected: {
    color: COLORS.white,
},

selectedTagsContainer: {
    marginTop: 12,
},
selectedTagItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 8,
},
selectedTagText: {
    color: COLORS.black,
    fontSize: 13,
    marginRight: 6,
},
removeTagButton: {
    backgroundColor: COLORS.red,
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
},
removeTagButtonText: {
    color: "white",
    fontSize: 12,
},
scrollView: {
    marginTop: 3, 
    marginBottom: 17,
    // paddingHorizontal: 10,
    // flexDirection: "row", 
    // gap: 10,
    // overflow: "scroll",
    width: "100%",
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 5,
},
// scrollViewContent: {
//     flexGrow: 1,
//     alignItems: 'center', // Ensure this is applied here
//     justifyContent: 'center', // Optional, based on your layout needs
// },


krestText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
},
// headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: COLORS.black,
// },
headerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
},


containerFirstLogin: {

    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

    // height: 467,
    // width: 343,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // затемнение фона (по желанию)
    // paddingHorizontal: 20,
},

modalContent: {
    height: 467,
    width: 343,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
  }
  




});