// State Management
export const state = {
    CHARACTERS: [],
    PROMO_CODES: [],
    TIMELINE_EVENTS: [],
    GUIDES: [],
    dataSource: 'loading',
    currentLang: localStorage.getItem('nte_lang') || 'uk',
    currentSquad: [null, null, null, null],
    activeSelectorSlot: null,
    activeGuideFilter: 'all',
    guideSearchQuery: '',
    editorState: {
        "S+": [],
        "S": [],
        "A": [],
        "B": [],
        "pool": []
    }
};

