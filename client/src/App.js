// Dependencies
import { React, useState, useEffect } from 'react';
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
import Login from './pages/Login';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Start from './pages/Start';
import Seattle from './pages/Seattle';
import SeattleExploreHunt from './pages/SeattleExploreHunt';
import SeattleIndulgeHunt from './pages/SeattleIndulgeHunt';
import Spokane from './pages/Spokane';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import About from './pages/About'


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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
  }, [loading]);

  return (

      <AnimatePresence exitBeforeEnter>
        <ApolloProvider client={client}>
          <Router >
            <div id="root" className="app-container">
              <div className="content-wrapper">
              <Header />
              
              <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/start" element={<Start />} />
                <Route path="/seattle" element={<Seattle />} />
                <Route path="/spokane" element={<Spokane />} />
                <Route path="/seattle/seattleexplorehunt" element={<SeattleExploreHunt />} />
                <Route path="/seattle/seattleindulgehunt" element={<SeattleIndulgeHunt />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contact" element={<Contact />}/>
                <Route path="/about" element={<About />}/>
              </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </ApolloProvider>
        
      </AnimatePresence>

  )
}

export default App