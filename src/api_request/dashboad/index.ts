import base from "../axios";
import END_POINTS from "../endPoints";

export const fetchSongCount = async () => {
    try {
        const response = await base.get(END_POINTS.music_count)
        return response?.data?.count
    } catch (err) {
        console.error('Failed to fetch song count:', err)
        return null
    }
}