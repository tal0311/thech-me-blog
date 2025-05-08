const trans={
    'comments': {
        'en': 'Comments',
        'he': 'תגובות',
    },
    'totalComments': {
        'en': 'Total Comments',
        'he': 'סך הכל תגובות',
    },
    'addComment': {
        'en': 'Add Comment',
        'he': 'הוסף תגובה',
    },
    'approvedComments':{
        'en': 'Approved Comments',
        'he': 'תגובות מאושרות',
    }
}


function getTrans(key , lang) {
    return trans[key][lang]
}

export const i18nService = {
    getTrans
}
