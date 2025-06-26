import {Image, ImageProps} from "react-native"

export function pidpisImage(props: ImageProps){
    return(
        <Image source={require("./pidpis.png")} {...props}/>
    )
}



