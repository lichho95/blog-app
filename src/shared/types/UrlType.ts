export type UrlParams = {
    sort: string,
    search: string,
    page: string
}

export type PersistenceUrl = {
    changeParams: (obj: {[key: string]: string}) => void,
    urlParams: { [key: string]: string }
}