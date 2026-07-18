import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import HomePage from './pages/home';
import ArticlePage from './pages/article';
import CategoryPage from './pages/category';
import SearchPage from './pages/search';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import AdvertisePage from './pages/advertise';
import PrivacyPage from './pages/privacy';
import TipsPage from './pages/tips';
import AdminLogin from './pages/admin/login';
import ForgotPassword from './pages/admin/forgot';
import AdminDashboard from './pages/admin/dashboard';
import AdminArticlesPage from './pages/admin/articles/index';
import ArticleForm from './pages/admin/articles/form';
import SettingsPage from './pages/admin/settings';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/article/:slug" component={ArticlePage} />
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/advertise" component={AdvertisePage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/tips" component={TipsPage} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/forgot" component={ForgotPassword} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/articles" component={AdminArticlesPage} />
      <Route path="/admin/articles/new" component={ArticleForm} />
      <Route path="/admin/articles/:id/edit" component={ArticleForm} />
      <Route path="/admin/settings" component={SettingsPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
