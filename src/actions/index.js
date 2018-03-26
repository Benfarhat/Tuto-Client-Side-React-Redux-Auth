import { SET_DARK_HEADER } from './types'


export const setDarkHeader = isDark => {
    return {
        type: SET_DARK_HEADER,
        payload: isDark
    }
} 