import { renderHook } from '@testing-library/react-hooks';
import usePersistenceUrl from './usePersistenceUrl';
import { TestRoot } from '../test/TestRoot';

describe('usePersistenceUrl', () => {
    it('changeParams and urlParams', () => {
        const {result}= renderHook(() => usePersistenceUrl(), {
            wrapper: TestRoot
        })

        result.current.changeParams({sort: 'content-asc', search: 'test'})

        expect(window.location.search).toEqual('?sort=content-asc&search=test')

        const {sort, search} = result.current.urlParams

        expect(sort).toEqual('content-asc')
        expect(search).toEqual('test')
    })
})
