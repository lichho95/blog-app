import { blogs } from '../shared/test/testFactory';
import { getQueryParams, getSortObj, sortArray } from './utils';
describe('utils function', () => {
  it('getQueryParams', () => {
    const location = {
        ...window.location,
        search: '?page=1&search=test&sort=title-asc',
      };
      Object.defineProperty(window, 'location', {
        writable: true,
        value: location,
      });
    const retData = getQueryParams();
    expect(retData.page).toEqual('1');
    expect(retData.search).toEqual('test');
    expect(retData.sort).toEqual('title-asc');
  });

  it('getSortObj', () => {
    const sort = getSortObj('title-asc')

    expect(sort.sortVal).toEqual('title')
    expect(sort.sortOrder).toEqual('asc')
  })

  describe('sortArray', () => {
    it('sortBy string', () => {
        const sortedDescBlogs = sortArray(blogs, 'desc', 'title')

        for (let i = 0; i < sortedDescBlogs.length - 1; i++) {
            expect(sortedDescBlogs[i].title.localeCompare(blogs[i].title)).toBeGreaterThanOrEqual(0);
        }

        const sortedAscBlogs = sortArray(blogs, 'asc', 'title')

        expect(blogs).toEqual(sortedAscBlogs)
        
    })

    it('sortBy date', () => {
      const sortedDescBlogs = sortArray(blogs, 'desc', 'title')

      for (let i = 0; i < sortedDescBlogs.length - 1; i++) {
          expect(sortedDescBlogs[i].createdAt.localeCompare(blogs[i].createdAt)).toBeGreaterThanOrEqual(0);
      }

      const sortedAscBlogs = sortArray(blogs, 'asc', 'createdAt')

      expect(blogs).toEqual(sortedAscBlogs)
      
  })
  })
});
