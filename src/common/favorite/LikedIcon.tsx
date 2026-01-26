import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
    liked: boolean;
    onToggle: () => void;
}

export function LikedIcon({ liked, onToggle }: Props) {
    return (
        <TouchableOpacity onPress={onToggle} style={styles.likedButton} >
            <Icon
                name={liked ? 'heart' : 'heart-outline'}
                size={30}
                color={liked ? 'red' : 'black'}
            />
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    likedButton: {
        marginRight: 12,
    },
});
