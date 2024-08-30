export const countryNameFilter = (searchTerm, data) => {
    const searchTermStr = String(searchTerm);
    let searchTermLower = searchTermStr.toLowerCase();
    if (searchTermLower == '"')  {
        return true;
    }
    else if (searchTermLower.startsWith('"') && searchTermLower.endsWith('"')) {
        const exactSearchTerm = searchTermLower.slice(1, -1);
        return String(data) === exactSearchTerm;
    }
    else if (searchTermLower.startsWith('"'))  {
        searchTermLower = searchTermLower.slice(1);
    }
    return data !== undefined
        ? String(data).toLowerCase().includes(searchTermLower.toLowerCase())
        : false;
};

export const populationFilter = (searchTerm, data) => {
    const searchTermNum = Number(searchTerm);
    return  data < searchTermNum;
}