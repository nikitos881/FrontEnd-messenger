import { SafeAreaProvider } from "react-native-safe-area-context";
import { ReactNode } from "react";


export function Providers({children}: {children: ReactNode}) {
    return (
        <SafeAreaProvider>
            {children}
        </SafeAreaProvider>
    )
}