import { createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "./common";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<Name extends keyof RootStackParamList>(
    name: Name,
    params?: RootStackParamList[Name]
) {
    if (navigationRef.isReady()) {
        if (params === undefined) {
            navigationRef.navigate(name as any);
        } else {

            navigationRef.navigate(name as any, params as any);
        }
    }
}