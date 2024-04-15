import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import NotFound from './shared/components/NotFound/NotFound';
import React, { Suspense } from 'react';
import Spinner from './shared/components/Spinner/Spinner';

const BlogPage = React.lazy(
  () => import('./pages/Blog/Blog')
)

const BlogDetailsPage = React.lazy(
  () => import('./pages/BlogDetails/BlogDetails')
)

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/blogs" />} />
        <Route path='/blogs' element={<Suspense fallback={<Spinner />}><BlogPage /></Suspense>} />
        <Route path='/blog/:id' element={<Suspense fallback={<Spinner />}><BlogDetailsPage /></Suspense>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
