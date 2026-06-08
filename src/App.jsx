import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './components/layout/PublicLayout';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Otp from './pages/auth/Otp';
import ForgotPassword from './pages/auth/ForgotPassword';
import CustomerDashboard from './pages/customer/Dashboard';
import Payments from './pages/customer/Payments';
import Cards from './pages/customer/Cards';
import Analytics from './pages/customer/Analytics';
import Transactions from './pages/customer/Transactions';
import Bills from './pages/customer/Bills';
import Wallet from './pages/customer/Wallet';
import Notifications from './pages/customer/Notifications';
import Settings from './pages/customer/Settings';
import Support from './pages/customer/Support';
import MerchantDashboard from './pages/merchant/MerchantDashboard';
import Invoices from './pages/merchant/Invoices';
import Refunds from './pages/merchant/Refunds';
import AdminDashboard from './pages/admin/AdminDashboard';
import Users from './pages/admin/Users';
import Fraud from './pages/admin/Fraud';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import SupportDashboard from './pages/admin/SupportDashboard';
import LegalPage from './pages/public/LegalPage';
import Contact from './pages/public/Contact';
import KnowledgeBase from './pages/public/KnowledgeBase';
import LiveChat from './components/LiveChat';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<Landing />} />
              <Route path="privacy" element={<LegalPage />} />
              <Route path="terms" element={<LegalPage />} />
              <Route path="security" element={<LegalPage />} />
              <Route path="contact" element={<Contact />} />
              <Route path="knowledge-base" element={<KnowledgeBase />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="otp" element={<Otp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>

            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<ProtectedRoute roles={['customer']}><CustomerDashboard /></ProtectedRoute>} />
              <Route path="payments" element={<ProtectedRoute roles={['customer']}><Payments /></ProtectedRoute>} />
              <Route path="cards" element={<ProtectedRoute roles={['customer']}><Cards /></ProtectedRoute>} />
              <Route path="analytics" element={<ProtectedRoute roles={['customer']}><Analytics /></ProtectedRoute>} />
              <Route path="transactions" element={<ProtectedRoute roles={['customer']}><Transactions /></ProtectedRoute>} />
              <Route path="bills" element={<ProtectedRoute roles={['customer']}><Bills /></ProtectedRoute>} />
              <Route path="wallet" element={<ProtectedRoute roles={['customer']}><Wallet /></ProtectedRoute>} />
              <Route path="notifications" element={<ProtectedRoute roles={['customer']}><Notifications /></ProtectedRoute>} />
              <Route path="support" element={<ProtectedRoute roles={['customer']}><Support /></ProtectedRoute>} />
              <Route path="settings" element={<Settings />} />

              <Route path="merchant" element={<ProtectedRoute roles={['merchant']}><MerchantDashboard /></ProtectedRoute>} />
              <Route path="merchant/invoices" element={<ProtectedRoute roles={['merchant']}><Invoices /></ProtectedRoute>} />
              <Route path="merchant/refunds" element={<ProtectedRoute roles={['merchant']}><Refunds /></ProtectedRoute>} />

              <Route path="admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="admin/users" element={<ProtectedRoute roles={['admin']}><Users /></ProtectedRoute>} />
              <Route path="admin/fraud" element={<ProtectedRoute roles={['admin']}><Fraud /></ProtectedRoute>} />
              <Route path="admin/analytics" element={<ProtectedRoute roles={['admin']}><AdminAnalytics /></ProtectedRoute>} />
              <Route path="admin/support" element={<ProtectedRoute roles={['admin']}><SupportDashboard /></ProtectedRoute>} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <LiveChat />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
