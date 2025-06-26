import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, ActivityIndicator, ScrollView } from "react-native";
import {styles} from "./group-chats.styles"
import { ICONS } from "../../../../../shared/ui/icons";
import { IMAGES } from "../../../../../shared/ui/images";



export function GroupChatsPage(){

    return(
        <View style={{flex: 1}}>
            <View style={styles.groupChatContainer}>
                <View style={{flexDirection:"row", justifyContent: "flex-start", alignItems: "flex-start", height:88, width: "100%", borderBottomWidth: 1, borderColor: "#CDCED2"}}>
                    <View style={{flexDirection:"row", height: 68}}>
                        <View style={{flexDirection: "row", width: "100%", height:"100%", gap: 8}}>
                            <View style={{flexDirection: "column", justifyContent: "center", paddingLeft: 10}}>
                                <TouchableOpacity><ICONS.LeftArrow style={{width:22, height:22, borderColor: "#81818D", flexDirection: "column", justifyContent: "center"}} /></TouchableOpacity>
                            </View>
                            <View style={{flexDirection: "row", gap: 8, width:"80%"}}>
                                <View style={styles.contactAvatar}>
                                    {/* <Image source={require("../../../../../assets/icon.png")} style={styles.avatar} /> */}
                                </View>
                                <View style={{flexDirection: "column"}}>
                                    <Text style={{fontWeight: 500, color:"#070A1C", fontSize: 22}}>New Group</Text>
                                    <Text style={{color: "#81818D", fontSize: 13.2}}>3 учасники, 1 в мережі</Text>
                                </View>
                            </View>

                            <View style={{flexDirection:"column", justifyContent: "center", height:"100%"}}>
                                <View style={{height:"100%", flexDirection: "column", justifyContent: "center"}}>
                                    <TouchableOpacity><ICONS.DotsIcon style={{width:28, height:28, borderColor: "#81818D"}} /></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        
                    </View>
                </View>

                <View style={{marginTop: 125, width:"100%", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 12}}>

                    <View style={{backgroundColor: "#E9E5EE", borderRadius:4, padding: 6, paddingBottom: 4, paddingTop: 4, width: 140, flexDirection: "row", justifyContent: "center"}}><Text style={{fontSize: 14, color: "#81818D"}}>25 квітня 2025</Text></View>
                    <View style={{flexDirection:"row", justifyContent: "flex-end", width: "100%", marginTop: 3}}>
                        <View style={{alignSelf: 'flex-start', height: 42, backgroundColor: "#CDCED2", borderRadius: 6, flexDirection: "row", gap: 10, padding: 10, justifyContent: "flex-end", alignItems: 'flex-end'}}>
                            <Text style={{fontSize: 13.2}}>Привіт!</Text>
                            <View style={{flexDirection:"row"}}><Text style={{color: "#81818D", fontSize: 9}}>10:01</Text> <View style={{flexDirection: "column", justifyContent: "center"}}><ICONS.ChatIcon style={{width: 9, height: 9, flexDirection: "column", justifyContent: "flex-end"}} /></View></View>
                        </View>
                    </View>

                    <View style={{flexDirection:"row", justifyContent: "flex-start", width: "100%", height: 59}}>
                        <View style={{flexDirection:"column", justifyContent: "center"}}>
                            <View style={styles.contactAvatar2}>
                                {/* <Image source={require("../../../../../assets/icon.png")} style={styles.avatar2} /> */}
                            </View>
                        </View>
                        
                        <View style={{flexDirection:"column", justifyContent: "center"}}>
                            <View style={{alignSelf: 'flex-start', height: 59, backgroundColor: "#FFFFFF", borderRadius: 6, flexDirection: "row", gap: 10, padding: 10, justifyContent: "flex-end", alignItems: 'flex-end', borderColor: "#E9E5EE", borderWidth:1}}>
                                <View style={{flexDirection: "column", gap: 4}}>
                                    <Text style={{color: "#543C52", fontSize: 9}}>Wade Warren</Text>
                                    <Text style={{fontSize: 13.2}}>Привіт! Як справи ?!</Text>
                                </View>
                                
                                <View style={{flexDirection:"row"}}><Text style={{color: "#81818D", fontSize: 9}}>10:30</Text><View style={{flexDirection: "column", justifyContent: "center"}}><ICONS.ChatIcon style={{width: 9, height: 9, flexDirection: "column", justifyContent: "flex-end"}} /></View></View>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:"row", gap: 15, width:"100%", justifyContent: "center", alignItems: "center"}}>
                        <Text style={{backgroundColor:"#E2E0E8", width:"22%", height:1}}></Text><Text style={{fontSize: 14, color: "#81818D"}}>Нові повідомлення</Text><Text style={{backgroundColor:"#E2E0E8", width:"22%", height:1}}></Text>
                    </View>

                    <View style={{flexDirection:"row", justifyContent: "flex-start", width: "100%", height: 59}}>
                        <View style={{flexDirection:"column", justifyContent: "center"}}>
                            <View style={styles.contactAvatar2}>
                                {/* <Image source={require("../../../../../assets/icon.png")} style={styles.avatar2} /> */}
                            </View>
                        </View>
                        
                        <View style={{flexDirection:"column", justifyContent: "center"}}>
                            <View style={{alignSelf: 'flex-start', height: 59, backgroundColor: "#FFFFFF", borderRadius: 6, flexDirection: "row", gap: 10, padding: 10, justifyContent: "flex-end", alignItems: 'flex-end', borderColor: "#E9E5EE", borderWidth:1}}>
                                <View style={{flexDirection: "column", gap: 4}}>
                                    <Text style={{color: "#543C52", fontSize: 9}}>Cameron Williamson</Text>
                                    <Text style={{fontSize: 13.2}}>Чудово!</Text>
                                </View>
                                
                                <View style={{flexDirection:"row"}}><Text style={{color: "#81818D", fontSize: 9}}>10:30</Text>
                                    <View style={{flexDirection: "column", justifyContent: "center"}}><ICONS.ChatIcon style={{width: 9, height: 9, flexDirection: "column", justifyContent: "flex-end"}} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{height: 47, width: "100%", marginTop: 48, flexDirection:"row", gap: 20}}>
                    <TextInput style={styles.input} placeholder="Повідомлення"></TextInput>
                    <View style={{width: "30%", flexDirection:"row", justifyContent: "space-between"}}><TouchableOpacity><IMAGES.addPlusImage style={{width: 47, height: 47}} /></TouchableOpacity> <TouchableOpacity><IMAGES.PublishSendButtonImage style={{width: 47, height: 47}} /></TouchableOpacity> </View>
                </View>
            </View>
        </View>
    )
}