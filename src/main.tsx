import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { injectSpeedInsights } from '@vercel/speed-insights'
import './index.css'
import App from './App.tsx'
import BlogListPage from './pages/blog/BlogListPage.tsx'
import BlogPostPage from './pages/blog/BlogPostPage.tsx'
import AdminLoginPage from './pages/admin/AdminLoginPage.tsx'
import AdminPostsPage from './pages/admin/AdminPostsPage.tsx'
import PostEditorPage from './pages/admin/PostEditorPage.tsx'
import WhatsAppButton from './components/WhatsAppButton.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'

injectSpeedInsights()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/posts" element={<AdminPostsPage />} />
        <Route path="/admin/posts/new" element={<PostEditorPage />} />
        <Route path="/admin/posts/edit/:id" element={<PostEditorPage />} />
      </Routes>
      <WhatsAppButton />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0B1F3F',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
