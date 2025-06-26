import {Image, ImageProps} from "react-native"

export function addPlusImage(props: ImageProps){
    return(
        <Image source={require("./addPlus.png")} {...props}/>
    )
}


