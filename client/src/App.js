// Dependencies
import { React } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


// Styling & Animation
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import './index.css';

// Components
import Header from './components/Header';
import Login from './pages/Login'
import Footer from './components/Footer';
import Home from './pages/Home'
import Signup from './pages/Signup'
import Marquee from "./components/TopMarquee";
import BottomMarquee from "./components/BottomMarquee"

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <AnimateSharedLayout type='crossfade'>
      <AnimatePresence>
        <ApolloProvider client={client}>
          <Router >
            <div className="app-container">
              <Header />
              <Marquee />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
              <BottomMarquee />
              <Footer />
            </div>
          </Router>
        </ApolloProvider>
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}

export default App