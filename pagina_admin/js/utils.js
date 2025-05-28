function formatLink(url) {
    if (!url || typeof url !== 'string') return ''; 
    const trimmedUrl = url.trim();
    if (trimmedUrl === '') return ''; 

    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
        return 'https://' + trimmedUrl;
    }
    return trimmedUrl;
}