import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, ScrollView } from "react-native";
import { styles } from "./settings.styles";
import { IMAGES } from "../../../../../shared/ui/images/index"
import { Input } from "../../../../../shared/ui/input/input";
import { SignatureComponent } from "../signature-component";





export function SettingsPage(){

    return(
        <View style={{flex: 1, flexDirection: "column", paddingTop: 25, justifyContent: "center"}}>
            <ScrollView> 
                <View style={{flexDirection: "column", gap: 10}}>
                        <View style={{width: "75%", flexDirection: "row", gap: 16, paddingLeft:15}}>
                        <TouchableOpacity 
                        style={styles.textButtonsUp}
                    >
                        <Text style={styles.textButtonsUpInfo}>Особиста інформація</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.textButtonsUp}
                        onPress={() => {
                            router.push("/settings-album")
                        }}
                    >
                       <Text style={styles.textButtonsUpAlbum}>Альбоми</Text>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.personalCard}>
                        <View style={styles.PCcontainer1}>
                            <Text style={{fontWeight: 500, fontSize: 16}}>Картка профілю</Text>
                            <TouchableOpacity><IMAGES.editPencilImage style={{width: 40, height: 40}}/></TouchableOpacity>
                        </View>

                        <View style={styles.PCcontainer2}>
                            <View style={styles.profileImage}>
                                <IMAGES.profileImage style={{width: 120, height: 120, borderRadius: 95}}/>
                            </View>

                            <View style={styles.profileNameText}>
                                <Text style={{fontWeight: 700, fontSize: 20}}>Lina Li</Text>
                                <Text>@thelili</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.personalInfo}>
                        <View style={styles.PCcontainer1}>
                            <Text style={{fontWeight: 500, fontSize: 16}}>Особиста інформація</Text>
                            <TouchableOpacity><IMAGES.editPencilImage style={{width: 40, height: 40}}/></TouchableOpacity>
                        </View>
                        <View style={styles.allInputs}>
                            <View style={styles.inputs}>
                                <Text style={{opacity: .5, fontSize: 16}}>Ім’я</Text>
                                <Input placeholder="Linas"/>
                            </View>

                            <View style={styles.inputs}>
                                <Text style={{opacity: .5, fontSize: 16}}>Прізвище</Text>
                                <Input placeholder="Li"/>
                            </View>

                            <View style={styles.inputs}>
                                <Text style={{opacity: .5, fontSize: 16}}>Дата народження</Text>
                                <Input placeholder="15.04.2001"/>
                            </View>

                            <View style={styles.inputs}>
                                <Text style={{opacity: .5, fontSize: 16}}>Електронна адреса</Text>
                                <Input placeholder="you@example.com"/>
                            </View>

                            <View style={styles.inputs}>
                                <Text style={{opacity: .5, fontSize: 16}}>Пароль</Text>
                                <Input placeholder="password"/>
                            </View>
                        </View>
                    </View>

                    <View style={styles.profileCard}>
                        <View style={styles.PCcontainer1}>
                            <Text style={{fontWeight: 500, fontSize: 16}}>Варіанти підпису</Text>
                            <TouchableOpacity><IMAGES.editPencilImage style={{width: 40, height: 40}}/></TouchableOpacity>
                        </View>

                        <View style={{flexDirection: "column", gap: 15, height: 60}}>
                            <View>
                                <View style={{opacity: .5, flexDirection: "row", height: "100%"}}> 
                                    <View style={{height:"100%", flexDirection: "column", justifyContent:"center"}}>
                                        <View style={{flexDirection:"column", justifyContent: "center", height:17, paddingRight:7}}><View style={{flexDirection: "column", height: "100%", justifyContent:"center"}}><IMAGES.checkboxOutlineImage style={{width:20, height:"100%", flexDirection: "column", justifyContent: "center"}}/></View></View>
                                    </View>
                                    <View style={{flexDirection: "column", height: "100%", justifyContent: "center"}}><Text style={{fontSize: 16}}>Ім’я та прізвище</Text></View>
                                    </View>
                            </View>
                            <Text style={{fontSize: 16}}>Lina Li</Text>
                        </View>
                        

                        {/* <View style={{flexDirection: "column", height: 90, paddingTop: 55, gap: 14}}>
                            <View style={{opacity: 0.5}}>
                                <View style={{flexDirection: "row", height: "100%", paddingTop:5}}> 
                                    <View style={{height:"100%", flexDirection: "column", justifyContent:"center"}}>
                                        <View style={{flexDirection:"column", justifyContent: "center", height:17, paddingRight:7}}><View style={{flexDirection: "column", height: "100%", justifyContent:"center"}}><IMAGES.checkboxOutlineImage style={{width:20, height:"100%", flexDirection: "column", justifyContent: "center"}}/></View></View>
                                    </View>
                                    <View style={{flexDirection: "column", height: "100%", justifyContent: "center"}}><Text style={{fontSize: 16}}>Мій електронний підпис</Text></View>
                                    </View>
                            </View>
                            <View style={{width:"100%", height: 60, flexDirection:"column", justifyContent: "center", alignItems: "center"}}><IMAGES.pidpisImage style={{height:40, width: 131}} /></View>
                        </View> */}

                        


                    </View>

                    <SignatureComponent/>
                    
                    <View style={{height:180}}>

                    </View>
                </View>
                
            </ScrollView>
            
        </View>
    )
}